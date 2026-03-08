"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, ShieldCheck, CreditCard, Truck, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
    const { cart, subtotal, cartCount, clearCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        address: "",
        city: "",
        zip: "",
        country: "France"
    });

    const shipping = 25.00;
    const total = subtotal + shipping;

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            router.push("/signin?callbackUrl=/checkout");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cart,
                    total,
                    shippingAddress: formData
                })
            });

            if (res.ok) {
                // Clear cart locally and in DB
                await clearCart();
                router.push("/orders?success=true");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to place order");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#FAF9F6] pt-40 flex flex-col items-center gap-8">
                <Link href="/shop" className="text-xs uppercase font-bold tracking-[0.2em] text-gray-500 hover:text-brand-charcoal transition-all">
                    Return to Shop
                </Link>
                <h1 className="text-4xl font-display uppercase tracking-widest text-gray-300 font-bold">Bag is Empty</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-40 pb-32">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">

                {/* Left: Info & Forms (7 cols) */}
                <div className="lg:col-span-7 space-y-16">
                    <div className="space-y-4">
                        <Link href="/cart" className="inline-flex items-center gap-3 text-xs uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-brand-charcoal transition-colors group mb-4">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Return to Bag
                        </Link>
                        <h1 className="text-6xl md:text-8xl font-display text-brand-charcoal">CHECKOUT</h1>
                        <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-semibold">Secure your selection from the GERA archive.</p>
                    </div>

                    <form onSubmit={handlePlaceOrder} className="space-y-12">
                        {error && (
                            <div className="bg-red-50 border border-red-100 p-6 rounded-3xl flex items-center gap-4 text-red-500 text-xs font-bold uppercase tracking-widest">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <h2 className="text-xs uppercase tracking-[0.4em] font-black text-brand-charcoal flex items-center gap-4">
                                <span className="w-8 h-px bg-brand-charcoal" />
                                01. Contact Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white border border-gray-100 px-8 py-5 rounded-full text-sm tracking-widest outline-none focus:border-brand-charcoal transition-all placeholder:text-gray-400"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white border border-gray-100 px-8 py-5 rounded-full text-sm tracking-widest outline-none focus:border-brand-charcoal transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="space-y-8">
                            <h2 className="text-xs uppercase tracking-[0.4em] font-black text-brand-charcoal flex items-center gap-4">
                                <span className="w-8 h-px bg-brand-charcoal" />
                                02. Shipping Archive
                            </h2>
                            <div className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Delivery Address"
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-white border border-gray-100 px-8 py-5 rounded-full text-sm tracking-widest outline-none focus:border-brand-charcoal transition-all placeholder:text-gray-400"
                                />
                                <div className="grid grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full bg-white border border-gray-100 px-8 py-5 rounded-full text-sm tracking-widest outline-none focus:border-brand-charcoal transition-all placeholder:text-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Zip Code"
                                        required
                                        value={formData.zip}
                                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                        className="w-full bg-white border border-gray-100 px-8 py-5 rounded-full text-sm tracking-widest outline-none focus:border-brand-charcoal transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Mock */}
                        <div className="space-y-8">
                            <h2 className="text-xs uppercase tracking-[0.4em] font-black text-brand-charcoal flex items-center gap-4">
                                <span className="w-8 h-px bg-brand-charcoal" />
                                03. Secure Remittance
                            </h2>
                            <div className="bg-white border border-gray-100 rounded-[32px] p-8 space-y-6">
                                <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-gray-50 rounded flex items-center justify-center">
                                            <CreditCard size={18} className="text-gray-300" />
                                        </div>
                                        <span className="text-xs uppercase tracking-widest font-black text-brand-charcoal">Credit / Debit Card</span>
                                    </div>
                                    <div className="w-4 h-4 rounded-full border-4 border-brand-charcoal shadow-sm" />
                                </div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest leading-relaxed font-semibold">
                                    Your transaction is encrypted. We accept all major cards including Visa, Mastercard, and American Express. (This is a demonstration payment).
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-charcoal text-white py-8 rounded-full flex items-center justify-center gap-8 shadow-2xl group overflow-hidden relative active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            <span className="relative z-10 text-[11px] uppercase tracking-[0.6em] font-black">
                                {loading ? "Authorizing Selection..." : "Complete Secure Acquisition"}
                            </span>
                            <ChevronRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </form>
                </div>

                {/* Right: Summary (5 cols) */}
                <div className="lg:col-span-5">
                    <div className="bg-white rounded-[48px] p-12 lg:sticky lg:top-40 border border-gray-100 shadow-sm space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display">Acquisition Summary</h3>
                            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{cartCount} Artifacts Selected</p>
                        </div>

                        {/* Item List Scroll */}
                        <div className="max-height-[300px] overflow-y-auto space-y-8 pr-4 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-6 items-center">
                                    <div className="relative w-20 aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 p-2">
                                        <Image src={item.image} alt={item.name} fill className="object-contain" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="text-[11px] uppercase font-black tracking-widest text-brand-charcoal">{item.name}</h4>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="text-sm font-light text-brand-charcoal">${(Number(item.price) * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="space-y-6 pt-10 border-t border-gray-100">
                            <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                                <span>Collection Subtotal</span>
                                <span>${subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                                <span>Heritage Express Shipping</span>
                                <span>${shipping.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pt-6 border-t border-gray-900">
                                <span className="text-xs uppercase tracking-[0.4em] font-black text-brand-charcoal">Total Amount</span>
                                <span className="text-3xl font-display text-brand-charcoal">${total.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Security Badges */}
                        <div className="bg-gray-50 rounded-3xl p-6 flex items-center justify-around text-gray-300">
                            <div className="flex flex-col items-center gap-2">
                                <Truck size={20} strokeWidth={1} className="text-gray-400" />
                                <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Insured</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <CreditCard size={20} strokeWidth={1} className="text-gray-400" />
                                <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

