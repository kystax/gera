"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    Search,
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    Bookmark,
    PlayCircle,
    Info,
    CreditCard,
    ShieldCheck,
    Truck,
    LayoutGrid
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
    const { cart, removeFromCart, addToCart, cartCount } = useCart();
    const router = useRouter();

    const subtotal = cart.reduce((total, item) =>
        total + (parseFloat(item.price.replace('$', '').replace(',', '')) * item.quantity), 0
    );

    return (
        <div className="min-h-screen bg-[#F0F4F8] font-sans selection:bg-indigo-100 p-4 md:p-8 pt-32">
            <div className="max-w-7xl mx-auto bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] overflow-hidden relative min-h-[90vh] flex flex-col">

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col lg:flex-row">

                    {/* Left & Middle: Cart Items List */}
                    <div className="flex-1 p-8 lg:p-16 pt-8">
                        <div className="mb-12 space-y-2">
                            <h1 className="text-5xl font-bold text-[#2D2E5F] tracking-tight">Your Bag</h1>
                            <p className="text-gray-400 font-medium font-display uppercase tracking-[0.3em] text-[10px]">Curation of your chosen pieces</p>
                        </div>

                        <div className="space-y-6">
                            {cart.length === 0 ? (
                                <div className="py-20 text-center space-y-6">
                                    <div className="w-32 h-32 bg-[#F8FAFC] rounded-full mx-auto flex items-center justify-center text-gray-200">
                                        <ShoppingBag size={48} />
                                    </div>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest">The bag is currently empty</p>
                                    <Link href="/shop" className="inline-block bg-[#7D76E4] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:scale-105 transition-transform">
                                        Explore Shop
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-[#F8FAFC] rounded-[32px] p-6 flex items-center gap-8 border border-white hover:border-indigo-100 transition-all hover:shadow-xl hover:shadow-indigo-50/50 group"
                                        >
                                            <div className="relative w-32 aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>

                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                                <div className="space-y-1">
                                                    <h3 className="text-xl font-bold text-[#2D2E5F] uppercase tracking-tight leading-tight">{item.name}</h3>
                                                    <p className="text-[#7D76E4] font-bold text-sm">Luxury Wardrobe</p>
                                                </div>

                                                <div className="flex flex-col items-center">
                                                    <div className="bg-white rounded-2xl p-1 flex items-center border border-gray-100 shadow-sm">
                                                        <button onClick={() => removeFromCart(item.id)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-all text-gray-300">
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-10 text-center font-bold text-[#2D2E5F]">{item.quantity}</span>
                                                        <button onClick={() => addToCart(item)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-all text-gray-300">
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between md:justify-end gap-10">
                                                    <span className="text-2xl font-bold text-[#2D2E5F]">{item.price}</span>
                                                    <button onClick={() => removeFromCart(item.id)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-200 hover:text-red-400 hover:bg-red-50 transition-all border border-gray-50">
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar: Checkout Action (Rice Cream Sidebar Style) */}
                    <div className="lg:w-3/12 bg-[#F8FAFC]/50 backdrop-blur-3xl border-l border-gray-50 p-8 lg:p-12 flex flex-col items-center justify-between space-y-12">

                        {/* Summary Info Tabs Style */}
                        <div className="w-full space-y-8">
                            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-white space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-[#2D2E5F]">${subtotal.toLocaleString()}.00</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    <span>Tax</span>
                                    <span className="text-[#2D2E5F]">$0.00</span>
                                </div>
                                <div className="w-full h-px bg-gray-50" />
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm font-bold text-[#2D2E5F] uppercase tracking-widest">Total</span>
                                    <span className="text-2xl font-bold text-[#7D76E4]">${subtotal.toLocaleString()}.00</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 w-full">
                                <SummaryAction icon={<Bookmark />} label="Save Draft" />
                                <SummaryAction icon={<Info />} label="Policies" />
                            </div>
                        </div>

                        {/* The Large Vertical Purchase Button from Image */}
                        <div className="w-full space-y-8 flex flex-col items-center pb-8">
                            <button
                                className="bg-[#2D2E5F] text-white w-28 h-48 rounded-[40px] flex flex-col items-center justify-center gap-6 shadow-[0_30px_60px_rgba(45,46,95,0.3)] hover:bg-[#3d3e75] transition-all transform active:scale-95 group relative overflow-hidden"
                            >
                                <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-all border border-white/10">
                                    <ArrowRight size={28} />
                                </div>
                                <span className="[writing-mode:vertical-lr] text-sm font-bold uppercase tracking-[0.4em]">Checkout</span>

                                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400" />
                            </button>

                            {/* Trust Visual */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-300 shadow-sm border border-gray-50">
                                    <ShieldCheck size={18} />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-300 shadow-sm border border-gray-50">
                                    <Truck size={18} />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-300 shadow-sm border border-gray-50">
                                    <CreditCard size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aesthetic Geometric Blobs */}
                <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-100px] right-20 w-96 h-96 bg-cyan-50/50 rounded-full blur-[100px] pointer-events-none" />
            </div>
        </div>
    );
}

function SummaryAction({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <button className="bg-white p-5 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-50 text-gray-400 hover:text-[#7D76E4] hover:shadow-lg transition-all w-full group">
            <div className="w-10 h-10 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-gray-300 group-hover:text-[#7D76E4] transition-colors">
                {icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
        </button>
    );
}
