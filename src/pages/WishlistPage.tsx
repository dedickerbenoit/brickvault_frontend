import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWishlist, useDeleteWishlistItem, useUpdateWishlistItem } from "@/hooks";
import { Button, EmptyState } from "@/components/ui";
import { GridIcon, ListIcon, StarIcon } from "@/assets/icons";
import {
  WishlistCard,
  WishlistItemModal,
  WishlistDeleteDialog,
  WishlistRow,
  WishlistPurchaseModal,
} from "@/components/wishlist";
import type { WishlistItemData } from "@/services/wishlistService";

type ViewMode = "grid" | "list";

function getInitialViewMode(): ViewMode {
  const stored = localStorage.getItem("wishlist_view_mode");
  return stored === "list" ? "list" : "grid";
}

export default function WishlistPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useWishlist(page);
  const deleteMutation = useDeleteWishlistItem();
  const updateMutation = useUpdateWishlistItem();

  const [viewMode, setViewMode] = useState<ViewMode>(getInitialViewMode);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<WishlistItemData | null>(null);
  const [deletingItem, setDeletingItem] = useState<WishlistItemData | null>(null);
  const [purchasingItem, setPurchasingItem] = useState<WishlistItemData | null>(null);
  const [deleteError, setDeleteError] = useState("");

  function handleViewModeChange(mode: ViewMode) {
    setViewMode(mode);
    localStorage.setItem("wishlist_view_mode", mode);
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {t("wishlist.title")}
        </h1>
        <div className="flex justify-center py-16" role="status">
          <div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {t("wishlist.title")}
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {t("wishlist.errors.loadingFailed")}
        </div>
      </div>
    );
  }

  const items = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {t("wishlist.title")}
      </h1>

      {items.length === 0 && page === 1 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <EmptyState
            icon={<StarIcon className="h-12 w-12" />}
            title={t("wishlist.empty.title")}
            description={t("wishlist.empty.description")}
            action={{
              label: t("wishlist.empty.cta"),
              onClick: () => setShowAddModal(true),
            }}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => handleViewModeChange("grid")}
                title={t("wishlist.viewGrid")}
                className={`p-2 rounded-md transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <GridIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleViewModeChange("list")}
                title={t("wishlist.viewList")}
                className={`p-2 rounded-md transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
            <Button variant="filled" onClick={() => setShowAddModal(true)}>
              {t("wishlist.add")}
            </Button>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  onEdit={() => setEditingItem(item)}
                  onDelete={() => setDeletingItem(item)}
                  onMarkPurchased={() => setPurchasingItem(item)}
                  onPriorityChange={(priority) =>
                    updateMutation.mutate({ id: item.id, payload: { priority } })
                  }
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        {t("sets.list.tableHeader.set")}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">
                        {t("sets.list.tableHeader.theme")}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 hidden sm:table-cell">
                        {t("wishlist.form.priority")}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 hidden sm:table-cell">
                        {t("wishlist.form.targetPrice")}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                        {t("sets.list.tableHeader.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <WishlistRow
                        key={item.id}
                        item={item}
                        onEdit={() => setEditingItem(item)}
                        onDelete={() => setDeletingItem(item)}
                        onMarkPurchased={() => setPurchasingItem(item)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {meta && meta.last_page > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600">
                {t("sets.list.pagination.showing", {
                  from: (meta.current_page - 1) * meta.per_page + 1,
                  to: Math.min(meta.current_page * meta.per_page, meta.total),
                  total: meta.total,
                })}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outlined"
                  disabled={meta.current_page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  {t("sets.list.pagination.prev")}
                </Button>
                <Button
                  size="sm"
                  variant="outlined"
                  disabled={meta.current_page >= meta.last_page}
                  onClick={() => setPage((p) => p + 1)}
                >
                  {t("sets.list.pagination.next")}
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {showAddModal && (
        <WishlistItemModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            setPage(1);
          }}
        />
      )}

      {editingItem && (
        <WishlistItemModal
          wishlistItem={editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={() => setEditingItem(null)}
        />
      )}

      {deletingItem && (
        <WishlistDeleteDialog
          setName={deletingItem.set.name}
          loading={deleteMutation.isPending}
          error={deleteError}
          onConfirm={() => {
            setDeleteError("");
            deleteMutation.mutate(deletingItem.id, {
              onSuccess: () => {
                setDeletingItem(null);
                setDeleteError("");
              },
              onError: () => setDeleteError(t("wishlist.errors.deleteFailed")),
            });
          }}
          onCancel={() => {
            setDeletingItem(null);
            setDeleteError("");
          }}
        />
      )}

      {purchasingItem && (
        <WishlistPurchaseModal
          item={purchasingItem}
          onClose={() => setPurchasingItem(null)}
          onSuccess={() => setPurchasingItem(null)}
        />
      )}
    </div>
  );
}
