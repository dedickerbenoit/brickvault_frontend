import { useTranslation } from "react-i18next";
import { Button, Modal } from "@/components/ui";

interface CollectionDeleteDialogProps {
  collectionName: string;
  loading?: boolean;
  error?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CollectionDeleteDialog({
  collectionName,
  loading = false,
  error,
  onConfirm,
  onCancel,
}: CollectionDeleteDialogProps) {
  const { t } = useTranslation();

  return (
    <Modal onClose={onCancel} ariaLabelledBy="delete-collection-dialog-title" size="sm">
      <div className="p-6">
        <h3
          id="delete-collection-dialog-title"
          className="text-lg font-semibold text-gray-900"
        >
          {t("collections.deleteDialog.title")}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {t("collections.deleteDialog.description", {
            name: collectionName,
          })}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {t("collections.deleteDialog.setsNotDeleted")}
        </p>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outlined" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {t("collections.deleteDialog.button")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
