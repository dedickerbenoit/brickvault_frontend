import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useCollection,
  useDeleteCollection,
  useRemoveSetFromCollection,
} from "@/hooks";
import { Button, EmptyState } from "@/components/ui";
import { CubeIcon, FolderIcon } from "@/assets/icons";
import {
  CollectionForm,
  CollectionDeleteDialog,
} from "@/components/collections";
import { getColorClasses, ROUTES } from "@/constants";
import type { CollectionData } from "@/services/collectionService";

export default function CollectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: collection, isLoading, error } = useCollection(Number(id));
  const deleteMutation = useDeleteCollection();
  const removeMutation = useRemoveSetFromCollection();

  const [editingCollection, setEditingCollection] =
    useState<CollectionData | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [removingSetId, setRemovingSetId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center py-16" role="status">
          <div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {t("collections.errors.loadingFailed")}
        </div>
      </div>
    );
  }

  const colors = getColorClasses(collection.color);
  const sets = collection.user_sets ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className={`rounded-2xl ${colors.bg} p-6 mb-6`}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Button
              variant="text"
              size="sm"
              onClick={() => navigate(ROUTES.COLLECTIONS)}
              className="mb-2 -ml-2"
            >
              &larr; {t("collections.detail.back")}
            </Button>
            <h1 className={`text-2xl font-bold ${colors.text}`}>
              {collection.name}
            </h1>
            {collection.description && (
              <p className="text-gray-600 mt-1">{collection.description}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {collection.sets_count} {t("collections.detail.setsCount")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => setEditingCollection(collection)}
            >
              {t("collections.edit")}
            </Button>
            <Button
              variant="text"
              size="sm"
              className="text-red-600 hover:bg-red-50"
              onClick={() => setShowDeleteDialog(true)}
            >
              {t("collections.delete")}
            </Button>
          </div>
        </div>
      </div>

      {/* Sets table */}
      {sets.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <EmptyState
            icon={<FolderIcon className="h-12 w-12" />}
            title={t("collections.detail.empty.title")}
            description={t("collections.detail.empty.description")}
          />
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
                    {t("sets.list.tableHeader.condition")}
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                    {t("sets.list.tableHeader.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sets.map((userSet) => {
                  const conditionColors: Record<string, string> = {
                    new: "bg-green-50 text-green-700",
                    opened: "bg-yellow-50 text-yellow-700",
                    built: "bg-blue-50 text-blue-700",
                  };
                  const conditionLabels: Record<string, string> = {
                    new: t("sets.form.conditionNew"),
                    opened: t("sets.form.conditionOpened"),
                    built: t("sets.form.conditionBuilt"),
                  };
                  return (
                    <tr
                      key={userSet.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {userSet.set.img_url ? (
                            <img
                              src={userSet.set.img_url}
                              alt={userSet.set.name}
                              className="w-12 h-12 object-contain rounded"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                              <CubeIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {userSet.set.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              #{userSet.set.set_num}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 hidden md:table-cell">
                        {userSet.set.theme?.name ?? "-"}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${conditionColors[userSet.condition]}`}
                        >
                          {conditionLabels[userSet.condition]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            variant="text"
                            className="text-red-600 hover:bg-red-50"
                            loading={removingSetId === userSet.id && removeMutation.isPending}
                            onClick={() => {
                              setRemovingSetId(userSet.id);
                              removeMutation.mutate(
                                {
                                  collectionId: collection.id,
                                  userSetId: userSet.id,
                                },
                                { onSettled: () => setRemovingSetId(null) },
                              );
                            }}
                          >
                            {t("collections.detail.removeSet")}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingCollection && (
        <CollectionForm
          collection={editingCollection}
          onClose={() => setEditingCollection(null)}
          onSuccess={() => setEditingCollection(null)}
        />
      )}

      {showDeleteDialog && (
        <CollectionDeleteDialog
          collectionName={collection.name}
          loading={deleteMutation.isPending}
          error={deleteError}
          onConfirm={() => {
            setDeleteError("");
            deleteMutation.mutate(collection.id, {
              onSuccess: () => navigate(ROUTES.COLLECTIONS),
              onError: () =>
                setDeleteError(t("collections.errors.deleteFailed")),
            });
          }}
          onCancel={() => {
            setShowDeleteDialog(false);
            setDeleteError("");
          }}
        />
      )}
    </div>
  );
}
