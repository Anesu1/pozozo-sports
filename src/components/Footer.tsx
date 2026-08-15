'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Mail, Phone, MapPin, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { STORE_CONFIG, getWhatsAppUrl } from '@/data/sportsConfig';

export function Footer() {
  const waUrl = getWhatsAppUrl('Hello Pozozo Sports, I have an equipment enquiry.');

  return (
    <footer className="bg-[#12100E] text-[#F5F1E8] pt-16 pb-12 border-t border-[#2A2622]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2A2622]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-2xl font-black tracking-tight text-white font-display">
                POZOZO SPORTS
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[#8E857A]">
                AUTHORISED MOLTEN &amp; MIKASA STOCK
              </p>
            </div>
            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
              Match balls, ordered by message. No card, no checkout. Pick what your club, school or shop needs, send the list on WhatsApp, and we come back with price, stock and delivery the same day.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {STORE_CONFIG.displayPhone}</span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/shop/category/basketball" className="hover:text-white transition-colors">
                  Basketball (19 Balls)
                </Link>
              </li>
              <li>
                <Link href="/shop/category/football" className="hover:text-white transition-colors">
                  Football (22 Balls)
                </Link>
              </li>
              <li>
                <Link href="/shop/category/netball" className="hover:text-white transition-colors">
                  Netball (9 Balls)
                </Link>
              </li>
              <li>
                <Link href="/shop/category/accessories" className="hover:text-white transition-colors">
                  Accessories &amp; AG500 Gauges
                </Link>
              </li>
              <li>
                <Link href="/shop/collection/molten" className="hover:text-white transition-colors">
                  Molten FIBA / 3x3 Series
                </Link>
              </li>
              <li>
                <Link href="/shop/collection/mikasa" className="hover:text-white transition-colors">
                  Mikasa FIFA Pro Series
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Institutional &amp; Help
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/#bulk" className="hover:text-white transition-colors">
                  Bulk &amp; School Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Authenticity Guarantee
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition-colors">
                  Ball Pressure &amp; Fit Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Quotes
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors">
                  Delivery &amp; Collection Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.displayPhone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.operatingHours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} POZOZO SPORTS. All rights reserved. Authorised Stock.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms-of-service" className="hover:text-white">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/return-and-refund-policy" className="hover:text-white">
              Guarantee
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
