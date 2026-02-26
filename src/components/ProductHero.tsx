"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { products as allProducts } from "@/data/products";
import Link from "next/link";

export default function ProductHero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addToCart } = useCart();

    // Showcase 3 top products from different categories
    const arrivals = [
        allProducts.find(p => p.id === 101)!,
        allProducts.find(p => p.id === 201)!,
        allProducts.find(p => p.id === 301)!
    ];

    const currentProduct = arrivals[currentIndex];

    const nextProduct = () => {
        setCurrentIndex((prev) => (prev + 1) % arrivals.length);
    };

    const prevProduct = () => {
        setCurrentIndex((prev) => (prev - 1 + arrivals.length) % arrivals.length);
    };

    const sizes = ["S", "M", "L", "XL", "2XL"];
    const colors = [
        { name: "Charcoal", hex: "#1A1A1A" },
        { name: "Parchment", hex: "#EBE6DE" },
        { name: "Sage", hex: "#C5D8C1" }
    ];

    return (
        <section className="relative min-h-[80vh] grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-brand-paper">
            {/* Background Text Layer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <span className="text-[25vw] font-bold text-gray-200/50 select-none tracking-tighter">
                    NEW
                </span>
            </div>

            {/* Product Image Section */}
            <div className="lg:col-span-8 relative flex items-center justify-center p-8 lg:p-20 z-10">
                <div
                    onClick={prevProduct}
                    className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 group cursor-pointer z-20"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr] font-medium text-gray-400 group-hover:text-brand-charcoal transition-colors">Prev</span>
                    <div className="w-px h-12 bg-gray-200 group-hover:bg-brand-charcoal transition-colors"></div>
                </div>

                <div className="relative w-full max-w-2xl aspect-[3/4] flex items-center justify-center shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentProduct.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="relative w-full h-full"
                        >
                            <Link href={`/product/${currentProduct.id}`}>
                                <Image
                                    src={currentProduct.image}
                                    alt={currentProduct.name}
                                    fill
                                    className="object-cover transition-all duration-700 hover:scale-105"
                                    priority
                                />
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div
                    onClick={nextProduct}
                    className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 group cursor-pointer z-20"
                >
                    <div className="w-px h-12 bg-gray-200 group-hover:bg-brand-charcoal transition-colors"></div>
                    <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-lr] font-medium text-gray-400 group-hover:text-brand-charcoal transition-colors">Next</span>
                </div>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4 bg-white p-8 lg:p-16 flex flex-col justify-center border-l border-gray-100 z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentProduct.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-brand-accent mb-3 font-bold">New Arrival Section</span>
                        <h1 className="text-4xl font-bold mb-4 leading-tight tracking-normal">
                            {currentProduct.name}
                        </h1>
                        <p className="text-2xl font-light text-brand-charcoal mb-8">{currentProduct.price}</p>

                        <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-sm">
                            {currentProduct.desc}
                        </p>

                        {/* Size Selector */}
                        <div className="mb-8">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4 text-gray-400">Select Size (US)</h3>
                            <div className="flex flex-wrap gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`w-12 h-12 border flex items-center justify-center text-xs transition-all
                        ${size === "M" ? "border-brand-charcoal bg-brand-charcoal text-white" : "border-gray-200 hover:border-brand-charcoal"}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selector */}
                        <div className="mb-12">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4 text-gray-400">Select Color</h3>
                            <div className="flex gap-4">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        className={`w-8 h-8 rounded-sm border p-0.5 transition-all
                        ${color.name === "Charcoal" ? "border-brand-charcoal" : "border-transparent"}`}
                                    >
                                        <div className="w-full h-full" style={{ backgroundColor: color.hex }}></div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={() => addToCart({
                                id: currentProduct.id,
                                name: currentProduct.name,
                                price: currentProduct.price,
                                image: currentProduct.image
                            })}
                            className="w-full bg-brand-charcoal text-white py-5 px-8 flex items-center justify-between group hover:bg-brand-accent transition-colors duration-300 shadow-lg"
                        >
                            <span className="uppercase tracking-[0.3em] text-xs font-bold">Add to Cart</span>
                            <ShoppingCart size={18} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
