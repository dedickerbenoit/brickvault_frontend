import { useTranslation } from "react-i18next";
import { useAuth, useDashboardStats } from "@/hooks";
import { StatCard, EmptyState } from "@/components/ui";
import { ROUTES } from "@/constants";
import { CubeIcon, CurrencyEuroIcon, FolderIcon, StarIcon } from "@/assets/icons";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: stats, isLoading } = useDashboardStats();

  const setsCount = stats?.sets_count ?? 0;
  const totalValue = stats?.total_value ?? "0.00";
  const collectionsCount = stats?.collections_count ?? 0;
  const wishlistCount = stats?.wishlist_count ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("dashboard.welcome", { name: user?.first_name })}
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title={t("dashboard.stats.sets")}
          value={setsCount}
          icon={<CubeIcon className="h-6 w-6" />}
          isLoading={isLoading}
          link={ROUTES.SETS}
        />
        <StatCard
          title={t("dashboard.stats.totalValue")}
          value={`${totalValue} €`}
          icon={<CurrencyEuroIcon className="h-6 w-6" />}
          isLoading={isLoading}
        />
        <StatCard
          title={t("dashboard.stats.collections")}
          value={collectionsCount}
          icon={<FolderIcon className="h-6 w-6" />}
          isLoading={isLoading}
          link={ROUTES.COLLECTIONS}
        />
        <StatCard
          title={t("dashboard.stats.wishlist")}
          value={wishlistCount}
          icon={<StarIcon className="h-6 w-6" />}
          isLoading={isLoading}
          link={ROUTES.WISHLIST}
        />
      </div>

      {/* Empty State - visible only when user has no sets */}
      {!isLoading && setsCount === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <EmptyState
            icon={<CubeIcon className="h-12 w-12" />}
            title={t("dashboard.empty.title")}
            description={t("dashboard.empty.description")}
            action={{
              label: t("dashboard.empty.cta"),
              onClick: () => {},
            }}
          />
        </div>
      )}
    </div>
  );
}
