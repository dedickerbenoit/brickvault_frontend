import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCollections, useAddSetToCollection } from "@/hooks";
import { Button } from "@/components/ui";
import { FolderIcon } from "@/assets/icons";
import { getColorClasses } from "@/constants";
import type { UserSetData } from "@/services";

interface AddToCollectionModalProps {
  userSet: UserSetData;
  onClose: () => void;
  onCreateCollection: () => void;
}

export default function AddToCollectionModal({
  userSet,
  onClose,
  onCreateCollection,
}: AddToCollectionModalProps) {
  const { t } = useTranslation();
  const { data: collections, isLoading } = useCollections();
  const addMutation = useAddSetToCollection();
  const [addedTo, setAddedTo] = useState<Set<number>>(new Set());

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleAdd(collectionId: number) {
    addMutation.mutate(
      { collectionId, userSetId: userSet.id },
      {
        onSuccess: () => {
          setAddedTo((prev) => new Set(prev).add(collectionId));
        },
      },
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-to-collection-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2
            id="add-to-collection-title"
            className="text-lg font-semibold text-gray-900"
          >
            {t("collections.addToCollection.title")}
          </h2>
          <p className="text-sm text-gray-500 mt-1 truncate">
            {userSet.set.name}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full" />
            </div>
          ) : !collections || collections.length === 0 ? (
            <div className="text-center py-8">
              <FolderIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-4">
                {t("collections.addToCollection.noCollections")}
              </p>
              <Button
                variant="filled"
                size="sm"
                onClick={() => {
                  onClose();
                  onCreateCollection();
                }}
              >
                {t("collections.addToCollection.createFirst")}
              </Button>
            </div>
          ) : (
            <ul className="space-y-2">
              {collections.map((collection) => {
                const colors = getColorClasses(collection.color);
                const isAdded = addedTo.has(collection.id);
                return (
                  <li key={collection.id}>
                    <button
                      type="button"
                      onClick={() => !isAdded && handleAdd(collection.id)}
                      disabled={isAdded || addMutation.isPending}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        isAdded
                          ? "bg-green-50 cursor-default"
                          : "hover:bg-gray-50 cursor-pointer"
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${colors.dot}`}
                      />
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium text-gray-900 truncate">
                          {collection.name}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {collection.sets_count}{" "}
                          {t("collections.detail.setsCount")}
                        </span>
                      </span>
                      {isAdded && (
                        <span className="text-xs font-medium text-green-600">
                          {t("collections.addToCollection.added")}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="px-6 py-3 border-t border-gray-200">
          <Button variant="outlined" fullWidth onClick={onClose}>
            {t("common.cancel")}
          </Button>
        </div>
      </div>
    </div>
  );
}
