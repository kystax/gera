"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import Link from "next/link";

export default function ProductCatalog({ title = "CATALOG", limit }: { title?: string, limit?: number }) {
    const { addToCart } = useCart();

    // Slice if limit is provided, otherwise show all
    const displayProducts = limit ? products.slice(0, limit) : products;

    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end border-b border-gray-100 pb-8 mb-12">
                    <h2 className="text-4xl font-display tracking-wider uppercase text-brand-charcoal">{title}</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-16">
                    {displayProducts.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-700">
                                <Link href={`/product/${product.id}`} className="block w-full h-full relative z-0">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                                </Link>

                                <div className="absolute bottom-6 right-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 z-10">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            addToCart({
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                image: product.image
                                            });
                                        }}
                                        className="bg-[#2D2E5F] text-white p-4 rounded-3xl shadow-2xl hover:bg-[#3d3e75] transition-all transform hover:scale-110 active:scale-95"
                                    >
                                        <ShoppingBag size={20} strokeWidth={2} />
                                    </button>
                                </div>
                            </div>

                            <Link href={`/product/${product.id}`} className="space-y-3 px-1 block group/text">
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 group-hover/text:text-brand-accent transition-colors duration-300">
                                    {product.name}
                                </h3>
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-light tracking-tight">{product.price}</p>
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent transform scale-0 group-hover/text:scale-100 transition-transform duration-500" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
