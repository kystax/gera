"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const products = [
    {
        id: 1,
        name: "ELITE BLAZER",
        price: "$345.00",
        image: "/assets/012.jpg",
        desc: "Structured elegance for the modern individual. Tailored to perfection.",
        colors: ["#1A1A1A", "#8A8A8A"],
        label: "LOOK 01"
    },
    {
        id: 2,
        name: "SILK SLIP DRESS",
        price: "$210.00",
        image: "/assets/011.jpg",
        desc: "A timeless silhouette in 100% mulberry silk. Effortless grace.",
        colors: ["#1A1A1A", "#EBE6DE", "#C5D8C1"],
        label: "LOOK 02"
    },
    {
        id: 3,
        name: "MINIMALIST BLOUSE",
        price: "$178.00",
        image: "/assets/001.jpg",
        desc: "Breathable cotton with a refined drape. Pure sophistication.",
        colors: ["#FFFFFF", "#1A1A1A", "#F6F4F0"],
        label: "LOOK 03"
    },
    {
        id: 4,
        name: "KNIT CO-ORD SET",
        price: "$280.00",
        image: "/assets/005.jpg",
        desc: "Soft merino wool blend for effortless comfort and style.",
        colors: ["#A5907E", "#1A1A1A"],
        label: "LOOK 04"
    },
];

export default function AnimatedCatalog() {
    const [hoveredId, setHoveredId] = useState<number | null>(products[1].id); // Default to Look 02 as in request
    const { addToCart } = useCart();

    return (
        <section className="bg-[#fcfcfc] py-32 overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="max-w-[1700px] mx-auto w-full px-6">
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-2 h-[750px] relative">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            onMouseEnter={() => setHoveredId(product.id)}
                            layout
                            initial={false}
                            animate={{
                                width: hoveredId === product.id ? "65%" : "11.6%",
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                                mass: 1
                            }}
                            className="relative overflow-hidden cursor-pointer group"
                        >
                            {/* Masked Image Container */}
                            <div className="absolute inset-0 w-full h-full">
                                <motion.div
                                    className="relative w-full h-full"
                                    animate={{
                                        filter: hoveredId === product.id ? "blur(0px) brightness(1)" : "blur(8px) brightness(0.7)",
                                        scale: hoveredId === product.id ? 1 : 1.1
                                    }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </div>

                            {/* Hover Overlay for Non-Active */}
                            <div className={`absolute inset-0 bg-black/5 transition-opacity duration-700 ${hoveredId === product.id ? 'opacity-0' : 'opacity-100'}`} />

                            {/* Content for Hovered Item */}
                            <AnimatePresence>
                                {hoveredId === product.id && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 z-10 flex items-center justify-end p-10 lg:p-20"
                                    >
                                        {/* Glass Detail Panel */}
                                        <motion.div
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                                            className="bg-white/90 backdrop-blur-xl p-12 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20"
                                        >
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <motion.span
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        className="text-xs uppercase tracking-[0.5em] font-black text-brand-accent block"
                                                    >
                                                        {product.label}
                                                    </motion.span>
                                                    <motion.h2
                                                        initial={{ y: 30, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ delay: 0.1 }}
                                                        className="text-5xl font-display leading-[0.9] hover:text-brand-accent transition-colors"
                                                    >
                                                        <Link href={`/product/${product.id}`}>
                                                            {product.name}
                                                        </Link>
                                                    </motion.h2>
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="text-gray-500 text-sm leading-relaxed"
                                                    >
                                                        {product.desc}
                                                    </motion.p>
                                                </div>

                                                <div className="flex justify-between items-end border-t border-gray-100 pt-8">
                                                    <div className="space-y-4">
                                                        <span className="text-xs uppercase tracking-widest font-bold text-gray-400 block">Colors</span>
                                                        <div className="flex gap-2">
                                                            {product.colors.map(c => (
                                                                <div key={c} className="w-5 h-5 rounded-full border border-gray-100" style={{ backgroundColor: c }} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="text-3xl font-light text-brand-charcoal">{product.price}</span>
                                                </div>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart({
                                                            id: product.id,
                                                            name: product.name,
                                                            price: product.price,
                                                            image: product.image
                                                        });
                                                    }}
                                                    className="w-full bg-brand-charcoal text-white py-5 px-8 flex items-center justify-between group overflow-hidden relative"
                                                >
                                                    <span className="relative z-10 uppercase tracking-[0.3em] text-[10px] font-bold">Add to Collection</span>
                                                    <ShoppingCart size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                                    <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                                </button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Label for Collapsed Items */}
                            <AnimatePresence>
                                {hoveredId !== product.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-end pb-12 pointer-events-none"
                                    >
                                        <span className="text-white text-[10px] uppercase font-black tracking-[0.6em] [writing-mode:vertical-lr] rotate-180 drop-shadow-md">
                                            {product.label}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Navigation Overlay */}
                <div className="flex justify-between items-center mt-12 px-4">
                    <div className="flex items-center gap-6 group cursor-pointer text-gray-400 hover:text-brand-charcoal transition-colors">
                        <div className="w-12 h-px bg-current group-hover:w-20 transition-all duration-500"></div>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Slide to Reveal</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black tracking-widest text-brand-charcoal">
                            0{hoveredId || 1}
                        </span>
                        <div className="w-10 h-px bg-gray-200"></div>
                        <span className="text-[10px] font-light tracking-widest text-gray-400">
                            0{products.length}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
