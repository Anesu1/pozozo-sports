'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Mail,
  Send,
  Sparkles,
  ClipboardCheck,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { STORE_CONFIG, getWhatsAppUrl, getMailtoUrl } from '@/data/sportsConfig';

export function CartDrawer() {
  const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart, clearCart, totalItems } = useCart();
  const { format } = useCurrency();

  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);

  const estimatedTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Generate WhatsApp formatted text
  const generateListText = () => {
    const lines = cart.map(
      (item) => `• ${item.quantity} × ${item.product.brand} ${item.product.name} (${item.product.spec})`
    );
    let text = `Hello Pozozo Sports, I'd like a quote for:\n\n${lines.join('\n')}`;
    if (note.trim()) {
      text += `\n\nNote: ${note.trim()}`;
    }
    text += `\n\nPlease confirm price, stock and delivery. Thank you.`;
    return text;
  };

  const handleSendWhatsApp = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });
    const waUrl = getWhatsAppUrl(generateListText());
    window.open(waUrl, '_blank');
  };

  const handleSendEmail = () => {
    const subject = `Ball Enquiry (${totalItems} items) — Pozozo Sports`;
    const mailUrl = getMailtoUrl(subject, generateListText());
    window.location.href = mailUrl;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateListText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full"
            >
              {/* Header */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[#E8E4DF] flex items-center justify-between bg-[#F6F4F1] shrink-0">
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-[#12100E] flex items-center gap-2">
                    <span>Enquiry &amp; Order List</span>
                    <span className="bg-[#12100E] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#757575] mt-0.5">
                    Direct quote on WhatsApp — same day reply.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-white text-[#757575] hover:text-[#12100E] transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-16 sm:py-20 text-center space-y-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#F6F4F1] text-[#757575] rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#12100E]">
                      Your enquiry list is empty
                    </h3>
                    <p className="text-xs text-[#757575] max-w-xs mx-auto">
                      Pick what your club, school or shop needs from our match and training stock.
                    </p>
                    <button
                      onClick={closeCart}
                      className="px-6 py-2.5 bg-[#12100E] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black transition-colors"
                    >
                      Browse Catalogue
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8E4DF]">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#757575]">
                        Selected Balls ({totalItems})
                      </span>
                      <button
                        onClick={clearCart}
                        className="text-[10px] sm:text-[11px] font-bold text-[#757575] hover:text-rose-600 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Clear All</span>
                      </button>
                    </div>

                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 sm:gap-4 p-3 sm:p-3.5 bg-[#F6F4F1] rounded-2xl border border-[#E8E4DF]"
                      >
                        {/* Ball thumbnail */}
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-[#E8E4DF] p-1">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-contain"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#8E857A]">
                                {item.product.brand}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-[#9E9E9E] hover:text-rose-600 p-0.5"
                                title="Remove"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <h4 className="text-xs font-bold text-[#12100E] truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] sm:text-[11px] text-[#757575] truncate">
                              {item.product.spec}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#E8E4DF]/60">
                            {/* Quantity Stepper */}
                            <div className="flex items-center bg-white border border-[#E8E4DF] rounded-lg p-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-[#757575] hover:text-[#12100E]"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-1.5 sm:px-2 text-xs font-bold text-[#12100E]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-[#757575] hover:text-[#12100E]"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-extrabold text-[#12100E]">
                              {format(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Order Note Field */}
                    <div className="pt-2 space-y-1">
                      <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#757575] block">
                        Delivery Town or Special Note (Optional):
                      </label>
                      <textarea
                        rows={2}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g. Delivering to Lusaka / Kitwe, school name, or need pro-forma invoice"
                        className="w-full p-2.5 bg-[#F6F4F1] border border-[#E8E4DF] rounded-xl text-xs text-[#12100E] outline-none focus:border-[#12100E] resize-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer Actions */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-[#E8E4DF] bg-[#F6F4F1] space-y-2.5 sm:space-y-3 shrink-0">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-[#757575]">Guide Quote Value:</span>
                    <span className="text-sm sm:text-base font-extrabold text-[#12100E]">
                      {format(estimatedTotal)}
                    </span>
                  </div>

                  {/* Primary WhatsApp Order Button */}
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Send Order on WhatsApp</span>
                  </button>

                  {/* Secondary Actions: Email & Copy */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleSendEmail}
                      className="py-2.5 px-2 bg-white hover:bg-[#ECE9E7] active:bg-[#ECE9E7] border border-[#E8E4DF] text-[#12100E] text-[11px] sm:text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send as Email</span>
                    </button>
                    <button
                      onClick={handleCopyText}
                      className="py-2.5 px-2 bg-white hover:bg-[#ECE9E7] active:bg-[#ECE9E7] border border-[#E8E4DF] text-[#12100E] text-[11px] sm:text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <ClipboardCheck className="w-3.5 h-3.5" />
                          <span>Copy List</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-[#757575]">
                    No card required. We confirm stock and dispatch details directly in chat.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
