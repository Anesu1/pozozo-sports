import { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Message the Pozozo Sports sales desk on WhatsApp or email for ball models, school pro-formas, and delivery schedules.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
