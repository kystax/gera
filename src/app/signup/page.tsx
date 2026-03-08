"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Lock as LockIcon, CheckCircle2, ChevronRight } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                // Auto sign in user
                await signIn("credentials", {
                    redirect: false,
                    email: formData.email,
                    password: formData.password,
                });

                setTimeout(() => {
                    router.push("/");
                    router.refresh();
                }, 2000);
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] flex flex-col lg:flex-row">
            {/* Left Side: Visual/Branding (Standard GERA style) */}
            <div className="hidden lg:flex lg:w-1/2 bg-brand-charcoal relative overflow-hidden items-center justify-center p-20">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="/assets/dresses/005.jpg"
                        alt="Heritage"
                        className="w-full h-full object-cover grayscale"
                    />
                </div>
                <div className="relative z-10 text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-8xl font-display text-white tracking-[0.2em] mb-4">GERA</h1>
                        <p className="text-white uppercase tracking-[0.4em] font-bold text-sm">Join the Heritage</p>
                    </motion.div>
                    <div className="w-px h-24 bg-white/20 mx-auto" />
                    <p className="text-white/60 text-xs uppercase tracking-[0.3em] max-w-sm leading-relaxed font-medium">
                        Create an account to access exclusive collections, personalized concierge services, and early access to seasonal releases.
                    </p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 lg:px-32 py-20 bg-white">
                <div className="max-w-md w-full mx-auto space-y-12">
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.1em] text-gray-500 hover:text-brand-charcoal transition-colors group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Return Home
                        </Link>
                        <h2 className="text-4xl md:text-5xl font-display text-brand-charcoal">CREATE ACCOUNT</h2>
                        <p className="text-base text-gray-500 font-medium italic">Welcome to the inner circle of GERA.</p>
                    </div>

                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 border border-green-100 p-8 rounded-[32px] text-center space-y-4"
                        >
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-lg shadow-green-100">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-xl font-display text-green-800">Registration Successful</h3>
                            <p className="text-sm text-green-600/80">Welcome to GERA. Redirecting you to sign in...</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {error && (
                                <p className="bg-red-50 text-red-500 text-xs py-4 px-6 rounded-2xl border border-red-100 font-bold tracking-wide">
                                    {error.toUpperCase()}
                                </p>
                            )}

                            <div className="space-y-6">
                                <div className="space-y-2 relative group">
                                    <label className="text-xs uppercase tracking-[0.2em] font-black text-gray-500 group-focus-within:text-brand-accent transition-colors">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-brand-accent transition-colors" size={18} strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-transparent border-b border-gray-100 py-4 pl-8 focus:border-brand-charcoal outline-none transition-all text-base font-medium placeholder:text-gray-300"
                                            placeholder="Alexandra Varma"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 relative group">
                                    <label className="text-xs uppercase tracking-[0.2em] font-black text-gray-500 group-focus-within:text-brand-accent transition-colors">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-brand-accent transition-colors" size={18} strokeWidth={1.5} />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-transparent border-b border-gray-100 py-4 pl-8 focus:border-brand-charcoal outline-none transition-all text-base font-medium placeholder:text-gray-300"
                                            placeholder="alexandra@heritage.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 relative group">
                                    <label className="text-xs uppercase tracking-[0.2em] font-black text-gray-500 group-focus-within:text-brand-accent transition-colors">Password</label>
                                    <div className="relative">
                                        <LockIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-brand-accent transition-colors" size={18} strokeWidth={1.5} />
                                        <input
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-transparent border-b border-gray-100 py-4 pl-8 focus:border-brand-charcoal outline-none transition-all text-base font-medium placeholder:text-gray-300"
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
                                        {loading ? "Creating Account..." : "Join the Collection"}
                                    </span>
                                    {!loading && <ChevronRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />}
                                    <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                <p className="text-center text-xs uppercase font-bold tracking-widest text-gray-500">
                                    ALREADY HAVE AN ACCOUNT? <Link href="/signin" className="text-brand-charcoal border-b border-brand-charcoal hover:text-brand-accent hover:border-brand-accent transition-all ml-2 font-black">SIGN IN</Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
