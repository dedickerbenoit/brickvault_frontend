import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks";
import { MockLineChart } from "@/components/landing";

export default function InsightsSection() {
  const { t } = useTranslation();
  const [insightsRef, insightsVisible] = useScrollAnimation();

  const benefits = [
    t("landing.insights.benefits.realTimeValue"),
    t("landing.insights.benefits.roiAnalysis"),
    t("landing.insights.benefits.trends"),
    t("landing.insights.benefits.stats"),
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div
        ref={insightsRef as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-700 ${
              insightsVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("landing.insights.title")}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("landing.insights.description")}
            </p>
            <ul className="space-y-3 text-gray-700">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary text-xl font-bold">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`relative transition-all duration-700 ${
              insightsVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
              <MockLineChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
