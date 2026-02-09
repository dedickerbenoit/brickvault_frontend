import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks";
import { Button } from "@/components/ui";
import { MockBarChart } from "@/components/landing";
import { ROUTES } from "@/constants";

export default function HeroSection() {
  const { t } = useTranslation();
  const [heroRef, heroVisible] = useScrollAnimation();

  return (
    <section
      ref={heroRef as React.RefObject<HTMLElement>}
      className="min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-16"
    >
      <div
        className={`max-w-5xl mx-auto text-center transition-all duration-700 ${
          heroVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
          {t("landing.hero.title")}{" "}
          <span className="text-primary">
            {t("landing.hero.titleHighlight")}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          {t("landing.hero.description")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link to={ROUTES.REGISTER}>
            <Button
              variant="filled"
              size="lg"
              className="w-full sm:w-auto transition-transform hover:scale-105"
            >
              {t("landing.hero.cta")}
            </Button>
          </Link>
          <a href="#features">
            <Button
              variant="outlined"
              size="lg"
              className="w-full sm:w-auto bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              {t("landing.hero.learnMore")}
            </Button>
          </a>
        </div>
      </div>

      {/* Hero Mockup */}
      <div
        className={`w-full max-w-6xl mx-auto transition-all duration-1000 delay-300 ${
          heroVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
          <div className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t("landing.dashboard.title")}
              </h3>
              <p className="text-gray-600">
                {t("landing.dashboard.description")}
              </p>
            </div>
            <MockBarChart />
          </div>
        </div>
      </div>
    </section>
  );
}
