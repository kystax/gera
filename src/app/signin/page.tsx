"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, CheckCircle2, ChevronRight, Hand } from "lucide-react";

export default function SigninPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] flex flex-col lg:flex-row-reverse">
            {/* Right Side: Visual/Branding (Mirroring Signup style) */}
            <div className="hidden lg:flex lg:w-1/2 bg-brand-charcoal relative overflow-hidden items-center justify-center p-20">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="/assets/dresses/002.jpg"
                        alt="Editorial"
                        className="w-full h-full object-cover grayscale"
                    />
                </div>
                <div className="relative z-10 text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <h1 className="text-8xl font-display text-white tracking-[0.2em] mb-4">HEIRLOOM</h1>
                        <p className="text-white/60 text-xs uppercase tracking-[0.5em] font-light">Authenticity & Elegance</p>
                    </motion.div>
                    <div className="w-16 h-px bg-white/20 mx-auto" />
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
                        Sign in to manage your appointments, view your order heritage, and access your curated wishlist.
                    </p>
                </div>
            </div>

            {/* Left Side: Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-32 py-20 bg-white shadow-2xl z-10">
                <div className="max-w-md w-full mx-auto space-y-12">
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-brand-charcoal transition-colors group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            To the Store
                        </Link>
                        <h2 className="text-4xl md:text-5xl font-display text-brand-charcoal">AUTHENTICATE</h2>
                        <p className="text-sm text-gray-400 font-light italic">Continue your journey with GERA.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <p className="bg-red-50 text-red-500 text-xs py-4 px-6 rounded-2xl border border-red-100 font-bold tracking-wide">
                                {error.toUpperCase()}
                            </p>
                        )}

                        <div className="space-y-6">
                            <div className="space-y-2 relative group">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300 group-focus-within:text-brand-accent transition-colors">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-brand-accent transition-colors" size={18} strokeWidth={1.5} />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-transparent border-b border-gray-100 py-4 pl-8 focus:border-brand-charcoal outline-none transition-all text-sm font-light"
                                        placeholder="concierge@heritage.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 relative group">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300 group-focus-within:text-brand-accent transition-colors">Credential</label>
                                    <button type="button" className="text-[9px] uppercase font-black text-gray-300 hover:text-brand-charcoal transition-colors tracking-widest">Forgotten?</button>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-brand-accent transition-colors" size={18} strokeWidth={1.5} />
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-transparent border-b border-gray-100 py-4 pl-8 focus:border-brand-charcoal outline-none transition-all text-sm font-light"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 space-y-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-charcoal text-white py-6 rounded-full flex items-center justify-center gap-6 group overflow-hidden relative shadow-2xl active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                <span className="relative z-10 text-[11px] uppercase tracking-[0.5em] font-black">
                                    {loading ? "Authenticating..." : "Enter the Heritage"}
                                </span>
                                {!loading && <ChevronRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />}
                                <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>

                            <p className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-400">
                                NEW TO THE INNER CIRCLE? <Link href="/signup" className="text-brand-charcoal border-b border-brand-charcoal hover:text-brand-accent hover:border-brand-accent transition-all ml-2">CREATE ACCOUNT</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
