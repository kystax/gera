"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, CreditCard, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { cart, removeFromCart, addToCart, cartCount } = useCart();

    const subtotal = cart.reduce((total, item) =>
        total + (parseFloat(item.price.replace('$', '').replace(',', '')) * item.quantity), 0
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with soft blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#2D2E5F]/20 backdrop-blur-md z-[100]"
                    />

                    {/* Drawer matching playful Rice Cream aesthetic */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 250 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F0F4F8] z-[101] shadow-2xl flex flex-col p-6"
                    >
                        <div className="bg-white rounded-[40px] h-full flex flex-col overflow-hidden shadow-2xl border border-white">

                            {/* Header Section */}
                            <div className="p-8 pb-4 flex items-center justify-between border-b border-gray-50">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-bold text-[#2D2E5F]">Shopping Bag</h2>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-400" />
                                        <span className="text-xs uppercase font-black tracking-widest text-gray-400">
                                            {cartCount} Handpicked {cartCount === 1 ? 'Item' : 'Items'}
                                        </span>
                                    </div>
                                </div>
                                <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F8FAFC] text-gray-300 hover:text-[#7D76E4] hover:bg-white transition-all shadow-sm">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Items List */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                        <div className="w-24 h-24 bg-[#F8FAFC] rounded-full flex items-center justify-center text-gray-200">
                                            <ShoppingBag size={40} />
                                        </div>
                                        <p className="text-xs uppercase font-black tracking-[0.4em] text-gray-400">Your bag is empty</p>
                                        <button onClick={onClose} className="text-[#7D76E4] font-bold border-b-2 border-[#7D76E4] pb-1 uppercase tracking-widest text-xs">Start Creation</button>
                                    </div>
                                ) : (
                                    cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="bg-[#F8FAFC] rounded-[30px] p-5 flex gap-5 group items-center relative border border-white"
                                        >
                                            <div className="relative w-24 aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xs font-black uppercase tracking-widest text-[#2D2E5F] leading-tight mb-1">{item.name}</h3>
                                                        <span className="text-sm font-extrabold text-[#7D76E4]">{item.price}</span>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-200 hover:text-red-400 p-1">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="bg-white rounded-xl p-0.5 flex items-center border border-gray-100 shadow-sm">
                                                        <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-brand-charcoal"><Minus size={12} /></button>
                                                        <span className="w-8 text-center text-xs font-black text-[#2D2E5F]">{item.quantity}</span>
                                                        <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-brand-charcoal"><Plus size={12} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {/* Footer Summary (Matching Rice Cream Style) */}
                            {cart.length > 0 && (
                                <div className="p-8 pt-0 space-y-6">
                                    <div className="bg-[#F8FAFC] p-8 rounded-[35px] space-y-6 border border-white">
                                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                                            <span>Subtotal</span>
                                            <span className="text-[#2D2E5F]">${subtotal.toLocaleString()}.00</span>
                                        </div>

                                        <div className="flex justify-between items-end border-t border-white pt-4">
                                            <div className="space-y-1">
                                                <span className="text-xs uppercase tracking-widest font-black text-[#7D76E4]">Total Due</span>
                                                <span className="text-3xl font-bold text-[#2D2E5F] tracking-tighter">${subtotal.toLocaleString()}.00</span>
                                            </div>

                                            <Link
                                                href="/cart"
                                                onClick={onClose}
                                                className="bg-[#2D2E5F] text-white p-5 rounded-3xl shadow-xl shadow-indigo-100/50 hover:bg-[#3d3e75] transition-all transform hover:scale-105"
                                            >
                                                <ArrowRight size={24} />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-8 text-gray-200">
                                        <ShieldCheck size={20} />
                                        <div className="w-px h-6 bg-gray-100" />
                                        <Truck size={20} />
                                        <div className="w-px h-6 bg-gray-100" />
                                        <CreditCard size={20} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
