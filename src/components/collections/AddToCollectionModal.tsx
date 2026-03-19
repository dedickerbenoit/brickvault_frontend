import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useCollections,
  useAddSetToCollection,
  useRemoveSetFromCollection,
} from "@/hooks";
import { Button, Modal } from "@/components/ui";
import { CheckIcon, FolderIcon } from "@/assets/icons";
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
  const { data: collections, isLoading } = useCollections(userSet.id);
  const addMutation = useAddSetToCollection();
  const removeMutation = useRemoveSetFromCollection();

  const [localState, setLocalState] = useState<Map<number, boolean>>(new Map());
  const [mutatingId, setMutatingId] = useState<number | null>(null);

  function isInCollection(collectionId: number): boolean {
    if (localState.has(collectionId)) {
      return localState.get(collectionId)!;
    }
    const collection = collections?.find((c) => c.id === collectionId);
    return collection?.contains_user_set ?? false;
  }

  function handleToggle(collectionId: number) {
    const currentlyIn = isInCollection(collectionId);
    setMutatingId(collectionId);

    if (currentlyIn) {
      removeMutation.mutate(
        { collectionId, userSetId: userSet.id },
        {
          onSuccess: () => {
            setLocalState((prev) => new Map(prev).set(collectionId, false));
          },
          onSettled: () => setMutatingId(null),
        },
      );
    } else {
      addMutation.mutate(
        { collectionId, userSetId: userSet.id },
        {
          onSuccess: () => {
            setLocalState((prev) => new Map(prev).set(collectionId, true));
          },
          onSettled: () => setMutatingId(null),
        },
      );
    }
  }

  return (
    <Modal onClose={onClose} ariaLabelledBy="add-to-collection-title" size="sm">
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

      <div className="flex-1 overflow-y-auto p-4 max-h-[60vh]">
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
              const inCollection = isInCollection(collection.id);
              const isMutating = mutatingId === collection.id;

              return (
                <li key={collection.id}>
                  <button
                    type="button"
                    onClick={() => handleToggle(collection.id)}
                    disabled={isMutating}
                    aria-pressed={inCollection}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      inCollection
                        ? "bg-green-50"
                        : "hover:bg-gray-50"
                    } ${isMutating ? "opacity-60" : "cursor-pointer"}`}
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
                    {isMutating ? (
                      <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full flex-shrink-0" />
                    ) : inCollection ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600 flex-shrink-0">
                        <CheckIcon className="w-4 h-4" />
                        {t("collections.addToCollection.added")}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="px-6 py-3 border-t border-gray-200">
        <Button variant="outlined" fullWidth onClick={onClose}>
          {t("common.close")}
        </Button>
      </div>
    </Modal>
  );
}
