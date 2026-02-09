import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";

export default function CtaSection() {
  const { t } = useTranslation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-primary-600 to-primary-700 text-white text-center">
      <div
        ref={ctaRef as React.RefObject<HTMLDivElement>}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          ctaVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white">
          {t("landing.cta.title")}
        </h2>
        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          {t("landing.cta.description")}
        </p>
        <Link to={ROUTES.REGISTER}>
          <Button
            variant="elevated"
            size="lg"
            className="bg-white text-primary-700 hover:bg-gray-100 font-semibold px-8 py-4 text-lg transition-transform hover:scale-105 shadow-xl"
          >
            {t("landing.cta.button")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
