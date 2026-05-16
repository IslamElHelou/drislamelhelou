import type { Locale } from '@/lib/i18n'
import { clinic, getGoogleMapsDirectionsUrl, getWhatsAppBookingHref } from '@/lib/i18n'

export function MobileStickyBar({ locale }: { locale: Locale }) {
  const directionsHref = getGoogleMapsDirectionsUrl(locale)
  const whatsappHref = getWhatsAppBookingHref(locale, locale === 'ar' ? 'العلاج' : 'Treatment')

  return (
    <div className="mobileStickyBar" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <a className="mobileStickyBtn mobileStickyBtnGold" href={whatsappHref} target="_blank" rel="noreferrer">
        {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
      </a>
      <a className="mobileStickyBtn" href={`tel:${clinic.phoneE164}`}>
        {locale === 'ar' ? 'اتصال' : 'Call'}
      </a>
      <a className="mobileStickyBtn" href={directionsHref} target="_blank" rel="noreferrer">
        {locale === 'ar' ? 'الاتجاهات' : 'Directions'}
      </a>
    </div>
  )
}
