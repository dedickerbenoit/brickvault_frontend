import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";
import { CubeIcon } from "@/assets/icons";
import type { UserSetData } from "@/services";

const conditionColors: Record<string, string> = {
  new: "bg-green-50 text-green-700",
  opened: "bg-yellow-50 text-yellow-700",
  built: "bg-blue-50 text-blue-700",
};

interface SetRowProps {
  userSet: UserSetData;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SetRow({ userSet, onEdit, onDelete }: SetRowProps) {
  const { t } = useTranslation();

  const conditionLabels: Record<string, string> = {
    new: t("sets.form.conditionNew"),
    opened: t("sets.form.conditionOpened"),
    built: t("sets.form.conditionBuilt"),
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
            <p className="text-sm text-gray-500">#{userSet.set.set_num}</p>
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
      <td className="px-4 py-3 text-right text-sm font-medium text-gray-900 hidden sm:table-cell">
        {userSet.purchase_price != null
          ? `${userSet.purchase_price.toFixed(2)} \u20AC`
          : "-"}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 hidden lg:table-cell">
        {userSet.purchase_date
          ? new Date(userSet.purchase_date).toLocaleDateString("fr-FR")
          : "-"}
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-1">
          <Button size="sm" variant="text" onClick={onEdit}>
            {t("sets.list.actions.edit")}
          </Button>
          <Button size="sm" variant="text" onClick={onDelete} className="text-red-600 hover:bg-red-50">
            {t("sets.list.actions.delete")}
          </Button>
        </div>
      </td>
    </tr>
  );
}
