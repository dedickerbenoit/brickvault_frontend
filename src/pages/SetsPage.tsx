import { useTranslation } from "react-i18next";
import { SetsList } from "@/components/sets";

export default function SetsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t("sets.title")}
      </h1>
      <SetsList />
    </div>
  );
}
