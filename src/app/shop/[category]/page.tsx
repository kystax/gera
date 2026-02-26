"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CategoryPage() {
    const params = useParams();
    const category = params.category as string;
    const { addToCart } = useCart();

    const filteredProducts = products.filter(p => p.category === category);

    if (filteredProducts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-paper">
                <h1 className="text-2xl font-display uppercase tracking-widest text-gray-400">No products found for this category.</h1>
            </div>
        );
    }

    return (
        <div className="bg-brand-paper min-h-screen pb-20">
            {/* Category Header */}
            <div className="h-[40vh] relative flex items-center justify-center overflow-hidden mb-16">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={filteredProducts[0].image}
                        alt={category}
                        fill
                        className="object-cover brightness-50 blur-sm scale-110"
                    />
                </div>
                <div className="relative z-10 text-center text-white">
                    <span className="text-[10px] uppercase tracking-[0.6em] mb-4 block font-bold">Collection</span>
                    <h1 className="text-6xl md:text-8xl font-display tracking-widest uppercase">{category}</h1>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredProducts.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group flex flex-col"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6 group-hover:shadow-2xl transition-all duration-500">
                                <Link href={`/product/${product.id}`} className="block w-full h-full">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                </Link>

                                {/* Quick Add Overlay */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            image: product.image
                                        });
                                    }}
                                    className="absolute bottom-6 left-6 right-6 bg-white text-brand-charcoal py-4 flex items-center justify-center gap-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 hover:bg-brand-charcoal hover:text-white z-10"
                                >
                                    <ShoppingCart size={18} />
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Add to Cart</span>
                                </button>
                            </div>

                            <Link href={`/product/${product.id}`} className="space-y-2 block group/text">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-lg font-bold tracking-tight uppercase group-hover/text:text-brand-accent transition-colors">{product.name}</h2>
                                    <span className="text-brand-accent font-medium">{product.price}</span>
                                </div>
                                <p className="text-gray-500 text-sm italic">{product.desc}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
