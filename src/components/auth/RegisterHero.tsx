import { useTranslation } from "react-i18next";
import { CheckIcon } from "@/assets/icons";

const BENEFITS = ["catalog", "roi", "free"] as const;

export default function RegisterHero() {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-700 p-12 flex-col justify-center items-center text-white">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-6">
          {t("auth.register.hero.title")}
        </h1>
        <p className="text-lg text-white/90 mb-8">
          {t("auth.register.hero.description")}
        </p>

        <div className="space-y-4">
          {BENEFITS.map((key) => (
            <div key={key} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <CheckIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  {t(`auth.register.hero.${key}`)}
                </h3>
                <p className="text-sm text-white/80">
                  {t(`auth.register.hero.${key}Description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
