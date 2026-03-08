"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Minus,
    X,
    Menu,
    ShoppingBag,
    ShieldCheck,
    Truck,
    CreditCard,
    ArrowLeft,
    ChevronRight,
    Info
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TRUST_INFO = {
    payment: {
        title: "Protected Payment",
        icon: <CreditCard size={32} strokeWidth={1} />,
        desc: "All transactions are encrypted with 256-bit SSL technology. We accept all major credit cards and digital wallets."
    },
    shipping: {
        title: "Global Atelier Delivery",
        icon: <Truck size={32} strokeWidth={1} />,
        desc: "Handcrafted pieces are shipped via express courier. Delivery within 3-5 business days including premium tracking."
    },
    security: {
        title: "Authenticity Guarantee",
        icon: <ShieldCheck size={32} strokeWidth={1} />,
        desc: "Every GERA garment comes with a unique certificate of authenticity and a lifetime quality guarantee."
    }
};

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, subtotal, cartCount, isLoading } = useCart();
    const router = useRouter();
    const [activeInfo, setActiveInfo] = useState<keyof typeof TRUST_INFO | null>(null);

    const shipping = cart.length > 0 ? 5 : 0;
    const total = subtotal + shipping;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="text-2xl font-serif italic text-gray-400 animate-pulse">Loading your bag...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] font-sans selection:bg-[#f0e9df]">

            {/* Info Overlay */}
            <AnimatePresence>
                {activeInfo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/5 backdrop-blur-md flex items-center justify-center p-6"
                        onClick={() => setActiveInfo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white max-w-sm w-full p-12 shadow-2xl border border-[#e4ddd3]/30 text-center relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveInfo(null)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
                            >
                                <X size={20} strokeWidth={1} />
                            </button>
                            <div className="flex justify-center mb-8 text-gray-400">
                                {TRUST_INFO[activeInfo].icon}
                            </div>
                            <h3 className="text-xl font-serif mb-4 uppercase tracking-wider">{TRUST_INFO[activeInfo].title}</h3>
                            <p className="text-gray-600 font-serif italic text-sm leading-relaxed">
                                {TRUST_INFO[activeInfo].desc}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header / Navbar */}
            <header className="px-6 md:px-12 py-10 flex justify-between items-center bg-transparent border-b border-[#e4ddd3]/20">
                <Link href="/" className="p-2 hover:bg-[#f3efea] rounded-full transition-colors group">
                    <ArrowLeft size={24} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <Link href="/" className="text-3xl font-serif tracking-[0.25em] uppercase">GERA</Link>
                <Link href="/cart" className="relative p-2">
                    <ShoppingBag size={24} strokeWidth={1} />
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </header>

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                <div className="flex flex-col lg:flex-row gap-24 items-start">

                    {/* Left: Cart Items List */}
                    <div className="flex-[1.8] w-full">
                        <div className="flex items-end justify-between mb-20">
                            <h1 className="text-7xl font-serif tracking-tight">Your<br />Selection</h1>
                            <span className="text-xs uppercase tracking-[0.4em] font-bold text-gray-400 pb-2">Bag No. {Math.floor(Math.random() * 9000) + 1000}</span>
                        </div>

                        <div className="w-full">
                            <div className="grid grid-cols-[3fr,1.5fr,1fr,1.5fr,0.5fr] text-xs uppercase tracking-[0.2em] text-gray-500 font-bold pb-6 border-b border-[#e4ddd3]">
                                <span>Article</span>
                                <span className="text-center">Composition</span>
                                <span className="text-center">Quantity</span>
                                <span className="text-right">Investment</span>
                                <span className="text-right sr-only">Action</span>
                            </div>

                            <div className="divide-y divide-[#e4ddd3]/50">
                                <AnimatePresence initial={false}>
                                    {cart.length === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="py-32 text-center"
                                        >
                                            <p className="text-2xl font-serif italic text-gray-400 mb-12">Your curation is requested.</p>
                                            <Link href="/shop" className="text-xs uppercase tracking-[0.3em] font-bold border-b border-black pb-2 hover:text-gray-400 hover:border-gray-400 transition-all">
                                                Discover Collection
                                            </Link>
                                        </motion.div>
                                    ) : (
                                        cart.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="grid grid-cols-[3fr,1.5fr,1fr,1.5fr,0.5fr] items-center py-12 gap-8"
                                            >
                                                {/* Product Info */}
                                                <div className="flex gap-8 items-center">
                                                    <div className="relative aspect-[4/5] w-28 bg-[#f3efea] overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover transition-transform duration-1000 hover:scale-105"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-serif mb-1">{item.name}</h3>
                                                        <p className="text-xs uppercase tracking-[0.15em] text-gray-500 font-bold">In-Stock / Ready to Ship</p>
                                                    </div>
                                                </div>

                                                {/* Description / Detail */}
                                                <div className="text-center">
                                                    <span className="text-xs font-serif italic text-gray-500">Premium Silk & Cotton</span>
                                                </div>

                                                {/* Quantity Selector */}
                                                <div className="flex items-center justify-center gap-6 text-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:text-gray-400 transition-colors"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-4 text-center font-serif text-lg">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 hover:text-gray-400 transition-colors"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <span className="font-serif text-xl">{item.price}€</span>
                                                </div>

                                                {/* Delete */}
                                                <div className="text-right">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-2 hover:text-black text-gray-300 transition-colors cursor-pointer"
                                                    >
                                                        <X size={20} strokeWidth={1} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="flex-1 lg:max-w-md w-full bg-white p-12 border border-[#e4ddd3]/30 shadow-sm">
                        <div className="space-y-12">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">Summary</h2>

                            <div className="space-y-8">
                                <div className="flex justify-between items-center text-gray-500">
                                    <span className="font-serif italic">Subtotal Selection</span>
                                    <span className="font-serif text-lg">{subtotal}€</span>
                                </div>
                                <div className="flex justify-between items-center pb-8 border-b border-[#f3efea]">
                                    <span className="font-serif italic">Atelier Delivery</span>
                                    <span className="font-serif text-lg">{shipping}€</span>
                                </div>

                                <div className="pt-4 flex justify-between items-center">
                                    <span className="text-2xl font-serif">Estimated Total</span>
                                    <span className="text-3xl font-serif font-medium underline decoration-[#f3efea] underline-offset-8">{total}€</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => router.push("/checkout")}
                                    disabled={cart.length === 0}
                                    className="w-full bg-black text-white py-8 text-xs uppercase tracking-[0.4em] font-bold hover:bg-gray-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-4 group shadow-xl shadow-black/5"
                                >
                                    <span>Begin Checkout</span>
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="w-full py-4 text-xs uppercase tracking-[0.3em] font-bold text-gray-500 hover:text-black transition-colors">
                                    Save Selection for later
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex justify-center gap-14 pt-12 text-gray-400 border-t border-[#f3efea]">
                                <button
                                    onClick={() => setActiveInfo("security")}
                                    className="group flex flex-col items-center gap-2 transition-colors hover:text-black cursor-pointer"
                                >
                                    <ShieldCheck size={24} strokeWidth={1} />
                                    <span className="text-[8px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Security</span>
                                </button>
                                <button
                                    onClick={() => setActiveInfo("shipping")}
                                    className="group flex flex-col items-center gap-2 transition-colors hover:text-black cursor-pointer"
                                >
                                    <Truck size={24} strokeWidth={1} />
                                    <span className="text-[8px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Shipping</span>
                                </button>
                                <button
                                    onClick={() => setActiveInfo("payment")}
                                    className="group flex flex-col items-center gap-2 transition-colors hover:text-black cursor-pointer"
                                >
                                    <CreditCard size={24} strokeWidth={1} />
                                    <span className="text-[8px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Payment</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
