'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, MapPin, Phone, Send, CheckCircle2, ChevronDown, Clock } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { STORE_CONFIG, getWhatsAppUrl, getMailtoUrl } from '@/data/sportsConfig';

export function ContactPageClient() {
  const [form, setForm] = useState({ name: '', phoneOrEmail: '', organisation: '', message: '' });
  const { showToast } = useToast();

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      showToast('Please provide your name and message', 'error');
      return;
    }
    const text = `Hello Pozozo Sports, enquiry from website:\n\nName: ${form.name}\nOrganisation: ${
      form.organisation || 'Individual'
    }\nContact: ${form.phoneOrEmail}\nMessage: ${form.message}`;
    const url = getWhatsAppUrl(text);
    window.open(url, '_blank');
  };

  const handleEmailSend = () => {
    const subject = `Equipment Enquiry — ${form.name || 'Website Customer'}`;
    const body = `Name: ${form.name}\nOrganisation: ${form.organisation}\nContact: ${form.phoneOrEmail}\n\nMessage:\n${form.message}`;
    window.location.href = getMailtoUrl(subject, body);
  };

  const faqs = [
    {
      q: 'How do I place an order?',
      a: 'Browse our catalogue, click "Add to List" or tap the WhatsApp button next to any ball. Send us your list and we reply with price, confirmed stock, and delivery time on the same day.',
    },
    {
      q: 'Are your balls genuine?',
      a: 'Yes, 100%. We only stock genuine Molten and Mikasa balls with original manufacturer holograms, serial batch stamps, and official FIBA / FIFA certification stamps.',
    },
    {
      q: 'Do you offer bulk discounts for schools and clubs?',
      a: 'Yes. We offer special tiered pricing and official pro-forma invoices for schools, sports clubs, academies, and NGOs ordering 10 or more balls.',
    },
    {
      q: 'Where do you deliver?',
      a: 'We deliver nationwide across Harare, Bulawayo, and all provincial centres via secure courier. Collection points are also available.',
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const directWaUrl = getWhatsAppUrl('Hello Pozozo Sports, I have an enquiry.');

  return (
    <div className="bg-[#F3F5F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6B54] mb-2 block">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl sm:text-5xl font-display uppercase text-[#13251C] tracking-tight mb-4">
            Message Our Sales Desk
          </h1>
          <p className="text-sm sm:text-base text-[#3C4536]">
            Have a question about ball models, school pro-formas, or delivery schedules? Send a message on WhatsApp for the fastest reply.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-sm border border-[#D8DED2]">
            <h2 className="text-2xl font-display uppercase text-[#13251C] mb-6">Send an Inquiry</h2>

            <form onSubmit={handleWhatsAppSend} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B54]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Coach Mwila"
                    className="w-full px-4 py-3 bg-white border border-[#D8DED2] rounded-sm text-xs font-semibold text-[#13251C] outline-none focus:border-[#13251C]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B54]">
                    Phone or Email
                  </label>
                  <input
                    type="text"
                    value={form.phoneOrEmail}
                    onChange={(e) => setForm({ ...form, phoneOrEmail: e.target.value })}
                    placeholder="e.g. 0977 123 456"
                    className="w-full px-4 py-3 bg-white border border-[#D8DED2] rounded-sm text-xs font-semibold text-[#13251C] outline-none focus:border-[#13251C]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B54]">
                  School / Club / Organization
                </label>
                <input
                  type="text"
                  value={form.organisation}
                  onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                  placeholder="e.g. Harare Youth Academy"
                  className="w-full px-4 py-3 bg-white border border-[#D8DED2] rounded-sm text-xs font-semibold text-[#13251C] outline-none focus:border-[#13251C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B54]">
                  Equipment Inquiry / Questions *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What balls are you interested in, and do you need delivery?"
                  className="w-full p-3 bg-white border border-[#D8DED2] rounded-sm text-xs font-semibold text-[#13251C] outline-none focus:border-[#13251C] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  className="py-4 bg-[#F2900E] hover:bg-[#13251C] active:scale-[0.99] text-[#13251C] hover:text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleEmailSend}
                  className="py-4 bg-white hover:bg-[#13251C] border border-[#13251C] text-[#13251C] hover:text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email</span>
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details & FAQs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-white rounded-sm border border-[#D8DED2] space-y-6">
              <h3 className="text-xl font-display uppercase text-[#13251C]">Direct Contacts</h3>
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#1678A0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#13251C] block text-sm">WhatsApp Sales Desk</strong>
                    <a
                      href={directWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5B6B54] hover:text-[#13251C] hover:underline font-semibold"
                    >
                      {STORE_CONFIG.displayPhone} (Fastest response)
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#13251C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#13251C] block text-sm">Email Inquiries &amp; Pro-Formas</strong>
                    <a href={`mailto:${STORE_CONFIG.email}`} className="text-[#5B6B54] hover:text-[#13251C] hover:underline font-semibold">
                      {STORE_CONFIG.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#13251C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#13251C] block text-sm">Working Hours</strong>
                    <span className="text-[#5B6B54]">{STORE_CONFIG.operatingHours}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#13251C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#13251C] block text-sm">Distribution Centre</strong>
                    <span className="text-[#5B6B54]">{STORE_CONFIG.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              <h3 className="text-lg font-display uppercase text-[#13251C]">Frequently Asked Questions</h3>
              {faqs.map((faq, i) => (
                <div key={i} className="border border-[#D8DED2] rounded-sm overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 text-left text-xs font-bold text-[#13251C] flex items-center justify-between"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#5B6B54] transition-transform ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-xs text-[#3C4536] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/faq" className="text-xs font-bold text-[#1678A0] hover:text-[#13251C] hover:underline">
                See all FAQs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
