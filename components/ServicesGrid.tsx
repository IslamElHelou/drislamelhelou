"use client";

import {
  IconAcne,
  IconHair,
  IconPigmentation,
  IconScreening,
  IconPediatrics,
  IconAesthetic,
} from "@/components/icons/services";

type Locale = "en" | "ar";

const services = [
  {
    key: "acne",
    Icon: IconAcne,
    en: {
      title: "Acne & Chronic Skin Conditions",
      desc: "Structured assessment and long-term management for stable outcomes.",
    },
    ar: {
      title: "حب الشباب والأمراض الجلدية المزمنة",
      desc: "تقييم منظّم وخطة علاج طويلة المدى للوصول لنتائج مستقرة.",
    },
  },
  {
    key: "hair",
    Icon: IconHair,
    en: {
      title: "Hair & Scalp Disorders",
      desc: "Evidence-based evaluation to identify cause and guide treatment.",
    },
    ar: {
      title: "مشكلات الشعر وفروة الرأس",
      desc: "تقييم علمي لتحديد السبب ووضع خطة علاج مناسبة.",
    },
  },
  {
    key: "pigmentation",
    Icon: IconPigmentation,
    en: {
      title: "Pigmentation & Melasma",
      desc: "Diagnosis-driven plans tailored to skin type and lifestyle.",
    },
    ar: {
      title: "التصبغات والكلف",
      desc: "خطة علاج مبنية على التشخيص ومناسبة لنوع البشرة ونمط الحياة.",
    },
  },
  {
    key: "screening",
    Icon: IconScreening,
    en: {
      title: "Skin Cancer Screening",
      desc: "Focused evaluation for early detection and reassurance.",
    },
    ar: {
      title: "فحص الجلد للكشف المبكر عن السرطان",
      desc: "تقييم دقيق للكشف المبكر وطمأنة المريض.",
    },
  },
  {
    key: "peds",
    Icon: IconPediatrics,
    en: {
      title: "Dermatology for Children & Adults",
      desc: "Calm, structured care adapted to each age and condition.",
    },
    ar: {
      title: "أمراض الجلد للأطفال والبالغين",
      desc: "رعاية هادئة ومنظّمة تناسب العمر والحالة.",
    },
  },
  {
    key: "aesthetic",
    Icon: IconAesthetic,
    en: {
      title: "Refined Aesthetic Dermatology",
      desc: "Natural results within a medical framework — only when appropriate.",
    },
    ar: {
      title: "الجلدية التجميلية بشكل راقٍ",
      desc: "نتائج طبيعية ضمن إطار طبي — عند الحاجة فقط.",
    },
  },
] as const;

export function ServicesGrid({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="servicesGrid">
      {services.map(({ key, Icon, en, ar }) => {
        const c = isAr ? ar : en;
        return (
          <div key={key} className="serviceCard">
            <div className="serviceTop">
              <div className="serviceIcon">
                <Icon size={28} />
              </div>
              <div className="serviceText">
                <div className="serviceTitle">{c.title}</div>
                <div className="serviceDesc">{c.desc}</div>
                <div className="serviceLine" aria-hidden />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
