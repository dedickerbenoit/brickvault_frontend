import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { APP_NAME, ROUTES } from "@/constants";

export default function LandingFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 text-white font-bold text-xl mb-4">
              <img
                src="/logobrickvault.png"
                alt={APP_NAME}
                className="w-10 h-10"
              />
              <span>{APP_NAME}</span>
            </div>
            <p className="text-sm">{t("landing.footer.description")}</p>
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
          <p>
            {t("landing.footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="mt-2 text-xs">{t("landing.footer.trademark")}</p>
        </div>
      </div>
    </footer>
  );
}
