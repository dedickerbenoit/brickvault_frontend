import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCollections, useDeleteCollection } from "@/hooks";
import { Button, EmptyState } from "@/components/ui";
import { FolderIcon } from "@/assets/icons";
import {
  CollectionCard,
  CollectionForm,
  CollectionDeleteDialog,
} from "@/components/collections";
import type { CollectionData } from "@/services/collectionService";

export default function CollectionsPage() {
  const { t } = useTranslation();
  const { data: collections, isLoading, error } = useCollections();
  const deleteMutation = useDeleteCollection();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCollection, setEditingCollection] =
    useState<CollectionData | null>(null);
  const [deletingCollection, setDeletingCollection] =
    useState<CollectionData | null>(null);
  const [deleteError, setDeleteError] = useState("");

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {t("collections.title")}
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
          {t("collections.title")}
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {t("collections.errors.loadingFailed")}
        </div>
      </div>
    );
  }

  const list = collections ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {t("collections.title")}
      </h1>

      {list.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <EmptyState
            icon={<FolderIcon className="h-12 w-12" />}
            title={t("collections.empty.title")}
            description={t("collections.empty.description")}
            action={{
              label: t("collections.empty.cta"),
              onClick: () => setShowCreateForm(true),
            }}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <Button
              variant="filled"
              onClick={() => setShowCreateForm(true)}
            >
              {t("collections.create")}
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                onEdit={() => setEditingCollection(collection)}
                onDelete={() => setDeletingCollection(collection)}
              />
            ))}
          </div>
        </>
      )}

      {showCreateForm && (
        <CollectionForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => setShowCreateForm(false)}
        />
      )}

      {editingCollection && (
        <CollectionForm
          collection={editingCollection}
          onClose={() => setEditingCollection(null)}
          onSuccess={() => setEditingCollection(null)}
        />
      )}

      {deletingCollection && (
        <CollectionDeleteDialog
          collectionName={deletingCollection.name}
          loading={deleteMutation.isPending}
          error={deleteError}
          onConfirm={() => {
            setDeleteError("");
            deleteMutation.mutate(deletingCollection.id, {
              onSuccess: () => {
                setDeletingCollection(null);
                setDeleteError("");
              },
              onError: () =>
                setDeleteError(t("collections.errors.deleteFailed")),
            });
          }}
          onCancel={() => {
            setDeletingCollection(null);
            setDeleteError("");
          }}
        />
      )}
    </div>
  );
}
