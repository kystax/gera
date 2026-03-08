"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryPage() {
    const params = useParams();
    const category = params.category as string;
    const { addToCart } = useCart();

    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await fetch(`/api/products?category=${category}`);
                const result = await response.json();
                if (result.success) {
                    setFilteredProducts(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (category) fetchCategoryProducts();
    }, [category]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-paper">
                <div className="space-y-4 text-center">
                    <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-gray-400">Curating Collection...</p>
                </div>
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-brand-paper gap-8">
                <h1 className="text-2xl font-display uppercase tracking-widest text-gray-400">No products found in {category}.</h1>
                <Link href="/shop" className="text-xs uppercase tracking-widest font-black border-b border-brand-charcoal pb-1">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="bg-brand-paper min-h-screen pb-20 pt-20">
            {/* Category Header */}
            <div className="h-[60vh] relative flex items-center justify-center overflow-hidden mb-20 bg-brand-charcoal">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={filteredProducts[0].image}
                        alt={category}
                        fill
                        className="object-cover brightness-[0.4] scale-105"
                    />
                </div>
                <div className="relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-xs uppercase tracking-[0.6em] mb-6 block font-bold opacity-80">Exclusive Collection</span>
                        <h1 className="text-7xl md:text-9xl font-display tracking-[0.2em] uppercase">{category}</h1>
                        <div className="w-24 h-0.5 bg-brand-accent mx-auto mt-8" />
                    </motion.div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredProducts.map((product, idx) => (
                        <motion.div
                            key={product._id || product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group flex flex-col"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6 group-hover:shadow-2xl transition-all duration-500">
                                <Link href={`/product/${product.pid || product._id}`} className="block w-full h-full">
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
                                            id: product.pid || product._id,
                                            name: product.name,
                                            price: product.price,
                                            image: product.image
                                        });
                                    }}
                                    className="absolute bottom-6 left-6 right-6 bg-white text-brand-charcoal py-5 flex items-center justify-center gap-3 translate-y-24 group-hover:translate-y-0 transition-transform duration-500 hover:bg-brand-charcoal hover:text-white z-10 cursor-pointer active:scale-95 shadow-xl"
                                >
                                    <ShoppingCart size={18} />
                                    <span className="text-xs uppercase tracking-widest font-black">Add to Cart</span>
                                </button>
                            </div>

                            <Link href={`/product/${product.pid || product._id}`} className="space-y-2 block group/text">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-lg font-bold tracking-tight uppercase group-hover/text:text-brand-accent transition-colors">{product.name}</h2>
                                    <span className="text-brand-accent font-black tracking-tight">{product.price}</span>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-2">{product.desc}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
