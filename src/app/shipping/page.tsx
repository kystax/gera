"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { ChevronLeft, Truck, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShippingPage() {
    const { subtotal, cartCount } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        zip: "",
        phone: ""
    });

    const shipping = 5;
    const total = subtotal + shipping;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/payment");
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] font-sans">
            {/* Header */}
            <header className="px-6 md:px-12 py-8 flex justify-between items-center bg-transparent border-b border-[#e4ddd3]/30">
                <Link href="/cart" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">
                    <ChevronLeft size={16} />
                    Back to Bag
                </Link>
                <Link href="/" className="text-2xl font-serif tracking-[0.2em] uppercase">LOVEM</Link>
                <div className="w-24"></div> {/* Spacer */}
            </header>

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Left: Shipping Form */}
                    <div className="flex-[1.5]">
                        <h1 className="text-4xl font-serif mb-12 tracking-tight">Shipping Information</h1>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">First Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Last Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Address</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">City</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Country</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">ZIP Code</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors"
                                        value={formData.zip}
                                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full bg-transparent border-b border-[#e4ddd3] py-3 focus:outline-none focus:border-black transition-colors"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className="pt-12">
                                <button
                                    type="submit"
                                    className="px-16 bg-black text-white py-6 text-sm uppercase tracking-[0.3em] font-medium hover:bg-gray-900 transition-all group"
                                >
                                    <span className="inline-block transition-transform group-hover:translate-x-1">Continue to Payment</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="flex-1 lg:max-w-md">
                        <div className="sticky top-32 space-y-12">
                            <h2 className="text-[12px] uppercase tracking-widest text-gray-400 font-medium">Order Detail</h2>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="font-serif italic text-lg">{cartCount} Products</span>
                                    <span className="font-serif text-lg">{subtotal}€</span>
                                </div>
                                <div className="flex justify-between items-center pb-6 border-b border-[#e4ddd3]">
                                    <span className="font-serif italic text-lg">Shipping</span>
                                    <span className="font-serif text-lg">{shipping}€</span>
                                </div>

                                <div className="bg-[#f0e9df] p-8 mt-8 flex justify-between items-center">
                                    <span className="text-2xl font-serif">Total</span>
                                    <span className="text-2xl font-serif font-medium">{total}€</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="pt-8 space-y-4 text-xs text-gray-400 uppercase tracking-widest leading-relaxed">
                                <p>Free delivery on orders over 150€</p>
                                <p>Estimated delivery: 3-5 business days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
