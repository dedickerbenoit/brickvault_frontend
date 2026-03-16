import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserSets, useDeleteUserSet } from "@/hooks";
import { Button, EmptyState } from "@/components/ui";
import { CubeIcon } from "@/assets/icons";
import { ROUTES } from "@/constants";
import type { UserSetData } from "@/services";
import SetRow from "./SetRow";
import SetForm from "./SetForm";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { AddToCollectionModal } from "@/components/collections";

export default function SetsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useUserSets(page);
  const deleteMutation = useDeleteUserSet();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSet, setEditingSet] = useState<UserSetData | null>(null);
  const [deletingSet, setDeletingSet] = useState<UserSetData | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [addingToCollection, setAddingToCollection] = useState<UserSetData | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16" role="status">
        <div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full" />
        <span className="sr-only">{t("sets.search.loading")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {t("sets.errors.loadingFailed")}
      </div>
    );
  }

  const sets = data?.data ?? [];
  const meta = data?.meta;

  if (sets.length === 0 && page === 1) {
    return (
      <>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <EmptyState
            icon={<CubeIcon className="h-12 w-12" />}
            title={t("sets.empty.title")}
            description={t("sets.empty.description")}
            action={{
              label: t("sets.empty.cta"),
              onClick: () => setShowAddForm(true),
            }}
          />
        </div>
        {showAddForm && (
          <SetForm
            onClose={() => setShowAddForm(false)}
            onSuccess={() => {
              setShowAddForm(false);
              setPage(1);
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="filled" onClick={() => setShowAddForm(true)}>
          {t("sets.add.button")}
        </Button>
      </div>

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
                  {t("sets.list.tableHeader.condition")}
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 hidden sm:table-cell">
                  {t("sets.list.tableHeader.purchasePrice")}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 hidden lg:table-cell">
                  {t("sets.list.tableHeader.purchaseDate")}
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  {t("sets.list.tableHeader.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sets.map((userSet) => (
                <SetRow
                  key={userSet.id}
                  userSet={userSet}
                  onEdit={() => setEditingSet(userSet)}
                  onDelete={() => setDeletingSet(userSet)}
                  onAddToCollection={() => setAddingToCollection(userSet)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {meta && meta.last_page > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
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
      </div>

      {showAddForm && (
        <SetForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            setPage(1);
          }}
        />
      )}

      {editingSet && (
        <SetForm
          userSet={editingSet}
          onClose={() => setEditingSet(null)}
          onSuccess={() => setEditingSet(null)}
        />
      )}

      {deletingSet && (
        <DeleteConfirmDialog
          setName={deletingSet.set.name}
          loading={deleteMutation.isPending}
          error={deleteError}
          onConfirm={() => {
            setDeleteError("");
            deleteMutation.mutate(deletingSet.id, {
              onSuccess: () => {
                setDeletingSet(null);
                setDeleteError("");
              },
              onError: () => setDeleteError(t("sets.errors.deleteFailed")),
            });
          }}
          onCancel={() => {
            setDeletingSet(null);
            setDeleteError("");
          }}
        />
      )}

      {addingToCollection && (
        <AddToCollectionModal
          userSet={addingToCollection}
          onClose={() => setAddingToCollection(null)}
          onCreateCollection={() => {
            setAddingToCollection(null);
            navigate(ROUTES.COLLECTIONS);
          }}
        />
      )}
    </>
  );
}
