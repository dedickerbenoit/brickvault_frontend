import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils";
import { CubeIcon, FolderIcon, PencilIcon, TrashIcon } from "@/assets/icons";
import { getColorClasses, ROUTES } from "@/constants";
import type { CollectionData } from "@/services/collectionService";

interface CollectionCardProps {
  collection: CollectionData;
  onEdit: () => void;
  onDelete: () => void;
}

function PreviewImages({
  previewSets,
}: {
  previewSets: CollectionData["preview_sets"];
}) {
  const { t } = useTranslation();

  if (!previewSets || previewSets.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-300">
        <FolderIcon className="w-10 h-10" />
        <span className="text-xs ml-2">
          {t("collections.detail.empty.title")}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 h-full overflow-hidden">
      {previewSets.slice(0, 4).map((set) => (
        <div
          key={set.id}
          className="flex-shrink-0 w-16 h-16"
        >
          {set.img_url ? (
            <img
              src={set.img_url}
              alt={set.name}
              className="w-full h-full object-contain rounded-lg bg-gray-50 p-1"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <CubeIcon className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function CollectionCard({
  collection,
  onEdit,
  onDelete,
}: CollectionCardProps) {
  const { t } = useTranslation();
  const colors = getColorClasses(collection.color);

  return (
    <Link
      to={ROUTES.COLLECTION_DETAIL.replace(":id", String(collection.id))}
      className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full"
    >
      <div className={cn("h-2", colors.dot)} />

      {collection.preview_sets !== undefined && (
        <div className="h-20 px-5 pt-3">
          <PreviewImages previewSets={collection.preview_sets} />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {collection.name}
            </h3>
            {collection.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {collection.description}
              </p>
            )}
          </div>
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0",
              colors.bg,
              colors.text,
            )}
          >
            {collection.sets_count} {t("collections.detail.setsCount")}
          </span>
        </div>
        <div className="flex justify-end gap-1 mt-auto pt-4">
          <button
            type="button"
            title={t("collections.edit")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            className="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            title={t("collections.delete")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
