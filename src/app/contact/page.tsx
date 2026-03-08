"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [responseMsg, setResponseMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setResponseMsg(data.message);
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus("error");
                setResponseMsg(data.error || "Something went wrong.");
            }
        } catch (error) {
            setStatus("error");
            setResponseMsg("Connection failure. Please try again later.");
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFBF7]">
            {/* Hero Section */}
            <section className="bg-white py-24 px-4 border-b border-gray-100">
                <div className="max-w-7xl mx-auto text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-serif tracking-tight"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 uppercase tracking-[0.4em] text-[10px] font-bold"
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
                    className="bg-white p-12 shadow-sm border border-gray-100 relative overflow-hidden"
                >
                    <AnimatePresence>
                        {status === "success" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-12 text-center space-y-6"
                            >
                                <CheckCircle2 size={64} className="text-green-500" strokeWidth={1} />
                                <h3 className="text-2xl font-serif">Message Received</h3>
                                <p className="text-gray-500 font-serif italic">{responseMsg}</p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="text-xs uppercase tracking-widest border-b border-black pb-1 pt-4 hover:text-gray-500 hover:border-gray-500 transition-colors"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <h2 className="text-2xl font-serif mb-12 tracking-tight uppercase">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors bg-transparent text-sm"
                                    placeholder="Jane Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors bg-transparent text-sm"
                                    placeholder="jane@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Subject</label>
                            <input
                                required
                                type="text"
                                className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors bg-transparent text-sm"
                                placeholder="Inquiry about..."
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors bg-transparent resize-none text-sm"
                                placeholder="Your message here..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        {status === "error" && (
                            <p className="text-xs text-red-500 font-bold tracking-widest uppercase">{responseMsg}</p>
                        )}

                        <button
                            disabled={status === "loading"}
                            className="bg-black text-white px-16 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-900 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                            {status === "loading" ? "Processing..." : "Send Message"}
                        </button>
                    </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-20"
                >
                    <div className="space-y-10">
                        <h2 className="text-2xl font-serif tracking-tight uppercase">Get in touch</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="bg-white p-4 border border-gray-50 shadow-sm"><Mail size={24} strokeWidth={1} className="text-gray-400" /></div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-300 mb-1">Email</h4>
                                    <p className="text-lg font-serif italic">concierge@gera.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6">
                                <div className="bg-white p-4 border border-gray-50 shadow-sm"><Phone size={24} strokeWidth={1} className="text-gray-400" /></div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-300 mb-1">Phone</h4>
                                    <p className="text-lg font-serif italic">+1 (555) 012-3456</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6">
                                <div className="bg-white p-4 border border-gray-50 shadow-sm"><MapPin size={24} strokeWidth={1} className="text-gray-400" /></div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-300 mb-1">Atelier</h4>
                                    <p className="text-lg font-serif italic">742 Madison Ave, New York, NY 10065</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <h2 className="text-2xl font-serif tracking-tight uppercase">Follow our journey</h2>
                        <div className="flex gap-6">
                            <button className="p-5 bg-white border border-gray-50 shadow-sm hover:text-gray-400 transition-colors"><Instagram size={20} strokeWidth={1.5} /></button>
                            <button className="p-5 bg-white border border-gray-50 shadow-sm hover:text-gray-400 transition-colors"><Facebook size={20} strokeWidth={1.5} /></button>
                            <button className="p-5 bg-white border border-gray-50 shadow-sm hover:text-gray-400 transition-colors"><Twitter size={20} strokeWidth={1.5} /></button>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
