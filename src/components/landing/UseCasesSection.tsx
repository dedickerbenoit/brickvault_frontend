import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks";

export default function UseCasesSection() {
  const { t } = useTranslation();
  const [useCasesRef, useCasesVisible] = useScrollAnimation();

  const useCases = [
    { emoji: "🧑‍🎨", key: "collectors", stagger: "stagger-1" },
    { emoji: "💼", key: "investors", stagger: "stagger-2" },
    { emoji: "🏪", key: "resellers", stagger: "stagger-3" },
  ];

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div
        ref={useCasesRef as React.RefObject<HTMLDivElement>}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          useCasesVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          {t("landing.useCases.title")}
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          {t("landing.useCases.description")}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map(({ emoji, key, stagger }) => (
            <div
              key={key}
              className={`animate-on-scroll ${
                useCasesVisible ? `visible animate-scale-in ${stagger}` : ""
              } text-center p-6`}
            >
              <div className="text-6xl mb-4">{emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t(`landing.useCases.${key}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`landing.useCases.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
