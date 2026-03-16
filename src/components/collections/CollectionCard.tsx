import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PencilIcon, TrashIcon } from "@/assets/icons";
import { getColorClasses } from "@/constants";
import type { CollectionData } from "@/services/collectionService";

interface CollectionCardProps {
  collection: CollectionData;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CollectionCard({
  collection,
  onEdit,
  onDelete,
}: CollectionCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const colors = getColorClasses(collection.color);

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/collections/${collection.id}`)}
    >
      <div className={`h-2 ${colors.dot}`} />
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
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
          >
            {collection.sets_count} {t("collections.detail.setsCount")}
          </span>
        </div>
        <div className="flex justify-end gap-1 mt-4">
          <button
            type="button"
            title={t("collections.edit")}
            onClick={(e) => {
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
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
