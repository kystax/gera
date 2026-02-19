"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const products = [
    { id: 1, name: "Minimalist Blouse", price: "5.500 P", image: "/assets/001.jpg" },
    { id: 2, name: "Silk Slip Dress", price: "9.000 P", image: "/assets/011.jpg" },
    { id: 3, name: "Premium Knit Set", price: "15.500 P", image: "/assets/005.jpg" },
    { id: 4, name: "Tailored Blazer", price: "7.900 P", image: "/assets/012.jpg" },
    { id: 5, name: "Classic Wool Fedora", price: "2.700 P", image: "/assets/008.jpg" },
    { id: 6, name: "Urban Cotton Shirt", price: "4.200 P", image: "/assets/006.jpg" },
];

export default function ProductCatalog({ title = "CATALOG" }) {
    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end border-b border-gray-100 pb-8 mb-12">
                    <h2 className="text-4xl font-display tracking-wider uppercase">{title}</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <button className="bg-white p-3 rounded-full shadow-lg hover:bg-brand-charcoal hover:text-white transition-colors">
                                        <ShoppingBag size={18} strokeWidth={1.5} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 group-hover:text-brand-charcoal transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-sm font-semibold tracking-wide">{product.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
