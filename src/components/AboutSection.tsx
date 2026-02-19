"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section className="bg-brand-paper py-32 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Story Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase tracking-[0.4em] font-semibold text-brand-accent">Beyond Fashion</h3>
                        <h2 className="text-5xl md:text-7xl font-display leading-[0.9]">
                            THE ART OF MODERN <br /> ELEGANCE
                        </h2>
                    </div>

                    <div className="space-y-6 text-gray-600 leading-relaxed max-w-lg">
                        <p>
                            GERA is more than just a clothing store; it is a manifestation of contemporary feminine
                            energy and timeless sophistication. We curate pieces that are not merely garments, but
                            instruments of self-expression.
                        </p>
                        <p>
                            Our philosophy centers on minimal silhouettes, premium sustainable materials, and
                            an unwavering attention to detail. Each piece in our collection is designed to
                            empower and inspire the modern individual to move through the world with grace.
                        </p>
                    </div>

                    <div className="pt-8">
                        <button className="border-b-2 border-brand-charcoal pb-2 uppercase tracking-[0.3em] text-xs font-bold hover:text-brand-accent hover:border-brand-accent transition-all">
                            Read Our Story
                        </button>
                    </div>
                </motion.div>

                {/* Visual Element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-square md:aspect-[4/5] overflow-hidden"
                >
                    <Image
                        src="/assets/007.jpg"
                        alt="About GERA"
                        fill
                        className="object-cover"
                    />
                    {/* Overlay Text Element */}
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="border border-white/30 backdrop-blur-md p-10 text-white text-center">
                            <span className="text-5xl font-display tracking-[0.2em]">GERA</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
