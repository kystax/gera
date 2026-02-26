"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "./CartDrawer";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define nav links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop", dropdown: ["Bridal", "Dresses", "Tops", "Skirts", "Pants"] },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled
          ? "bg-white/95 backdrop-blur-3xl py-4 shadow-[0_15px_50px_rgba(0,0,0,0.03)] border-b border-gray-100"
          : "bg-white/70 backdrop-blur-xl py-6 border-b border-white/10"
          }`}
      >
        <div className="max-w-[1800px] mx-auto px-8 md:px-20 flex justify-between items-center relative">

          {/* Left: Navigation Items */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.slice(0, 2).map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="text-[12px] uppercase font-bold tracking-[0.3em] transition-all duration-500 flex items-center gap-2 group-hover:text-brand-accent text-brand-charcoal"
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown size={14} className="opacity-40 group-hover:rotate-180 transition-transform duration-500" />
                  )}
                </Link>

                {link.dropdown && (
                  <div className="absolute top-full -left-8 pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 ease-out">
                    <div className="bg-white border border-gray-100 shadow-[0_40px_80px_rgba(0,0,0,0.1)] p-10 min-w-[260px] rounded-[32px] overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent opacity-20" />
                      <div className="grid grid-cols-1 gap-6">
                        {link.dropdown.map(item => (
                          <Link
                            key={item}
                            href={`/shop/${item.toLowerCase()}`}
                            className="text-xs uppercase font-extrabold tracking-[0.2em] text-gray-400 hover:text-brand-charcoal hover:translate-x-2 transition-all duration-300 flex items-center justify-between group/item"
                          >
                            <span>{item}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent scale-0 group-hover/item:scale-100 transition-transform" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Center: Branding */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 group text-center"
          >
            <span className="text-2xl md:text-5xl font-display tracking-[0.3em] font-light text-brand-charcoal block transition-all group-hover:tracking-[0.5em] duration-1000">
              GERA
            </span>
          </Link>

          {/* Right: Actions & Right Links */}
          <div className="flex items-center gap-6 md:gap-10">
            <div className="hidden lg:flex items-center gap-10 mr-4">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[12px] uppercase font-bold tracking-[0.3em] transition-all duration-500 hover:text-brand-accent text-brand-charcoal"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <button className="text-brand-charcoal hover:text-brand-accent transition-all hover:scale-110 hidden sm:block">
                <Search size={22} strokeWidth={1.5} />
              </button>

              <button className="text-brand-charcoal hover:text-brand-accent transition-all hover:scale-110 hidden sm:block">
                <User size={22} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-brand-charcoal hover:text-brand-accent transition-all hover:scale-110 group"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-charcoal text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold ring-2 ring-white shadow-lg group-hover:scale-110 transition-transform">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden text-brand-charcoal hover:scale-110 transition-transform"
              >
                <Menu size={28} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[200] p-12 flex flex-col"
          >
            <div className="flex justify-between items-center mb-24">
              <span className="text-3xl font-display tracking-[0.5em] uppercase font-light">GERA</span>
              <button onClick={() => setIsOpen(false)} className="p-4 bg-gray-50 rounded-full">
                <X size={28} strokeWidth={1} />
              </button>
            </div>

            <div className="flex flex-col gap-16 items-start">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="w-full flex justify-between items-end border-b border-gray-50 pb-6"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-display uppercase tracking-widest text-brand-charcoal hover:translate-x-4 transition-transform inline-block"
                  >
                    {link.name}
                  </Link>
                  <span className="text-xs text-gray-400 font-bold">0{idx + 1}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-20 flex justify-between items-center border-t border-gray-100">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">Concierge</p>
                <p className="text-sm font-bold text-brand-charcoal">concierge@gera.com</p>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                  <User size={18} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
