export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function getDirection(locale: Locale) {
  return locale === 'ar' ? 'rtl' : 'ltr'
}

export function formatPhone(phoneE164: string) {
  // Display friendly: +20 10 1600 6000
  return phoneE164.replace(/\+?(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1 $2 $3 $4')
}

export const clinic = {
  brandName: 'Dr. Islam El-Helou',
  doctorName: 'Islam El-Helou',
  titleEn: 'Consultant Dermatology & Aesthetic Medicine',
  titleAr: 'استشاري الأمراض الجلدية وطب التجميل',
  phoneE164: '+201016006000',
  whatsappE164: '+201016006000',
  addressEn: '375 El Geish Road, Gleem, Alexandria, Egypt (In front of Gleem Bay)',
  addressAr: '٣٧٥ طريق الجيش، جليم، الإسكندرية، مصر (أمام جليم باي)',
  // Reliable embed (doesn't depend on a long pb token that may break when copied)
  mapEmbedSrc: 'https://www.google.com/maps?q=31.2032483,29.9098317&hl=en&z=16&output=embed',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=31.2032483,29.9098317',
  // Public Google search (reviews link) – safe default if Place ID is unknown
  googleReviewsUrl: 'https://www.google.com/search?q=Dr+Islam+El-Helou+Gleem+Alexandria+reviews',
  facebookUrl: 'https://facebook.com/DrIslamElHelou',
  instagramUrl: 'https://instagram.com/Dr.islam_elhelou'
} as const
