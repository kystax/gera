"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, Truck, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { cart, removeFromCart, updateQuantity, cartCount, subtotal } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[200]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 250 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FDFBF7] z-[201] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-10 flex items-center justify-between border-b border-[#e4ddd3]/30">
                            <div>
                                <h2 className="text-3xl font-serif">Your Selection</h2>
                                <p className="text-xs uppercase tracking-widest text-gray-500 mt-1 font-bold">
                                    {cartCount} {cartCount === 1 ? 'Piece' : 'Pieces'} Curated
                                </p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-[#f3efea] rounded-full transition-colors text-gray-600">
                                <X size={24} strokeWidth={1} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                                    <ShoppingBag size={48} strokeWidth={1} className="text-gray-200" />
                                    <p className="text-sm font-serif italic text-gray-500">Your bag is currently empty.</p>
                                    <button onClick={onClose} className="text-xs uppercase tracking-widest border-b border-black pb-1">Begin Selection</button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-6 items-center"
                                    >
                                        <div className="relative w-24 aspect-[4/5] bg-[#f3efea] overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-sm font-serif">{item.name}</h3>
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-black p-1 transition-colors cursor-pointer">
                                                    <X size={14} />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-gray-600 cursor-pointer p-1 text-gray-500"><Minus size={12} /></button>
                                                    <span className="w-4 text-center font-serif">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-gray-600 cursor-pointer p-1 text-gray-500"><Plus size={12} /></button>
                                                </div>
                                                <span className="font-serif italic text-lg">{item.price}€</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer Summary */}
                        {cart.length > 0 && (
                            <div className="p-10 bg-white border-t border-[#e4ddd3]/30">
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Subtotal</span>
                                    <span className="text-2xl font-serif">{subtotal}€</span>
                                </div>

                                <Link
                                    href="/cart"
                                    onClick={onClose}
                                    className="w-full bg-black text-white py-6 text-sm uppercase tracking-[0.3em] font-medium hover:bg-gray-900 transition-all flex items-center justify-center gap-4 group"
                                >
                                    <span>Expand Bag</span>
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </Link>

                                <div className="flex items-center justify-center gap-8 mt-8 text-gray-300">
                                    <ShieldCheck size={20} strokeWidth={1} />
                                    <Truck size={20} strokeWidth={1} />
                                    <CreditCard size={20} strokeWidth={1} />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
