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
  brandNameAr: 'د. إسلام الحلو',
  doctorName: 'Islam El-Helou',
  doctorNameAr: 'إسلام الحلو',
  titleEn: 'Consultant Dermatology & Aesthetic Medicine',
  titleAr: 'استشاري الأمراض الجلدية وطب التجميل',
  phoneE164: '+201016006000',
  whatsappE164: '+201016006000',
  addressEn: '375 El Geish Road, Gleem, Alexandria, Egypt (In front of Gleem Bay)',
  addressAr: '٣٧٥ طريق الجيش، جليم، الإسكندرية، مصر (أمام جليم باي)',
  // Exact clinic place from the provided Google Maps share link
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.252392681939!2d29.957767338497522!3d31.241435660979633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x242445b16a31152b%3A0x13096e424c20071e!2z2LnZitin2K_YqSDYr9mD2KrZiNixLyDYpdiz2YTYp9mFINin2YTYrdmE2Ygg2KfYs9iq2LTYp9ix2Yog2KfZhNin2YXYsdin2LYg2KfZhNis2YTYr9mK2Ycg2Ygg2KfZhNiq2YbYp9iz2YTZitmHINmIINin2YTYqtis2YXZitmE!5e0!3m2!1sen!2seg!4v1772068803705!5m2!1sen!2seg',
  mapEmbedSrcAr:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.252392681939!2d29.957767338497522!3d31.241435660979633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x242445b16a31152b%3A0x13096e424c20071e!2z2LnZitin2K_YqSDYr9mD2KrZiNixLyDYpdiz2YTYp9mFINin2YTYrdmE2Ygg2KfYs9iq2LTYp9ix2Yog2KfZhNin2YXYsdin2LYg2KfZhNis2YTYr9mK2Ycg2Ygg2KfZhNiq2YbYp9iz2YTZitmHINmIINin2YTYqtis2YXZitmE!5e0!3m2!1sen!2seg!4v1772068803705!5m2!1sen!2seg',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=31.2414311,29.9603369&destination_place_id=ChIJKxUxarFFJCIRHgcgTEJuCRM',
  googleMapsDirectionsUrlAr:
    'https://www.google.com/maps/dir/?api=1&destination=31.2414311,29.9603369&destination_place_id=ChIJKxUxarFFJCIRHgcgTEJuCRM&hl=ar',
  // Public Google search (reviews link) – safe default if Place ID is unknown
  googleReviewsUrl: 'https://www.google.com/search?q=Dr+Islam+El-Helou+Gleem+Alexandria+reviews',
  facebookUrl: 'https://facebook.com/DrIslamElHelou',
  instagramUrl: 'https://instagram.com/Dr.islam_elhelou'
} as const

export function getClinicBrandName(locale: Locale) {
  return locale === 'ar' ? clinic.brandNameAr : clinic.brandName
}

export function getDoctorDisplayName(locale: Locale) {
  return locale === 'ar' ? clinic.doctorNameAr : clinic.doctorName
}

export function getMapEmbedSrc(locale: Locale) {
  return locale === 'ar' ? clinic.mapEmbedSrcAr : clinic.mapEmbedSrc
}

export function getGoogleMapsDirectionsUrl(locale: Locale) {
  return locale === 'ar' ? clinic.googleMapsDirectionsUrlAr : clinic.googleMapsDirectionsUrl
}
