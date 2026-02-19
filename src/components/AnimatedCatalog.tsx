"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

const products = [
    {
        id: 1,
        name: "SILK SLIP DRESS",
        price: "$210.00",
        image: "/assets/011.jpg",
        desc: "A timeless silhouette in 100% mulberry silk.",
        colors: ["#1A1A1A", "#EBE6DE", "#C5D8C1"]
    },
    {
        id: 2,
        name: "TAILORED BLAZER",
        price: "$345.00",
        image: "/assets/012.jpg",
        desc: "Structured elegance for the modern individual.",
        colors: ["#1A1A1A", "#8A8A8A"]
    },
    {
        id: 3,
        name: "MINIMALIST BLOUSE",
        price: "$178.00",
        image: "/assets/001.jpg",
        desc: "Breathable cotton with a refined drape.",
        colors: ["#FFFFFF", "#1A1A1A", "#F6F4F0"]
    },
    {
        id: 4,
        name: "KNIT CO-ORD SET",
        price: "$280.00",
        image: "/assets/005.jpg",
        desc: "Soft merino wool blend for effortless comfort.",
        colors: ["#A5907E", "#1A1A1A"]
    },
];

export default function AnimatedCatalog() {
    const [hoveredId, setHoveredId] = useState<number | null>(products[2].id); // Default focus on product 3 similar to image
    const { addToCart } = useCart();

    return (
        <section className="bg-white py-24 overflow-hidden min-h-[90vh] flex flex-col justify-center">
            <div className="max-w-[1600px] mx-auto w-full px-4 overflow-visible">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 h-full min-h-[600px]">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            onMouseEnter={() => setHoveredId(product.id)}
                            layout
                            initial={false}
                            animate={{
                                width: hoveredId === product.id ? "60%" : "12%",
                                height: hoveredId === product.id ? "700px" : "500px",
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            className="relative overflow-hidden cursor-pointer group rounded-sm"
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className={`object-cover transition-all duration-700 ${hoveredId === product.id ? "scale-100 grayscale-0" : "scale-110 grayscale"
                                    }`}
                            />

                            {/* Overlay for non-hovered items */}
                            <div
                                className={`absolute inset-0 bg-black/10 transition-opacity duration-500 ${hoveredId === product.id ? "opacity-0" : "opacity-100"
                                    }`}
                            />

                            {/* Details for hovered item */}
                            <AnimatePresence>
                                {hoveredId === product.id && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                        className="absolute inset-0 flex items-center justify-end p-12 pr-16 bg-gradient-to-l from-white/95 via-white/50 to-transparent"
                                    >
                                        <div className="max-w-sm text-right flex flex-col items-end">
                                            <motion.h2 className="text-5xl font-bold tracking-tight mb-2 uppercase leading-tight">
                                                {product.name}
                                            </motion.h2>
                                            <span className="text-2xl font-light text-brand-charcoal mb-6">{product.price}</span>

                                            <p className="text-sm text-gray-500 mb-8 leading-relaxed max-w-[280px]">
                                                {product.desc}
                                            </p>

                                            <div className="flex flex-col items-end gap-6 mb-10 w-full">
                                                <div className="space-y-3 w-full text-right">
                                                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Select Color</span>
                                                    <div className="flex gap-3 justify-end">
                                                        {product.colors.map(color => (
                                                            <div key={color} className="w-6 h-6 rounded-full border border-gray-100" style={{ backgroundColor: color }} />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 w-full justify-end">
                                                    {["S", "M", "L"].map(size => (
                                                        <div key={size} className="w-10 h-10 border border-gray-200 flex items-center justify-center text-[10px] hover:border-black font-bold">{size}</div>
                                                    ))}
                                                </div>
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
                                                className="bg-brand-charcoal text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-brand-accent transition-colors"
                                            >
                                                Add to Bag
                                                <ShoppingCart size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Minimal ID label for non-hovered */}
                            {hoveredId !== product.id && (
                                <div className="absolute inset-x-0 bottom-10 flex flex-col items-center">
                                    <span className="text-white text-[10px] uppercase font-bold tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
                                        Product 0{product.id}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Navigation Indicator Overlay */}
                <div className="flex justify-between items-center mt-12 px-10 text-[10px] uppercase tracking-[0.5em] font-medium text-gray-400">
                    <div className="flex items-center gap-4 group cursor-pointer hover:text-black">
                        <Minus size={14} className="group-hover:w-8 transition-all" />
                        <span>Scroll to Explore</span>
                    </div>
                    <div className="font-bold text-black border-b border-black pb-1">
                        {hoveredId ? `0${hoveredId}` : "01"} / 04
                    </div>
                </div>
            </div>
        </section>
    );
}
