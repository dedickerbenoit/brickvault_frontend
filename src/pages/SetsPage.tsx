import { useTranslation } from "react-i18next";
import { EmptyState } from "@/components/ui";
import { CubeIcon } from "@/assets/icons";

export default function SetsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {t("sets.title")}
      </h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <EmptyState
          icon={<CubeIcon className="h-12 w-12" />}
          title={t("sets.empty.title")}
          description={t("sets.empty.description")}
        />
      </div>
    </div>
  );
}
