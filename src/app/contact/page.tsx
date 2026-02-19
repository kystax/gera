"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-brand-paper">
            {/* Hero Section */}
            <section className="bg-white py-24 px-4 border-b border-gray-100">
                <div className="max-w-7xl mx-auto text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-display tracking-widest uppercase"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 uppercase tracking-[0.4em] text-xs"
                    >
                        We're here to assist your journey into elegance
                    </motion.p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto py-24 px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-12 shadow-sm border border-gray-100"
                >
                    <h2 className="text-2xl font-display mb-8 tracking-wider">SEND A MESSAGE</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                                <input type="text" className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-charcoal transition-colors bg-transparent" placeholder="Jane Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                                <input type="email" className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-charcoal transition-colors bg-transparent" placeholder="jane@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Subject</label>
                            <input type="text" className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-charcoal transition-colors bg-transparent" placeholder="Inquiry about..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
                            <textarea rows={4} className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-charcoal transition-colors bg-transparent resize-none" placeholder="Your message here..."></textarea>
                        </div>
                        <button className="bg-brand-charcoal text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-brand-accent transition-colors mt-4">
                            Send Message
                        </button>
                    </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-16"
                >
                    <div className="space-y-8">
                        <h2 className="text-2xl font-display tracking-wider">GET IN TOUCH</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 border border-gray-100"><Mail size={20} className="text-brand-accent" /></div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email</h4>
                                    <p className="text-sm">concierge@gera.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 border border-gray-100"><Phone size={20} className="text-brand-accent" /></div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone</h4>
                                    <p className="text-sm">+1 (555) 012-3456</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 border border-gray-100"><MapPin size={20} className="text-brand-accent" /></div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Atelier</h4>
                                    <p className="text-sm">742 Madison Ave, New York, NY 10065</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-2xl font-display tracking-wider">FOLLOW OUR JOURNEY</h2>
                        <div className="flex gap-6">
                            <button className="p-4 bg-white border border-gray-100 hover:text-brand-accent transition-colors"><Instagram size={20} /></button>
                            <button className="p-4 bg-white border border-gray-100 hover:text-brand-accent transition-colors"><Facebook size={20} /></button>
                            <button className="p-4 bg-white border border-gray-100 hover:text-brand-accent transition-colors"><Twitter size={20} /></button>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
