// Central Contact & WhatsApp Configuration for CORE WEB STUDIO
// Single source of truth for contact information across the entire application.

export const STUDIO_EMAIL = 'hello@corewebstudio.in';
export const STUDIO_PHONE = '8956280721';
export const STUDIO_PHONE_RAW = '+918956280721';
export const WHATSAPP_NUMBER = '918956280721';
export const WHATSAPP_DISPLAY = '8956280721';
export const WHATSAPP_DEFAULT_MESSAGE = "Hi CORE WEB STUDIO! I'm interested in building a website for my business. I'd love to discuss it further.";

export const getWhatsAppUrl = (customMessage?: string): string => {
  const msg = encodeURIComponent(customMessage || WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
};
