import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t("layout.footer.about")}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t("layout.footer.aboutDescription")}
            </p>
          </div>

          {/* Legal Links - non-cliquables */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t("layout.footer.legal")}
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-600 text-sm">
                  {t("layout.footer.privacyPolicy")}
                </span>
              </li>
              <li>
                <span className="text-gray-600 text-sm">
                  {t("layout.footer.terms")}
                </span>
              </li>
              <li>
                <span className="text-gray-600 text-sm">
                  {t("layout.footer.legalNotice")}
                </span>
              </li>
            </ul>
          </div>

          {/* Resources - liens externes fonctionnels */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t("layout.footer.resources")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://rebrickable.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  Rebrickable API
                </a>
              </li>
              <li>
                <a
                  href="https://www.lego.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-500 text-sm transition-colors"
                >
                  LEGO.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm text-center">
            {t("layout.footer.copyright", { year: currentYear })}
            <span className="mx-2">&bull;</span>
            {t("layout.footer.trademark")}
          </p>
        </div>
      </div>
    </footer>
  );
}
