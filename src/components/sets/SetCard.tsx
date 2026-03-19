import { useTranslation } from "react-i18next";
import { cn } from "@/utils";
import { Card, CardImage } from "@/components/ui";
import { FolderPlusIcon, PencilIcon, TrashIcon } from "@/assets/icons";
import type { UserSetData } from "@/services";

const conditionColors: Record<string, string> = {
  new: "bg-green-50 text-green-700",
  opened: "bg-yellow-50 text-yellow-700",
  built: "bg-blue-50 text-blue-700",
};

interface SetCardProps {
  userSet: UserSetData;
  onEdit: () => void;
  onDelete: () => void;
  onAddToCollection?: () => void;
}

export default function SetCard({
  userSet,
  onEdit,
  onDelete,
  onAddToCollection,
}: SetCardProps) {
  const { t } = useTranslation();

  const conditionLabels: Record<string, string> = {
    new: t("sets.form.conditionNew"),
    opened: t("sets.form.conditionOpened"),
    built: t("sets.form.conditionBuilt"),
  };

  return (
    <Card size="sm" hoverable={false} className="flex flex-col h-full">
      <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg mb-3">
        <CardImage
          src={userSet.set.img_url}
          alt={userSet.set.name}
          size="md"
          className="!w-full !h-full object-contain p-2"
        />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="font-semibold text-gray-900 truncate">
          {userSet.set.name}
        </h3>
        <p className="text-sm text-gray-500">#{userSet.set.set_num}</p>

        <div className="flex items-center gap-2 mt-2">
          <span
            className={cn(
              "inline-block px-2 py-0.5 text-xs font-medium rounded-full",
              conditionColors[userSet.condition],
            )}
          >
            {conditionLabels[userSet.condition]}
          </span>
          {userSet.set.theme?.name && (
            <span className="text-xs text-gray-500 truncate">
              {userSet.set.theme.name}
            </span>
          )}
        </div>

        {userSet.purchase_price != null && (
          <p className="text-sm font-medium text-gray-900 mt-1">
            {userSet.purchase_price.toFixed(2)} &euro;
          </p>
        )}

        <div className="min-h-[2.5rem] mt-2">
          {userSet.notes && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {userSet.notes}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-1 mt-auto pt-3 border-t border-gray-100">
          {onAddToCollection && (
            <button
              type="button"
              onClick={onAddToCollection}
              title={t("sets.list.actions.addToCollection")}
              className="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer"
            >
              <FolderPlusIcon className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={onEdit}
            title={t("sets.list.actions.edit")}
            className="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            title={t("sets.list.actions.delete")}
            className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  );
}
