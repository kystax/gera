"use client";

import { motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
    // Clear cart on success (usually handled by backend, but for this demo we do it here)
    // Note: If using DB, we should also clear the DB cart.
    const { cart } = useCart();

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 text-[#1a1a1a]">
            <div className="max-w-md w-full text-center space-y-12">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-24 h-24 bg-black rounded-full mx-auto flex items-center justify-center text-white"
                >
                    <Check size={40} />
                </motion.div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-serif tracking-tight">Thank You.</h1>
                    <p className="text-gray-400 font-serif italic text-lg leading-relaxed">
                        Your order has been received and is currently being curated for shipment.
                    </p>
                </div>

                <div className="pt-12 space-y-6">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gray-300 font-bold border-t border-[#e4ddd3] pt-6 mb-12">
                        Order #GERA-{(Math.random() * 10000).toFixed(0)}
                    </div>

                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-4 bg-black text-white px-12 py-6 text-sm uppercase tracking-[0.3em] font-medium hover:bg-gray-900 transition-all group"
                    >
                        <span>Continue Selection</span>
                        <ShoppingBag size={14} className="transition-transform group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
