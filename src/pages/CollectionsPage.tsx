import { useTranslation } from "react-i18next";
import { EmptyState } from "@/components/ui";
import { FolderIcon } from "@/assets/icons";

export default function CollectionsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {t("collections.title")}
      </h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <EmptyState
          icon={<FolderIcon className="h-12 w-12" />}
          title={t("collections.empty.title")}
          description={t("collections.empty.description")}
        />
      </div>
    </div>
  );
}
