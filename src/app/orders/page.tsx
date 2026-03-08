"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Truck, CheckCircle2, ChevronRight, ShoppingBag, ArrowLeft, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type OrderItem = {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

type Order = {
    _id: string;
    items: OrderItem[];
    total: number;
    status: string;
    createdAt: string;
    shippingAddress?: {
        name: string;
        city: string;
        address: string;
    };
};

export default function OrdersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/signin?callbackUrl=/orders");
        } else if (status === "authenticated") {
            fetchOrders();
        }
    }, [status]);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-px bg-brand-charcoal animate-pulse" />
                    <span className="text-xs uppercase tracking-[0.4em] font-black text-brand-charcoal animate-pulse">Retrieving Archives...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-40 pb-32">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-20 space-y-4">
                    <Link href="/" className="inline-flex items-center gap-3 text-xs uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-brand-charcoal transition-colors group mb-6">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
                        Return Home
                    </Link>
                    <h1 className="text-6xl md:text-8xl font-display text-brand-charcoal">MY ORDERS</h1>
                    <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-semibold">Your history with GERA, archived for you.</p>
                </div>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[48px] p-24 text-center space-y-12 border border-gray-100 shadow-sm"
                    >
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
                            <ShoppingBag size={48} strokeWidth={1} />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-display">NO SELECTIONS MADE YET</h2>
                            <p className="text-sm text-gray-400 max-w-sm mx-auto font-light leading-relaxed">
                                Your order history is empty. Start your journey with our collection today carefully curated for timeless elegance.
                            </p>
                        </div>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-6 bg-brand-charcoal text-white px-12 py-6 rounded-full text-xs uppercase tracking-[0.4em] font-black hover:bg-brand-accent transition-all active:scale-95 shadow-2xl"
                        >
                            Explore Collection <ChevronRight size={18} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-10">
                        {orders.map((order, idx) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm group hover:border-brand-charcoal/20 transition-all duration-700"
                            >
                                {/* Order Header */}
                                <div className="px-10 py-10 bg-gray-50/50 flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center gap-8">
                                        <div className="space-y-1">
                                            <span className="text-xs uppercase tracking-[0.2em] font-black text-gray-400">Order ID</span>
                                            <p className="text-sm font-bold tracking-widest text-brand-charcoal">#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                        <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                                        <div className="space-y-1">
                                            <span className="text-xs uppercase tracking-[0.2em] font-black text-gray-400">Placed on</span>
                                            <p className="text-sm font-semibold text-brand-charcoal">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-black ${order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                                            order.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                                                'bg-blue-50 text-blue-600'
                                            }`}>
                                            {order.status === 'delivered' ? <CheckCircle2 size={12} /> :
                                                order.status === 'processing' ? <Clock size={12} /> :
                                                    <Truck size={12} />}
                                            {order.status}
                                        </div>
                                        <span className="text-2xl font-display">${order.total.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-10 divide-y divide-gray-100">
                                    {order.items.map((item) => (
                                        <div key={item.productId} className="py-8 first:pt-0 last:pb-0 flex items-center gap-8">
                                            <div className="relative w-24 aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 p-2">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-charcoal">{item.name}</h3>
                                                <div className="flex gap-4 text-xs text-gray-500 uppercase tracking-widest font-semibold">
                                                    <span>Qty: {item.quantity}</span>
                                                    <span>/</span>
                                                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <button className="text-xs uppercase tracking-[0.2em] font-black text-gray-400 hover:text-brand-charcoal p-2 transition-colors">
                                                Review Piece
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Shipping Footer (Optional/Expandable) */}
                                {order.shippingAddress && (
                                    <div className="px-10 py-6 border-t border-gray-50 bg-gray-50/20 text-xs uppercase tracking-[0.2em] text-gray-500 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Truck size={14} strokeWidth={1.5} />
                                            <span>Ship to: {order.shippingAddress.city}</span>
                                        </div>
                                        <button className="hover:text-brand-charcoal transition-colors">Track Shipment</button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

