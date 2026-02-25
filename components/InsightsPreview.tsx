"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadSaved, type SavedInsight } from "@/lib/insights/saved";

type Locale = "en" | "ar";

type LastRun = {
  module: string;
  at: number;
};

const STORAGE_KEY = "drislam:insights:lastRun";

function formatDate(locale: Locale, ts: number) {
  try {
    return new Date(ts).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return new Date(ts).toDateString();
  }
}

export default function InsightsPreview({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const base = `/${locale}`;

  const items = useMemo(
    () => [
      {
        slug: "acne",
        title: isAr ? "إرشادات حب الشباب" : "Acne Insight",
        desc: isAr
          ? "فهم النمط وخطوات عملية قبل الاستشارة."
          : "Understand patterns and next steps before a consultation.",
      },
      {
        slug: "hair-loss",
        title: isAr ? "إرشادات تساقط الشعر" : "Hair Loss Insight",
        desc: isAr
          ? "أسئلة منظمة لتحديد الاتجاه الصحيح للتقييم."
          : "Structured questions to guide the right evaluation pathway.",
      },
      {
        slug: "pigmentation",
        title: isAr ? "إرشادات التصبغات" : "Pigmentation Insight",
        desc: isAr
          ? "تمييز الأنماط الشائعة ونقاط القرار المهمة."
          : "Clarify common patterns and key decision points.",
      },
      {
        slug: "when-to-consult",
        title: isAr ? "متى تحتاج طبيب جلدية" : "When to Consult",
        desc: isAr
          ? "إشارات تستدعي تقييمًا مبكرًا وطمأنة عند الحاجة."
          : "Red flags that need earlier review, and reassurance when appropriate.",
      },
    ],
    [isAr]
  );

  const [lastRun, setLastRun] = useState<LastRun | null>(null);
  const [saved, setSaved] = useState<SavedInsight[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as LastRun;
      if (parsed && typeof parsed.at === "number" && typeof parsed.module === "string") {
        setLastRun(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setSaved(loadSaved());
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <h2 className="sectionTitle" style={{ margin: 0 }}>
              {isAr ? "مركز الإرشادات التفاعلية" : "Dermatology Insight Center"}
            </h2>
            <div className="muted" style={{ marginTop: ".25rem" }}>
              {isAr
                ? "أدوات تعليمية منظمة — تساعدك على فهم الأنماط قبل الاستشارة."
                : "Structured educational tools — understand patterns before consultation."}
            </div>
            {lastRun ? (
              <div className="muted" style={{ marginTop: ".35rem" }}>
                {isAr ? "آخر استخدام:" : "Last used:"} {formatDate(locale, lastRun.at)}
              </div>
            ) : null}
          </div>

          <Link className="btn" href={`${base}/insights`}>
            {isAr ? "فتح المركز" : "Open Center"}
          </Link>
        </div>

        <div className="grid grid2" style={{ marginTop: ".9rem" }}>
          {items.map((it, i) => (
            <Link
              key={it.slug}
              href={`${base}/insights/${it.slug}`}
              className="card"
              style={{ textDecoration: "none" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <div style={{ fontWeight: 900 }}>{it.title}</div>
                <span className="badge">{isAr ? `خطوة ${i + 1}` : `Step ${i + 1}`}</span>
              </div>
              <p style={{ margin: ".55rem 0 0" }}>{it.desc}</p>
              <div className="link" style={{ marginTop: ".5rem" }}>
                {isAr ? "ابدأ الآن" : "Start"}
              </div>
            </Link>
          ))}
        </div>

        {saved.length ? (
          <div style={{ marginTop: "1.2rem" }}>
            <div className="journalKicker">{isAr ? "محفوظاتك" : "Saved summaries"}</div>
            <div className="goldLine" aria-hidden />
            <div className="journalList" style={{ marginTop: 12 }}>
              {saved.map((it) => (
                <Link
                  key={it.id}
                  href={`${base}/insights/${it.module}`}
                  className="journalItem"
                  style={{ textDecoration: "none" }}
                >
                  <div className="journalItemTop" style={{ alignItems: "baseline" }}>
                    <div className="journalItemTitle" style={{ maxWidth: "70%" }}>
                      {locale === "ar" ? it.summary.ar : it.summary.en}
                    </div>
                    <div className="journalItemMeta">{formatDate(locale, it.at)}</div>
                  </div>
                  <div className="journalRead" style={{ marginTop: 8 }}>
                    {isAr ? "فتح" : "Open"}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="muted" style={{ marginTop: ".85rem", fontSize: ".92rem" }}>
          {isAr
            ? "تنبيه: هذه الأدوات للتثقيف ولا تُعد تشخيصًا أو بديلًا عن الكشف الطبي."
            : "Note: These tools are educational and do not provide a diagnosis or replace clinical consultation."}
        </div>
      </div>
    </section>
  );
}
