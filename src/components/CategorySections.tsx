"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
    {
        title: "Bridal",
        subtitle: "The Wedding Collection",
        image: "/assets/bridal/003.jpg",
        href: "/shop/bridal",
        span: "lg:col-span-2 lg:row-span-2"
    },
    {
        title: "Dresses",
        subtitle: "Timeless Silhouettes",
        image: "/assets/dresses/003.jpg",
        href: "/shop/dresses",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        title: "Tops",
        subtitle: "Refined Essentials",
        image: "/assets/tops/002.jpg",
        href: "/shop/tops",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        title: "Skirts",
        subtitle: "Fluid Movement",
        image: "/assets/skirts/001.jpg",
        href: "/shop/skirts",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        title: "Pants",
        subtitle: "Tailored Comfort",
        image: "/assets/pants/001.jpg",
        href: "/shop/pants",
        span: "lg:col-span-1 lg:row-span-1"
    }
];

export default function CategorySections() {
    return (
        <section className="bg-white py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-xs uppercase tracking-[0.5em] font-bold text-gray-400">Curated Collections</h2>
                    <h3 className="text-5xl md:text-6xl font-display">DISCOVER GERA</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 h-auto lg:h-[900px]">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`relative group overflow-hidden cursor-pointer ${cat.span}`}
                        >
                            <Link href={cat.href} className="block w-full h-full">
                                <Image
                                    src={cat.image}
                                    alt={cat.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                    <span className="text-xs uppercase tracking-[0.4em] mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        Explore
                                    </span>
                                    <h4 className="text-3xl lg:text-4xl font-display tracking-widest">{cat.title}</h4>
                                    <div className="w-8 h-px bg-white/50 mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                    <p className="text-xs uppercase tracking-[0.2em] mt-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        {cat.subtitle}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
