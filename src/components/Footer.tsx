'use client';

import Link from 'next/link';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="bg-[#13251C] text-[#F3F5F0] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-9 grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 lg:gap-11">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <Logo size={26} />
            <span className="font-display uppercase text-lg leading-none">Pozozo Trading</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B9782] self-end pb-0.5">
              SPORTS DIVISION
            </span>
          </div>
          <p className="text-sm text-[#B4BEA8] leading-relaxed max-w-[34ch]">
            Molten and Mikasa balls for basketball, football, netball and volleyball, plus Fox40
            officiating gear. Enquire, don&apos;t checkout.
          </p>
        </div>

        {/* Shop */}
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8B9782] mb-4">Shop</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/shop" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Everything
            </Link>
            <Link href="/sport/basketball" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Basketball
            </Link>
            <Link href="/sport/football" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Football
            </Link>
            <Link href="/sport/netball" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Netball
            </Link>
            <Link href="/sport/volleyball" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Volleyball
            </Link>
            <Link href="/brand/molten" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Molten
            </Link>
            <Link href="/brand/mikasa" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Mikasa
            </Link>
          </div>
        </div>

        {/* Learn */}
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8B9782] mb-4">Learn</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/size-guide" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Ball size guide
            </Link>
            <Link href="/care" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Care &amp; inflation
            </Link>
            <Link href="/faq" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              FAQ
            </Link>
            <Link href="/price-list" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Stock list
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8B9782] mb-4">Company</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/about" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              About
            </Link>
            <Link href="/who-we-supply" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Who we supply
            </Link>
            <Link href="/bulk" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Bulk &amp; schools
            </Link>
            <Link href="/contact" className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-[#26362A] text-xs text-[#B4BEA8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} Pozozo Sports · Prices quoted on enquiry · No online payment</span>
        <div className="flex items-center gap-5">
          <Link href="/terms-of-service" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/return-and-refund-policy" className="hover:text-white transition-colors">
            Guarantee
          </Link>
          <Link href="/shipping-policy" className="hover:text-white transition-colors">
            Shipping
          </Link>
          <Link href="/cookie-policy" className="hover:text-white transition-colors">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
