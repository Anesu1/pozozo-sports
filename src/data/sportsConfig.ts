export const STORE_CONFIG = {
  name: 'POZOZO SPORTS',
  tagline: 'AUTHORISED MOLTEN & MIKASA STOCK',
  phone: '263777351222',
  displayPhone: '+263 77 735 1222',
  email: 'pozozotrading@sp2clogistics.com',
  operatingHours: 'Monday – Saturday: 08:00 – 18:00',
  currencySymbol: '$',
  currencyCode: 'USD',
  location: 'Harare & Regional Distribution (Zimbabwe & SADC)',
};

export function getWhatsAppUrl(text: string, phone: string = STORE_CONFIG.phone): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function getMailtoUrl(subject: string, body: string, email: string = STORE_CONFIG.email): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
