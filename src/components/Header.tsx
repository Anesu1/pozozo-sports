'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  Menu,
  X,
  MessageCircle,
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
        className={`sticky top-0 z-40 w-full bg-[#F5F1E8] border-b border-[#DED7C9] transition-shadow duration-300 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[72px] gap-2 sm:gap-4">
            {/* Left: Mobile Menu Trigger & Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 -ml-1 rounded-full text-[#12100E] hover:bg-[#EFE9DC] active:bg-[#E4DED1] transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <Link href="/" className="flex items-baseline gap-2 group">
                <span className="text-lg xs:text-xl sm:text-2xl font-black tracking-tight text-[#12100E] font-display leading-none whitespace-nowrap">
                  POZOZO
                </span>
                <span className="hidden xs:inline text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#9C9284] whitespace-nowrap">
                  SPORTS
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 min-w-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-bold uppercase tracking-wider transition-colors py-2 relative whitespace-nowrap ${
                      isActive ? 'text-[#12100E]' : 'text-[#6B6459] hover:text-[#C8482B]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8482B] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Search, Wishlist, Currency, Enquiry & WhatsApp */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Modal Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 sm:p-2.5 rounded-full text-[#12100E] hover:bg-[#EFE9DC] active:scale-95 transition-all"
                title="Search balls (⌘K)"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 sm:p-2.5 rounded-full text-[#12100E] hover:bg-[#EFE9DC] active:scale-95 transition-all"
                title="Saved Items"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#C8482B] text-white rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Currency Selector (Desktop) */}
              <div className="hidden 2xl:flex items-center text-xs font-semibold bg-[#EFE9DC] rounded-full px-3 py-1.5 border border-[#DED7C9] shrink-0">
                <Globe className="w-3.5 h-3.5 text-[#9C9284] mr-1.5" />
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

              {/* Enquiry List Trigger */}
              <button
                onClick={openCart}
                className="flex items-center gap-2 h-10 px-3.5 rounded-full border border-[#CFC5B4] hover:border-[#12100E] bg-transparent text-[#12100E] text-xs sm:text-[12.5px] font-semibold transition-colors shrink-0"
                aria-label="Open Enquiry List"
              >
                <span className="hidden sm:inline">Enquiry</span>
                <span
                  className={`min-w-[21px] h-[21px] grid place-items-center rounded-full text-[11px] font-bold px-1.5 ${
                    totalItems > 0 ? 'bg-[#C8482B] text-white' : 'bg-[#E4DED1] text-[#9C9284]'
                  }`}
                >
                  {totalItems}
                </span>
              </button>

              {/* WhatsApp Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 h-10 px-5 rounded-full bg-[#12100E] hover:bg-[#C8482B] text-white text-xs sm:text-[12.5px] font-bold transition-colors shrink-0"
                title="Chat on WhatsApp"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-[#7BE38B]" />
                <span>WhatsApp us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[56px] sm:top-[64px] z-50 xl:hidden bg-[#12100E]/50 backdrop-blur-xs flex flex-col">
            <div className="bg-[#F5F1E8] border-b border-[#DED7C9] px-4 py-6 space-y-5 max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#DED7C9]">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#9C9284]">
                  Navigation
                </span>
                {/* Mobile Currency Switcher */}
                <div className="flex items-center text-xs font-semibold bg-[#EFE9DC] rounded-full px-2.5 py-1 border border-[#DED7C9]">
                  <Globe className="w-3 h-3 text-[#9C9284] mr-1" />
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
                      className={`text-sm font-bold py-3 px-3 rounded-2xl flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-[#12100E] text-white'
                          : 'text-[#12100E] hover:bg-[#EFE9DC]'
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
                  className="w-full py-3.5 bg-[#12100E] active:bg-[#C8482B] text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-md"
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
