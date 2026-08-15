'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Mail } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import confetti from 'canvas-confetti';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsSubscribed(true);
    showToast('Welcome to ECOM! Use promo code WELCOME30 for 30% off your first order.', 'success');
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {}
  };

  return (
    <section className="py-20 sm:py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive Access &amp; 30% Off</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Join Our Newsletter
        </h2>

        <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto mb-8 sm:mb-10">
          Be the first to discover new arrivals, exclusive discounts, and seasonal style inspiration delivered straight to your inbox.
        </p>

        {isSubscribed ? (
          <div className="max-w-md mx-auto p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-lg mb-1">
              <CheckCircle2 className="w-5 h-5" />
              <span>You are on the list!</span>
            </div>
            <p className="text-xs text-white/80">
              Use promo code <strong className="text-white bg-white/20 px-2 py-0.5 rounded font-mono">WELCOME30</strong> at checkout for 30% off.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-11 pr-4 py-3.5 bg-white/10 hover:bg-white/15 focus:bg-white/15 border border-white/20 focus:border-white rounded-xl text-sm text-white placeholder-white/50 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="py-3.5 px-6 bg-white hover:bg-[#F6F4F1] text-[#1A1A1A] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-md"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-white/50 mt-4">
          By signing up, you agree to our Privacy Policy and Terms of Service. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
