'use client';

import Link from 'next/link';
import { STORE_CONFIG, getWhatsAppUrl, getMailtoUrl } from '@/data/sportsConfig';

export function Footer() {
  const waUrl = getWhatsAppUrl('Hello Pozozo Sports, I have an equipment enquiry.');
  const mailUrl = getMailtoUrl('Enquiry — Pozozo Sports', 'Hello Pozozo Sports,');

  return (
    <footer className="bg-[#12100E] text-[#F5F1E8] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-9 grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 lg:gap-11">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-black tracking-tight text-white font-display">POZOZO</span>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#8E857A]">SPORTS</span>
          </div>
          <p className="text-sm text-[#A79B8C] leading-relaxed max-w-[34ch]">
            Molten and Mikasa balls for basketball, football and netball. Enquire, don&apos;t checkout.
          </p>
        </div>

        {/* Shop */}
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8E857A] mb-4">Shop</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/shop/category/basketball" className="text-[#F5F1E8] hover:text-[#C8482B] transition-colors">
              Basketball
            </Link>
            <Link href="/shop/category/football" className="text-[#F5F1E8] hover:text-[#C8482B] transition-colors">
              Football
            </Link>
            <Link href="/shop/category/netball" className="text-[#F5F1E8] hover:text-[#C8482B] transition-colors">
              Netball
            </Link>
            <Link href="/shop/category/accessories" className="text-[#F5F1E8] hover:text-[#C8482B] transition-colors">
              Accessories
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8E857A] mb-4">Company</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/about" className="text-[#F5F1E8] hover:text-[#C8482B] transition-colors">
              About
            </Link>
            <Link href="/#bulk" className="text-[#F5F1E8] hover:text-[#C8482B] transition-colors">
              Bulk &amp; schools
            </Link>
            <Link href="/journal" className="text-[#F5F1E8] hover:text-[#C8482B] transition-colors">
              Guides
            </Link>
            <Link href="/contact" className="text-[#F5F1E8] hover:text-[#C8482B] transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Talk to us */}
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8E857A] mb-4">Talk to us</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-[#F5F1E8] hover:text-[#C8482B] transition-colors">
              WhatsApp {STORE_CONFIG.displayPhone}
            </a>
            <a href={mailUrl} className="text-[#F5F1E8] hover:text-[#C8482B] transition-colors">
              {STORE_CONFIG.email}
            </a>
            <span className="text-[#A79B8C]">{STORE_CONFIG.operatingHours}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-[#2A2622] text-xs text-[#6E665C] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} Pozozo Sports · Prices quoted on enquiry · No online payment</span>
        <div className="flex items-center gap-5">
          <Link href="/terms-of-service" className="hover:text-[#F5F1E8] transition-colors">
            Terms
          </Link>
          <Link href="/privacy-policy" className="hover:text-[#F5F1E8] transition-colors">
            Privacy
          </Link>
          <Link href="/return-and-refund-policy" className="hover:text-[#F5F1E8] transition-colors">
            Guarantee
          </Link>
        </div>
      </div>
    </footer>
  );
}
