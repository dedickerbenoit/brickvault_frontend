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

function PreviewStack({
  previewSets,
}: {
  previewSets: CollectionData["preview_sets"];
}) {
  const { t } = useTranslation();

  if (!previewSets || previewSets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-300">
        <FolderIcon className="w-10 h-10" />
        <span className="text-xs mt-1">
          {t("collections.detail.empty.title")}
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex items-center h-full pl-4">
      {previewSets.slice(0, 3).map((set, index) => (
        <div
          key={set.id}
          className="absolute"
          style={{
            left: `${index * 20}px`,
            zIndex: 30 - index * 10,
          }}
        >
          {set.img_url ? (
            <img
              src={set.img_url}
              alt={set.name}
              className="w-16 h-16 object-contain rounded-lg border-2 border-white shadow-md bg-white"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-lg border-2 border-white shadow-md flex items-center justify-center">
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
      className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className={cn("h-2", colors.dot)} />

      {collection.preview_sets !== undefined && (
        <div className="h-24 px-5 pt-4">
          <PreviewStack previewSets={collection.preview_sets} />
        </div>
      )}

      <div className="p-5">
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
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              colors.bg,
              colors.text,
            )}
          >
            {collection.sets_count} {t("collections.detail.setsCount")}
          </span>
        </div>
        <div className="flex justify-end gap-1 mt-4">
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
