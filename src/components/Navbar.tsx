"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="w-full bg-brand-paper border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Side Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-[0.2em]">
            <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-brand-accent transition-colors">Shop</Link>
          </div>

          {/* Centered Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-4xl font-display tracking-[0.3em] font-light">
              GERA
            </Link>
          </div>

          {/* Right Side Links & Icons */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-[0.2em]">
            <Link href="/about" className="hover:text-brand-accent transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-brand-accent transition-colors">Contact</Link>
            <div className="flex items-center space-x-5 ml-4">
              <button className="p-1 hover:text-brand-accent transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button className="p-1 hover:text-brand-accent transition-colors">
                <User size={20} strokeWidth={1.5} />
              </button>
              <button className="p-1 hover:text-brand-accent transition-colors relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-charcoal text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-paper border-b border-gray-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 text-center uppercase tracking-[0.2em] text-sm font-medium">
              <Link href="/" className="block py-2 hover:text-brand-accent" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/shop" className="block py-2 hover:text-brand-accent" onClick={() => setIsOpen(false)}>Shop</Link>
              <Link href="/about" className="block py-2 hover:text-brand-accent" onClick={() => setIsOpen(false)}>About Us</Link>
              <Link href="/contact" className="block py-2 hover:text-brand-accent" onClick={() => setIsOpen(false)}>Contact</Link>
              <div className="flex justify-center gap-8 pt-4 border-t border-gray-100">
                <button className="p-2"><Search size={20} /></button>
                <button className="p-2"><User size={20} /></button>
                <button className="p-2 relative">
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 bg-brand-charcoal text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
