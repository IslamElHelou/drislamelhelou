import type { Locale } from '@/lib/i18n'
import { clinic, getClinicBrandName, getGoogleMapsDirectionsUrl, getMapEmbedSrc, getWhatsAppBookingHref } from '@/lib/i18n'
import DeferredMapEmbed from '@/components/DeferredMapEmbed'

export function Footer({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar'
  const brandName = getClinicBrandName(locale)
  const directionsHref = getGoogleMapsDirectionsUrl(locale)
  const mapEmbedSrc = getMapEmbedSrc(locale)
  const bookingHref = getWhatsAppBookingHref(locale)

  return (
    <footer className="footerElite" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container footerEliteInner">
        <div className="footerEliteTop">
          <div className="footerEliteBrand">
            <div className="footerEliteName">{brandName}</div>
            <div className="footerEliteTagline">
              {isAr
                ? 'ممارسة جلدية منظمة في الإسكندرية — دقة طبية مع اهتمام إنساني.'
                : 'A structured dermatology practice in Alexandria — clinical precision with human warmth.'}
            </div>
            <div className="goldLine" aria-hidden />
          </div>

          <div className="footerEliteCols">
            <div>
              <div className="footerEliteLabel">{isAr ? 'العنوان' : 'Address'}</div>
              <div className="footerEliteText">
                375 El Geish Road, Gleem, Alexandria, Egypt
                <br />
                {isAr ? 'أمام جليم باي' : 'In front of Gleem Bay'}
              </div>
            </div>

            <div>
              <div className="footerEliteLabel">{isAr ? 'التواصل' : 'Contact'}</div>
              <div className="footerEliteText">
                <a className="footerEliteLink" href={`tel:${clinic.phoneE164}`}>
                  {clinic.phoneE164}
                </a>
                <br />
                <a
                  className="footerEliteLink"
                  href={`https://wa.me/${clinic.whatsappE164.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <br />
                <a className="footerEliteLink" href={bookingHref} target="_blank" rel="noreferrer">
                  {isAr ? 'رسالة حجز سريعة' : 'Quick booking message'}
                </a>
              </div>
            </div>

            <div>
              <div className="footerEliteLabel">{isAr ? 'مواعيد العيادة' : 'Clinic Hours'}</div>
              <div className="footerEliteText">{isAr ? clinic.hoursAr : clinic.hoursEn}</div>
            </div>

            <div>
              <div className="footerEliteLabel">{isAr ? 'الاتجاهات' : 'Directions'}</div>
              <div className="footerEliteText">
                <a className="footerEliteLink" href={directionsHref} target="_blank" rel="noreferrer">
                  {isAr ? 'افتح خرائط Google' : 'Open Google Maps'}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footerMapBlock">
          <div className="footerMapCopy">
            <div className="footerEliteLabel">{isAr ? 'موقع جليم باي' : 'Gleem Bay Location'}</div>
            <div className="footerEliteText">
              {isAr
                ? 'الوصول مباشر من طريق الجيش، مقابل جليم باي.'
                : 'Direct access from El Geish Road, opposite Gleem Bay.'}
            </div>
          </div>
          <DeferredMapEmbed
            title={isAr ? 'خريطة العيادة' : 'Clinic map'}
            src={mapEmbedSrc}
            loadLabel={isAr ? 'عرض الخريطة' : 'Load map'}
            className="mapWrap footerMap"
          />
        </div>

        <div className="footerEliteBottom">
          <div>
            © {new Date().getFullYear()} {brandName}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div>{isAr ? 'تصميم هادئ — تجربة سريعة.' : 'Quiet design — fast experience.'}</div>
        </div>
      </div>
    </footer>
  )
}
