"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SizeChartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
    const sizeData = [
        { size: "XS", chest: "32-34", waist: "26-28", hip: "34-36" },
        { size: "S", chest: "35-37", waist: "29-31", hip: "37-39" },
        { size: "M", chest: "38-40", waist: "32-34", hip: "40-42" },
        { size: "L", chest: "41-43", waist: "35-37", hip: "43-45" },
        { size: "XL", chest: "44-46", waist: "38-40", hip: "46-48" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-8 lg:p-12 flex justify-between items-center border-b border-gray-100">
                            <div className="space-y-1">
                                <h2 className="text-3xl font-display uppercase tracking-widest text-brand-charcoal">Size Chart</h2>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-black">Measurements in inches</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-4 hover:bg-gray-50 rounded-full transition-colors group cursor-pointer"
                            >
                                <X size={20} className="text-gray-400 group-hover:text-brand-charcoal" strokeWidth={1} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 lg:p-12 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 italic">
                                        <th className="py-6 px-4 text-xs uppercase tracking-[0.2em] font-black text-brand-charcoal">Size (US)</th>
                                        <th className="py-6 px-4 text-xs uppercase tracking-[0.2em] font-black text-brand-charcoal">Chest</th>
                                        <th className="py-6 px-4 text-xs uppercase tracking-[0.2em] font-black text-brand-charcoal">Waist</th>
                                        <th className="py-6 px-4 text-xs uppercase tracking-[0.2em] font-black text-brand-charcoal">Hip</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizeData.map((row) => (
                                        <tr key={row.size} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-6 px-4 text-sm font-bold tracking-widest text-brand-charcoal">{row.size}</td>
                                            <td className="py-6 px-4 text-sm text-gray-500 font-light tracking-widest">{row.chest}</td>
                                            <td className="py-6 px-4 text-sm text-gray-500 font-light tracking-widest">{row.waist}</td>
                                            <td className="py-6 px-4 text-sm text-gray-500 font-light tracking-widest">{row.hip}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-12 p-8 bg-gray-50/50 rounded-2xl flex items-start gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 flex-shrink-0" />
                                <p className="text-xs text-gray-500 leading-relaxed font-medium uppercase tracking-widest">
                                    Our garments are tailored for a structured silhouette. If you prefer a more fluid drape, we recommend selecting one size up from your typical measurement.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
