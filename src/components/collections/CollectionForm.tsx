import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateCollection, useUpdateCollection } from "@/hooks";
import { Button } from "@/components/ui";
import { COLLECTION_COLORS } from "@/constants";
import type { CollectionColor } from "@/constants";
import type { CollectionData } from "@/services/collectionService";

interface CollectionFormProps {
  collection?: CollectionData;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CollectionForm({
  collection,
  onClose,
  onSuccess,
}: CollectionFormProps) {
  const { t } = useTranslation();
  const createMutation = useCreateCollection();
  const updateMutation = useUpdateCollection();
  const isEdit = !!collection;

  const [name, setName] = useState(collection?.name ?? "");
  const [description, setDescription] = useState(
    collection?.description ?? "",
  );
  const [color, setColor] = useState<CollectionColor>(
    collection?.color ?? "blue",
  );
  const [error, setError] = useState("");

  const isLoading = createMutation.isPending || updateMutation.isPending;

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError(t("collections.errors.nameRequired"));
      return;
    }

    if (isEdit && collection) {
      updateMutation.mutate(
        {
          id: collection.id,
          payload: {
            name: name.trim(),
            description: description.trim() || null,
            color,
          },
        },
        {
          onSuccess,
          onError: () => setError(t("collections.errors.updateFailed")),
        },
      );
    } else {
      createMutation.mutate(
        {
          name: name.trim(),
          description: description.trim() || null,
          color,
        },
        {
          onSuccess,
          onError: () => setError(t("collections.errors.createFailed")),
        },
      );
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="collection-form-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2
            id="collection-form-title"
            className="text-lg font-semibold text-gray-900"
          >
            {isEdit
              ? t("collections.form.editTitle")
              : t("collections.form.createTitle")}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="collectionName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("collections.form.name")}
            </label>
            <input
              id="collectionName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder={t("collections.form.namePlaceholder")}
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="collectionDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("collections.form.description")}
            </label>
            <textarea
              id="collectionDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={1000}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder={t("collections.form.descriptionPlaceholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("collections.form.color")}
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(COLLECTION_COLORS) as CollectionColor[]).map(
                (c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full ${COLLECTION_COLORS[c].dot} transition-all ${
                      color === c
                        ? "ring-2 ring-offset-2 " + COLLECTION_COLORS[c].ring
                        : "hover:scale-110"
                    }`}
                    title={t(`collections.colors.${c}`)}
                    aria-label={t(`collections.colors.${c}`)}
                  />
                ),
              )}
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outlined" onClick={onClose} type="button">
              {t("common.cancel")}
            </Button>
            <Button
              variant="filled"
              type="submit"
              loading={isLoading}
              disabled={!name.trim()}
            >
              {isEdit
                ? t("collections.form.editButton")
                : t("collections.form.createButton")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
