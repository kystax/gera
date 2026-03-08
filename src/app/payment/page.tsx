"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
    const { subtotal, cartCount } = useCart();
    const router = useRouter();
    const [cardData, setCardData] = useState({
        number: "",
        expiry: "",
        cvv: "",
        name: ""
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const shipping = 5;
    const total = subtotal + shipping;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment process
        setTimeout(() => {
            setIsProcessing(false);
            router.push("/success");
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] font-sans">
            {/* Header */}
            <header className="px-6 md:px-12 py-8 flex justify-between items-center bg-transparent border-b border-[#e4ddd3]/30">
                <Link href="/shipping" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">
                    <ChevronLeft size={16} />
                    Back to Shipping
                </Link>
                <Link href="/" className="text-2xl font-serif tracking-[0.2em] uppercase">LOVEM</Link>
                <div className="w-24"></div> {/* Spacer */}
            </header>

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Left: Payment Form */}
                    <div className="flex-[1.5]">
                        <h1 className="text-4xl font-serif mb-12 tracking-tight">Payment Method</h1>

                        <form onSubmit={handlePayment} className="space-y-8 max-w-lg">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Cardholder Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="AS SEEN ON CARD"
                                    className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors uppercase tracking-widest text-sm"
                                    value={cardData.name}
                                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Card Number</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors tracking-[0.2em] text-sm"
                                    value={cardData.number}
                                    onChange={(e) => setCardData({ ...cardData, number: e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19) })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Expiry Date</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="MM / YY"
                                        className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors text-sm"
                                        value={cardData.expiry}
                                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">CVV</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="123"
                                        className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors text-sm"
                                        value={cardData.cvv}
                                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.slice(0, 3) })}
                                    />
                                </div>
                            </div>

                            <div className="pt-12">
                                <button
                                    disabled={isProcessing}
                                    type="submit"
                                    className="w-full bg-black text-white py-6 text-sm uppercase tracking-[0.3em] font-medium hover:bg-gray-900 transition-all group flex items-center justify-center gap-4 relative overflow-hidden"
                                >
                                    <AnimatePresence mode="wait">
                                        {isProcessing ? (
                                            <motion.div
                                                key="processing"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -20, opacity: 0 }}
                                                className="flex items-center gap-3"
                                            >
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>SECURE PROCESSING...</span>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="pay"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -20, opacity: 0 }}
                                                className="flex items-center gap-3"
                                            >
                                                <Lock size={14} />
                                                <span>PAY {total}€ NOW</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-6 text-center">
                                    Encrypted & Secured by SSL. GERA Boutique Payments.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="flex-1 lg:max-w-md">
                        <div className="sticky top-32 space-y-12">
                            <h2 className="text-[12px] uppercase tracking-widest text-gray-400 font-medium">Order Review</h2>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span className="font-serif italic text-lg">{cartCount} Products</span>
                                    <span className="font-serif text-lg">{subtotal}€</span>
                                </div>
                                <div className="flex justify-between items-center pb-6 border-b border-[#e4ddd3] text-gray-600">
                                    <span className="font-serif italic text-lg">Shipping</span>
                                    <span className="font-serif text-lg">{shipping}€</span>
                                </div>

                                <div className="p-8 flex justify-between items-center border border-[#e4ddd3]">
                                    <span className="text-2xl font-serif">Total Due</span>
                                    <span className="text-2xl font-serif font-medium">{total}€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
