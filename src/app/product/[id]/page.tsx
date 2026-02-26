"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
    ChevronLeft,
    ShoppingBag,
    ArrowRight,
    Plus,
    Minus,
    Heart,
    Share2,
    Shield
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = parseInt(params.id as string);
    const product = products.find(p => p.id === id);
    const { addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-display uppercase tracking-widest text-gray-200">Not Found</h1>
                    <button onClick={() => router.back()} className="text-brand-charcoal border-b border-brand-charcoal py-2 px-8 uppercase text-[10px] font-bold tracking-widest">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const sizes = ["XS", "S", "M", "L", "XL"];

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-brand-charcoal selection:bg-brand-charcoal selection:text-white">
            <main className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-32">
                {/* Left: Visual Showcase (6 cols) */}
                <div className="lg:col-span-7 h-[80vh] lg:h-[calc(100vh-160px)] lg:sticky lg:top-36 overflow-hidden bg-white rounded-[32px] ml-8 mb-8 lg:mb-0 shadow-sm border border-gray-100/50">
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative w-full h-full p-4 lg:p-8"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>

                    {/* Image Controls Overlay */}
                    <div className="absolute bottom-8 left-8 flex flex-col gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
                        >
                            <Heart size={16} strokeWidth={1.5} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
                        >
                            <Share2 size={16} strokeWidth={1.5} />
                        </motion.button>
                    </div>
                </div>

                {/* Right: Content & Detail (5 cols) */}
                <div className="lg:col-span-5 px-8 lg:px-20 pb-20 flex flex-col bg-transparent">
                    <div className="max-w-xl mx-auto w-full space-y-12">
                        {/* Product Header */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <span className="text-xs uppercase tracking-[0.6em] text-brand-accent font-black block">Edition 2026 / {product.category}</span>
                                <h1 className="text-5xl lg:text-7xl font-display leading-[0.9] tracking-tight text-brand-charcoal">
                                    {product.name}
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-between items-end border-b border-gray-100 pb-8"
                            >
                                <p className="text-3xl font-light text-brand-charcoal">{product.price}</p>
                                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
                                    <Shield size={14} className="text-brand-accent" /> Authentication Link
                                </div>
                            </motion.div>
                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm text-gray-500 leading-relaxed font-light"
                        >
                            {product.desc}
                            Handcrafted with precision, this piece embodies modern luxury. The silhouette is designed for both structure and grace.
                        </motion.p>

                        {/* Personalization Options */}
                        <div className="space-y-10">
                            {/* Size Selector */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs uppercase font-black tracking-[0.4em]">
                                    <span>Select Size</span>
                                    <button className="text-gray-400 hover:text-brand-charcoal transition-colors border-b border-transparent">Size Chart</button>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 text-xs font-bold tracking-widest transition-all rounded-full border
                                            ${selectedSize === size ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-lg shadow-gray-200' : 'border-gray-100 hover:border-brand-charcoal text-gray-400'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & Actions */}
                            <div className="flex flex-col gap-4 pt-4">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center bg-gray-50/50 rounded-full px-6 py-4 gap-8">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-brand-charcoal transition-colors"><Minus size={14} /></button>
                                        <span className="text-sm font-bold min-w-[20px] text-center">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-brand-charcoal transition-colors"><Plus size={14} /></button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => addToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.image
                                    })}
                                    className="w-full bg-brand-charcoal text-white py-6 rounded-full flex items-center justify-center gap-6 group overflow-hidden relative shadow-2xl active:scale-[0.98] transition-all"
                                >
                                    <span className="relative z-10 text-xs uppercase tracking-[0.5em] font-black">Add to Collection</span>
                                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>

                        {/* Secondary Details Accordion */}
                        <div className="space-y-0 border-t border-gray-100">
                            <DetailAccordion title="Fabric & Composition" content="100% Premium Mulberry Silk. Responsibly sourced and woven in our heritage mills." />
                            <DetailAccordion title="Care & Maintenance" content="Professional dry clean only. Store in provided dust bag and avoid direct sunlight exposure." />
                            <DetailAccordion title="Shipping & Returns" content="Complimentary express shipping on all orders over $500. Personalized returns within 14 days." />
                        </div>

                        {/* Footer Logo Decor */}
                        <div className="pt-20 opacity-10 flex flex-col items-center gap-6">
                            <div className="w-12 h-px bg-brand-charcoal" />
                            <span className="text-[40px] font-display tracking-[0.5em]">GERA</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function DetailAccordion({ title, content }: { title: string, content: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-100 py-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-xs uppercase font-extrabold tracking-[0.4em] text-gray-400 hover:text-brand-charcoal transition-colors"
            >
                {title}
                <motion.div animate={{ rotate: isOpen ? 135 : 0 }}>
                    <Plus size={16} strokeWidth={1} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-6 text-sm leading-relaxed text-gray-500 font-light">
                            {content}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
