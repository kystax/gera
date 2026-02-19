"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ModelShowcase() {
    const models = [
        { src: "/assets/003.jpg", alt: "Model 1", span: "col-span-1" },
        { src: "/assets/004.jpg", alt: "Model 2", span: "col-span-1" },
        { src: "/assets/010.jpg", alt: "Model 3", span: "col-span-1" },
    ];

    return (
        <section className="bg-white py-10 px-4">
            {/* 3-Panel Main Showcase */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-1 mb-20 relative">
                {models.map((model, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className={`relative aspect-[2/3] overflow-hidden group`}
                    >
                        <Image
                            src={model.src}
                            alt={model.alt}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
                    </motion.div>
                ))}

                {/* Overlapping Text Element (Based on Image 1) */}
                <div className="absolute top-1/2 left-10 -translate-y-1/2 z-20 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-6xl md:text-8xl font-display text-white mix-blend-difference leading-[0.8] mb-4">
                            EXCLUSIVE<br />COLLECTION
                        </h2>
                        <p className="text-white mix-blend-difference text-xs uppercase tracking-[0.4em] max-w-[200px]">
                            Elegance redefined through minimal silhouettes and premium materials.
                        </p>
                    </motion.div>
                </div>

                {/* CTA Button overlay */}
                <div className="absolute bottom-20 right-20 z-20">
                    <button className="bg-white text-brand-charcoal px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-brand-charcoal hover:text-white transition-all shadow-xl">
                        Explore Catalog
                    </button>
                </div>
            </div>
        </section>
    );
}
