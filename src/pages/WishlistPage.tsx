import { useTranslation } from "react-i18next";
import { EmptyState } from "@/components/ui";
import { StarIcon } from "@/assets/icons";

export default function WishlistPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {t("wishlist.title")}
      </h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <EmptyState
          icon={<StarIcon className="h-12 w-12" />}
          title={t("wishlist.empty.title")}
          description={t("wishlist.empty.description")}
        />
      </div>
    </div>
  );
}
