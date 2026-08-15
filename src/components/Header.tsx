'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  Menu,
  X,
  MessageCircle,
  ClipboardList,
  ShieldCheck,
  Globe,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { SearchModal } from '@/components/SearchModal';
import { STORE_CONFIG, getWhatsAppUrl } from '@/data/sportsConfig';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { openCart, totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { currency, setCurrency, currencies } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'All Balls', href: '/shop' },
    { label: 'Basketball', href: '/shop/category/basketball' },
    { label: 'Football', href: '/shop/category/football' },
    { label: 'Netball', href: '/shop/category/netball' },
    { label: 'Accessories', href: '/shop/category/accessories' },
    { label: 'Bulk & Schools', href: '/#bulk' },
    { label: 'Guides', href: '/journal' },
    { label: 'About', href: '/about' },
  ];

  const waUrl = getWhatsAppUrl('Hello Pozozo Sports, I would like to make an enquiry.');

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#E8E4DF] shadow-xs'
            : 'bg-white border-b border-[#E8E4DF]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-18 lg:h-20 gap-2 sm:gap-4">
            {/* Left: Mobile Menu Trigger & Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 -ml-1 rounded-xl text-[#12100E] hover:bg-[#F6F4F1] active:bg-[#ECE9E7] transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <Link href="/" className="flex flex-col items-start group">
                <span className="text-base xs:text-lg sm:text-2xl font-black tracking-tight text-[#12100E] group-hover:text-black font-display leading-tight whitespace-nowrap">
                  POZOZO SPORTS
                </span>
                <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-[#8E857A] -mt-0.5 whitespace-nowrap">
                  MOLTEN &amp; MIKASA
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-bold uppercase tracking-wider transition-colors py-2 relative whitespace-nowrap ${
                      isActive ? 'text-[#12100E]' : 'text-[#757575] hover:text-[#12100E]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#12100E] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Search, Wishlist, WhatsApp & Enquiry Bag */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Search Modal Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl text-[#12100E] hover:bg-[#F6F4F1] active:scale-95 transition-all"
                title="Search balls (⌘K)"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 sm:p-2.5 rounded-xl text-[#12100E] hover:bg-[#F6F4F1] active:scale-95 transition-all"
                title="Saved Items"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-rose-500 text-white rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Currency Selector (Desktop) */}
              <div className="hidden xl:flex items-center text-xs font-semibold bg-[#F6F4F1] rounded-xl px-2.5 py-1.5 border border-[#E8E4DF]">
                <Globe className="w-3.5 h-3.5 text-[#8E857A] mr-1.5" />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-[#12100E] outline-none cursor-pointer"
                >
                  {Object.keys(currencies).map((code) => (
                    <option key={code} value={code}>
                      {code} ({currencies[code as keyof typeof currencies].symbol})
                    </option>
                  ))}
                </select>
              </div>

              {/* WhatsApp Quick Button (Hidden on very small mobile) */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </a>

              {/* Enquiry List Trigger */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl bg-[#12100E] hover:bg-black active:scale-95 text-white text-xs font-bold transition-all shadow-xs shrink-0"
                aria-label="Open Enquiry List"
              >
                <ClipboardList className="w-4 h-4" />
                <span className="hidden sm:inline">Enquiry List</span>
                <span className="bg-white text-[#12100E] text-[10px] sm:text-[11px] font-extrabold px-1.5 sm:px-2 py-0.2 rounded-full min-w-[18px] text-center">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[56px] sm:top-[72px] z-50 lg:hidden bg-black/50 backdrop-blur-xs flex flex-col">
            <div className="bg-white border-b border-[#E8E4DF] px-4 py-6 space-y-5 max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DF]">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8E857A]">
                  Navigation
                </span>
                {/* Mobile Currency Switcher */}
                <div className="flex items-center text-xs font-semibold bg-[#F6F4F1] rounded-lg px-2 py-1 border border-[#E8E4DF]">
                  <Globe className="w-3 h-3 text-[#8E857A] mr-1" />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="bg-transparent text-xs font-bold text-[#12100E] outline-none cursor-pointer"
                  >
                    {Object.keys(currencies).map((code) => (
                      <option key={code} value={code}>
                        {code} ({currencies[code as keyof typeof currencies].symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm font-bold py-3 px-3 rounded-xl flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-[#12100E] text-white'
                          : 'text-[#12100E] hover:bg-[#F6F4F1]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </Link>
                  );
                })}
              </nav>

              {/* Direct WhatsApp Call to Action in Menu */}
              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp: {STORE_CONFIG.displayPhone}</span>
                </a>
              </div>
            </div>
            {/* Backdrop click to close */}
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}
      </header>

      {/* Global Search Modal (⌘K) */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
