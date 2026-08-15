'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { REVIEWS } from '@/data/reviews';

export function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [autoplay]);

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-[#F6F4F1] border-y border-[#E8E4DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8E857A] mb-1 sm:mb-2 block">
              COACHES &amp; LEAGUES
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#12100E] font-display">
              Trusted on Match Day
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5E574E] max-w-md">
            See why athletic directors, coaches, and sports organizations rely on Pozozo Sports for genuine match equipment.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Slide Card */}
          <div className="relative min-h-[240px] sm:min-h-[220px] bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8E4DF] shadow-xl flex flex-col justify-between">
            <Quote className="absolute top-6 right-8 w-10 sm:w-14 h-10 sm:h-14 text-[#ECE9E7] stroke-[1] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                {/* Review Quote */}
                <blockquote className="text-base sm:text-xl lg:text-2xl font-medium text-[#12100E] leading-relaxed tracking-tight">
                  &ldquo;{REVIEWS[currentIndex].text}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-4 border-t border-[#E8E4DF]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#12100E] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {REVIEWS[currentIndex].author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#12100E]">
                        {REVIEWS[currentIndex].author}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-[#757575]">
                        {REVIEWS[currentIndex].location} • {REVIEWS[currentIndex].role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold self-start xs:self-auto">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verified Buyer</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 sm:mt-8 px-2">
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-6 sm:w-8 bg-[#12100E]' : 'w-2 bg-[#D5D0C8] hover:bg-[#AFA99F]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 sm:p-3 rounded-full bg-white hover:bg-[#12100E] hover:text-white text-[#12100E] border border-[#E8E4DF] shadow-xs transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 sm:p-3 rounded-full bg-white hover:bg-[#12100E] hover:text-white text-[#12100E] border border-[#E8E4DF] shadow-xs transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
