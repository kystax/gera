"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
    ArrowRight,
    Plus,
    Minus,
    Heart,
    Share2,
    Shield
} from "lucide-react";
import { useState, useEffect } from "react";
import SizeChartModal from "@/components/SizeChartModal";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const { addToCart } = useCart();

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const result = await response.json();
                if (result.success) {
                    setProduct(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full font-black"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-display uppercase tracking-widest text-gray-200">Artifact Not Found</h1>
                    <button onClick={() => router.back()} className="text-brand-charcoal border-b border-brand-charcoal py-2 px-8 uppercase text-[10px] font-black tracking-widest cursor-pointer">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const sizes = ["XS", "S", "M", "L", "XL"];

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-brand-charcoal selection:bg-brand-charcoal selection:text-white">
            <main className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-32">
                {/* Left: Visual Showcase (7 cols) */}
                <div className="lg:col-span-12 h-[80vh] lg:h-[90vh] sticky top-0 overflow-hidden bg-white border-b border-gray-100">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-8 lg:p-20"
                            priority
                        />
                    </motion.div>

                    {/* Image Controls Overlay */}
                    <div className="absolute bottom-10 left-10 flex flex-col gap-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 bg-white/80 backdrop-blur-md flex items-center justify-center text-brand-charcoal border border-gray-100 shadow-xl cursor-pointer"
                        >
                            <Heart size={24} strokeWidth={1} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 bg-white/80 backdrop-blur-md flex items-center justify-center text-brand-charcoal border border-gray-100 shadow-xl cursor-pointer"
                        >
                            <Share2 size={24} strokeWidth={1} />
                        </motion.button>
                    </div>
                </div>

                {/* Right: Content & Detail (5 cols) */}
                <div className="lg:col-span-12 px-8 lg:px-40 py-20 flex flex-col bg-white">
                    <div className="max-w-xl mx-auto w-full space-y-12">
                        {/* Product Header */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <span className="text-xs uppercase tracking-[0.6em] text-brand-accent font-black block">Edition 2026 / {product.category}</span>
                                <h1 className="text-5xl lg:text-7xl font-display leading-[0.9] tracking-tight text-brand-charcoal">
                                    {product.name}
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-between items-end border-b border-gray-100 pb-8"
                            >
                                <p className="text-4xl font-light text-brand-charcoal tracking-tight">{product.price}</p>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">
                                    <Shield size={16} className="text-brand-accent" /> Guaranteed Authentic
                                </div>
                            </motion.div>
                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-base text-gray-500 leading-relaxed font-medium"
                        >
                            {product.desc}
                            <br /><br />
                            Handcrafted with precision, this piece embodies modern luxury. The silhouette is designed for both structure and grace, ensuring a perfect presence at any occasion.
                        </motion.p>

                        {/* Personalization Options */}
                        <div className="space-y-10">
                            {/* Size Selector */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs uppercase font-black tracking-[0.4em]">
                                    <span>Select Size</span>
                                    <button
                                        onClick={() => setIsSizeChartOpen(true)}
                                        className="text-gray-400 hover:text-brand-charcoal transition-colors border-b border-transparent cursor-pointer font-black"
                                    >
                                        Size Chart
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-14 h-14 text-xs font-black tracking-widest transition-all rounded-full border shadow-sm
                                            ${selectedSize === size ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-xl' : 'border-gray-100 hover:border-brand-charcoal text-gray-400'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & Actions */}
                            <div className="flex flex-col gap-6 pt-4">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center bg-white border border-gray-100 rounded-full px-8 py-5 gap-12 shadow-sm">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-brand-charcoal transition-colors cursor-pointer"><Minus size={18} /></button>
                                        <span className="text-base font-black min-w-[20px] text-center">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-brand-charcoal transition-colors cursor-pointer"><Plus size={18} /></button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => addToCart({
                                        id: product.pid || product._id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.image
                                    })}
                                    className="w-full bg-brand-charcoal text-white py-6 rounded-full flex items-center justify-center gap-6 group overflow-hidden relative shadow-2xl active:scale-[0.98] transition-all cursor-pointer"
                                >
                                    <span className="relative z-10 text-xs uppercase tracking-[0.5em] font-black">Add to Collection</span>
                                    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>

                        {/* Secondary Details Accordion */}
                        <div className="space-y-0 border-t border-gray-100">
                            <DetailAccordion title="Fabric & Composition" content="100% Premium Mulberry Silk. Responsibly sourced and woven in our heritage mills focusing on purity and sustainability." />
                            <DetailAccordion title="Care & Maintenance" content="Professional dry clean only. Store in provided dust bag and avoid direct sunlight exposure to maintain fabric integrity." />
                            <DetailAccordion title="Shipping & Returns" content="Complimentary express shipping on all orders. Personalized boutique returns within 14 days of acquisition." />
                        </div>

                        {/* Footer Logo Decor */}
                        <div className="pt-20 opacity-5 flex flex-col items-center gap-6">
                            <div className="w-12 h-px bg-brand-charcoal" />
                            <span className="text-[60px] font-display tracking-[0.5em]">GERA</span>
                        </div>
                    </div>
                </div>
            </main>
            <SizeChartModal isOpen={isSizeChartOpen} onClose={() => setIsSizeChartOpen(false)} />
        </div>
    );
}

function DetailAccordion({ title, content }: { title: string, content: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-100 py-10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-xs uppercase font-black tracking-[0.4em] text-gray-400 hover:text-brand-charcoal transition-colors cursor-pointer"
            >
                {title}
                <motion.div animate={{ rotate: isOpen ? 135 : 0 }}>
                    <Plus size={18} strokeWidth={1.5} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-8 text-sm leading-relaxed text-gray-500 font-medium">
                            {content}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
