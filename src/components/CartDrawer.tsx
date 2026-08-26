'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Mail,
  Sparkles,
  ClipboardCheck,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { getWhatsAppUrl, getMailtoUrl } from '@/data/sportsConfig';

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
            className="absolute inset-0 bg-[#13251C]/45 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#F3F5F0] shadow-2xl flex flex-col h-full"
            >
              {/* Header */}
              <div className="px-5 sm:px-6 py-5 flex items-center gap-4 bg-[#13251C] text-[#F3F5F0] shrink-0">
                <div>
                  <h2 className="text-base sm:text-[17px] font-display uppercase tracking-tight">
                    Your enquiry
                  </h2>
                  <p className="text-[12.5px] text-[#8B9782] mt-1">
                    {totalItems} item(s) · no payment taken
                  </p>
                </div>
                <div className="flex-1" />
                <button
                  onClick={closeCart}
                  className="w-9 h-9 rounded-sm border border-[#26362A] hover:border-[#F3F5F0] text-[#F3F5F0] flex items-center justify-center transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
                {cart.length === 0 ? (
                  <div className="py-16 sm:py-20 text-center space-y-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#E7EAE1] text-[#3C4536] rounded-sm flex items-center justify-center mx-auto">
                      <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#13251C]">
                      Nothing here yet
                    </h3>
                    <p className="text-xs text-[#3C4536] max-w-xs mx-auto leading-relaxed">
                      Add balls from the catalogue and send them all in one message.
                    </p>
                    <button
                      onClick={closeCart}
                      className="px-6 py-2.5 bg-[#13251C] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                    >
                      Browse Catalogue
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between pb-3 border-b border-[#D8DED2]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#3C4536]">
                        Selected Balls ({totalItems})
                      </span>
                      <button
                        onClick={clearCart}
                        className="text-[11px] font-bold text-[#3C4536] hover:text-[#13251C] flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All</span>
                      </button>
                    </div>

                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3.5 py-4 border-b border-[#D8DED2] items-center"
                      >
                        {/* Ball thumbnail */}
                        <div className="relative w-[62px] h-[62px] bg-white rounded-sm border border-[#D8DED2] shrink-0 p-1.5">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6B54]">
                              {item.product.brand}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#5B6B54] hover:text-[#13251C] p-0.5"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h4 className="text-[14.5px] font-bold text-[#13251C] leading-tight truncate">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Stepper */}
                            <div className="flex items-center border border-[#D8DED2] bg-white rounded-sm">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-[34px] flex items-center justify-center text-[#13251C]"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="min-w-[22px] text-center text-sm font-bold text-[#13251C]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-[34px] flex items-center justify-center text-[#13251C]"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-xs font-extrabold text-[#13251C]">
                              {format(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Order Note Field */}
                    <div className="pt-4 space-y-1.5">
                      <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#3C4536] block">
                        A note for us (optional)
                      </label>
                      <input
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Delivery town, deadline, school name…"
                        className="w-full h-11 px-4 bg-white border border-[#D8DED2] rounded-sm text-sm text-[#13251C] outline-none focus:border-[#13251C]"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer Actions */}
              {cart.length > 0 && (
                <div className="px-5 sm:px-6 py-5 border-t border-[#D8DED2] bg-white space-y-2.5 shrink-0">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-[#3C4536]">Guide Quote Value:</span>
                    <span className="text-sm sm:text-base font-extrabold text-[#13251C]">
                      {format(estimatedTotal)}
                    </span>
                  </div>

                  {/* Primary WhatsApp Order Button */}
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full h-[52px] bg-[#F2900E] hover:bg-[#13251C] active:scale-[0.99] text-[#13251C] hover:text-white text-sm font-bold rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send list on WhatsApp</span>
                  </button>

                  {/* Secondary Actions: Email & Copy */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleSendEmail}
                      className="h-11 border border-[#13251C] text-[#13251C] hover:bg-[#13251C] hover:text-white text-xs font-bold rounded-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send by email</span>
                    </button>
                    <button
                      onClick={handleCopyText}
                      className="h-11 border border-[#D8DED2] text-[#13251C] hover:bg-[#E7EAE1] text-xs font-bold rounded-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1E7A4E]" />
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

                  <p className="text-[11px] text-center text-[#5B6B54] pt-1">
                    Nothing sends until you tap — buttons open WhatsApp or your mail app with the message written.
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
