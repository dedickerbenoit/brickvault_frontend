import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks";
import { Button } from "@/components/ui";
import { MockBarChart, MockLineChart } from "@/components/landing";
import { ROUTES, APP_NAME } from "@/constants";

export default function LandingPage() {
  const { t } = useTranslation();

  const [heroRef, heroVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [insightsRef, insightsVisible] = useScrollAnimation();
  const [useCasesRef, useCasesVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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

      {/* Features Section */}
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
            <div
              className={`animate-on-scroll ${
                featuresVisible ? "visible animate-fade-up stagger-1" : ""
              } bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all`}
            >
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("landing.features.collection.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("landing.features.collection.description")}
              </p>
            </div>

            <div
              className={`animate-on-scroll ${
                featuresVisible ? "visible animate-fade-up stagger-2" : ""
              } bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all`}
            >
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("landing.features.roi.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("landing.features.roi.description")}
              </p>
            </div>

            <div
              className={`animate-on-scroll ${
                featuresVisible ? "visible animate-fade-up stagger-3" : ""
              } bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all`}
            >
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("landing.features.alerts.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("landing.features.alerts.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
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
                {[
                  t("landing.insights.benefits.realTimeValue"),
                  t("landing.insights.benefits.roiAnalysis"),
                  t("landing.insights.benefits.trends"),
                  t("landing.insights.benefits.stats"),
                ].map((benefit, index) => (
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

      {/* Use Cases Section */}
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
            <div
              className={`animate-on-scroll ${
                useCasesVisible ? "visible animate-scale-in stagger-1" : ""
              } text-center p-6`}
            >
              <div className="text-6xl mb-4">🧑‍🎨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t("landing.useCases.collectors.title")}
              </h3>
              <p className="text-gray-600">
                {t("landing.useCases.collectors.description")}
              </p>
            </div>

            <div
              className={`animate-on-scroll ${
                useCasesVisible ? "visible animate-scale-in stagger-2" : ""
              } text-center p-6`}
            >
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t("landing.useCases.investors.title")}
              </h3>
              <p className="text-gray-600">
                {t("landing.useCases.investors.description")}
              </p>
            </div>

            <div
              className={`animate-on-scroll ${
                useCasesVisible ? "visible animate-scale-in stagger-3" : ""
              } text-center p-6`}
            >
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t("landing.useCases.resellers.title")}
              </h3>
              <p className="text-gray-600">
                {t("landing.useCases.resellers.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
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

      {/* Footer inline dark */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 text-white font-bold text-xl mb-4">
                <img src="/logobrickvault.png" alt={APP_NAME} className="w-10 h-10" />
                <span>{APP_NAME}</span>
              </div>
              <p className="text-sm">
                {t("landing.footer.description")}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">
                {t("landing.footer.product")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    {t("landing.footer.features")}
                  </a>
                </li>
                <li>
                  <Link
                    to={ROUTES.REGISTER}
                    className="hover:text-white transition-colors"
                  >
                    {t("landing.footer.createAccount")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">
                {t("landing.footer.legal")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span>{t("landing.footer.privacy")}</span>
                </li>
                <li>
                  <span>{t("landing.footer.terms")}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">
                {t("landing.footer.support")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span>{t("landing.footer.contact")}</span>
                </li>
                <li>
                  <span>{t("landing.footer.faq")}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>{t("landing.footer.copyright", { year: new Date().getFullYear() })}</p>
            <p className="mt-2 text-xs">
              {t("landing.footer.trademark")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
