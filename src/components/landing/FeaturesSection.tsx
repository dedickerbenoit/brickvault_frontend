import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks";

export default function FeaturesSection() {
  const { t } = useTranslation();
  const [featuresRef, featuresVisible] = useScrollAnimation();

  const features = [
    { emoji: "📦", key: "collection", stagger: "stagger-1" },
    { emoji: "📈", key: "roi", stagger: "stagger-2" },
    { emoji: "🔔", key: "alerts", stagger: "stagger-3" },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 px-6">
      <div
        ref={featuresRef as React.RefObject<HTMLDivElement>}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          featuresVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          {t("landing.features.title")}
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          {t("landing.features.description")}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ emoji, key, stagger }) => (
            <div
              key={key}
              className={`animate-on-scroll ${
                featuresVisible ? `visible animate-fade-up ${stagger}` : ""
              } bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all`}
            >
              <div className="text-5xl mb-4">{emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t(`landing.features.${key}.title`)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(`landing.features.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
