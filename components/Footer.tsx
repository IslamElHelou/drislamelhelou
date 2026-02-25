import type { Locale } from '@/lib/i18n'
import { clinic } from '@/lib/i18n'

export function Footer({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar'

  return (
    <footer className="footerElite" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container footerEliteInner">
        <div className="footerEliteTop">
          <div className="footerEliteBrand">
            <div className="footerEliteName">Dr. Islam ElHelou</div>
            <div className="footerEliteTagline">
              {isAr
                ? 'ممارسة جلدية منظّمة في الإسكندرية — دقة طبية مع اهتمام إنساني.'
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
              </div>
            </div>
          </div>
        </div>

        <div className="footerEliteBottom">
          <div>
            © {new Date().getFullYear()} {clinic.brandName}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div>{isAr ? 'تصميم هادئ — تجربة سريعة.' : 'Quiet design — fast experience.'}</div>
        </div>
      </div>
    </footer>
  )
}
