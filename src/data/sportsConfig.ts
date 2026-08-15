export const STORE_CONFIG = {
  name: 'POZOZO SPORTS',
  tagline: 'AUTHORISED MOLTEN & MIKASA STOCK',
  phone: '260977000000',
  displayPhone: '+260 977 000 000',
  email: 'sales@pozozosports.com',
  operatingHours: 'Monday – Saturday: 08:00 – 18:00',
  currencySymbol: 'K', // Zambian Kwacha / USD / flexible
  currencyCode: 'ZMW',
  location: 'Lusaka & Nationwide Distribution',
};

export function getWhatsAppUrl(text: string, phone: string = STORE_CONFIG.phone): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function getMailtoUrl(subject: string, body: string, email: string = STORE_CONFIG.email): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
