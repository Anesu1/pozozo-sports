'use client';

import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { NavLink } from '@/types';

interface FooterProps {
  logoLine1: string;
  logoLine2: string;
  tagline: string;
  columns: Array<{ heading: string; links: NavLink[] }>;
  copyright: string;
  legalLinks: NavLink[];
}

export function Footer({ logoLine1, logoLine2, tagline, columns, copyright, legalLinks }: FooterProps) {
  return (
    <footer className="bg-[#13251C] text-[#F3F5F0] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-8">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <Logo size={26} />
            <span className="font-display uppercase text-lg leading-none">{logoLine1}</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8B9782] self-end pb-0.5">
              {logoLine2}
            </span>
          </div>
          <p className="text-sm text-[#B4BEA8] leading-relaxed max-w-[34ch]">{tagline}</p>
          <p className="text-xs text-[#8B9782] mt-3 leading-relaxed max-w-[34ch]">
            SP2C Logistics (Pvt) Ltd — trading as Pozozo Trading (Sports Division). Supplying genuine tournament match
            balls and gear across Zimbabwe & SADC.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8B9782] mb-4">
              {column.heading}
            </div>
            <div className="flex flex-col gap-2.5 text-sm">
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Zimbabwe Commercial Links */}
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8B9782] mb-4">
            Zimbabwe Supply
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link
              href="/sports-equipment-zimbabwe"
              className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors"
            >
              Sports Equipment Zimbabwe
            </Link>
            <Link
              href="/sports-equipment-harare"
              className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors"
            >
              Sports Equipment Harare
            </Link>
            <Link
              href="/school-sports-equipment"
              className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors"
            >
              School Sports Equipment
            </Link>
            <Link
              href="/bulk-sports-equipment"
              className="text-[#F3F5F0] hover:text-[#F2900E] transition-colors"
            >
              Bulk Wholesale Orders
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-[#26362A] text-xs text-[#B4BEA8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>
          © {new Date().getFullYear()} SP2C Logistics (Pvt) Ltd / Pozozo Trading. All rights reserved.
        </span>
        <div className="flex items-center gap-5">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
