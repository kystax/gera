"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";

export type CartItem = {
    id: string; // Updated to string as MongoDB IDs or specific product IDs are strings
    name: string;
    price: number | string;
    image: string;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, newQty: number) => void;
    cartCount: number;
    subtotal: number;
    isLoading: boolean;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch cart from internal DB if user is logged in
    useEffect(() => {
        if (status === "authenticated") {
            fetchCart();
        } else if (status === "unauthenticated") {
            const localCart = localStorage.getItem("gera_cart");
            if (localCart) {
                try {
                    const parsed = JSON.parse(localCart);
                    // Ensure IDs are strings and deduplicate
                    const deduped: CartItem[] = [];
                    parsed.forEach((item: any) => {
                        const existing = deduped.find(i => String(i.id) === String(item.id));
                        if (existing) {
                            existing.quantity += item.quantity;
                        } else {
                            deduped.push({ ...item, id: String(item.id) });
                        }
                    });
                    setCart(deduped);
                } catch (e) {
                    console.error("Local cart parse error", e);
                }
            }
            setIsLoading(false);
        }
    }, [status]);

    const fetchCart = async () => {
        try {
            const res = await fetch("/api/cart");
            if (res.ok) {
                const data = await res.json();
                // Map DB schema (productId) to Frontend schema (id)
                const mapped = data.map((item: any) => ({
                    id: String(item.productId),
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: item.quantity,
                }));

                // Deduplicate items with the same ID
                const deduped: CartItem[] = [];
                mapped.forEach((item: CartItem) => {
                    const existing = deduped.find(i => i.id === item.id);
                    if (existing) {
                        existing.quantity += item.quantity;
                    } else {
                        deduped.push(item);
                    }
                });

                setCart(deduped);
            }
        } catch (error) {
            console.error("Cart fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const parsePrice = (price: string | number): number => {
        if (typeof price === "number") return price;
        return parseFloat(price.replace(/[^0-9.-]+/g, ""));
    };

    const addToCart = async (item: Omit<CartItem, "quantity">) => {
        const stringId = String(item.id);
        const newItem = { ...item, id: stringId, quantity: 1 };

        if (status === "authenticated") {
            try {
                const res = await fetch("/api/cart", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        productId: stringId,
                        name: item.name,
                        price: parsePrice(item.price),
                        image: item.image,
                        quantity: 1,
                    }),
                });
                if (res.ok) await fetchCart();
            } catch (error) {
                console.error("Cart update error:", error);
            }
        } else {
            setCart((prev) => {
                const existing = prev.find((i) => String(i.id) === stringId);
                let updated;
                if (existing) {
                    updated = prev.map((i) =>
                        String(i.id) === stringId ? { ...i, quantity: i.quantity + 1 } : i
                    );
                } else {
                    updated = [...prev, newItem];
                }
                localStorage.setItem("gera_cart", JSON.stringify(updated));
                return updated;
            });
        }
    };

    const removeFromCart = async (id: string | number) => {
        const stringId = String(id);
        if (status === "authenticated") {
            try {
                const res = await fetch("/api/cart", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId: stringId }),
                });
                if (res.ok) await fetchCart();
            } catch (error) {
                console.error("Cart remove error:", error);
            }
        } else {
            setCart((prev) => {
                const updated = prev.filter((item) => String(item.id) !== stringId);
                localStorage.setItem("gera_cart", JSON.stringify(updated));
                return updated;
            });
        }
    };

    const updateQuantity = async (id: string | number, newQty: number) => {
        const stringId = String(id);
        const item = cart.find(i => String(i.id) === stringId);
        if (!item || newQty < 1) return;

        const delta = newQty - item.quantity;

        if (status === "authenticated") {
            try {
                const res = await fetch("/api/cart", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        productId: stringId,
                        name: item.name,
                        price: parsePrice(item.price),
                        image: item.image,
                        quantity: delta,
                    }),
                });
                if (res.ok) await fetchCart();
            } catch (error) {
                console.error("Cart update quantity error:", error);
            }
        } else {
            setCart((prev) => {
                const updated = prev.map((item) =>
                    String(item.id) === stringId ? { ...item, quantity: newQty } : item
                );
                localStorage.setItem("gera_cart", JSON.stringify(updated));
                return updated;
            });
        }
    };

    const clearCart = async () => {
        setCart([]);
        if (status === "authenticated") {
            try {
                await fetch("/api/cart", { method: "DELETE" });
            } catch (error) {
                console.error("Clear cart error:", error);
            }
        } else {
            localStorage.removeItem("gera_cart");
        }
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + (parsePrice(item.price) * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, subtotal, isLoading, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
