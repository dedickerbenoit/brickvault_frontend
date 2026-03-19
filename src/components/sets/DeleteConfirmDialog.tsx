import { useTranslation } from "react-i18next";
import { Button, Modal } from "@/components/ui";

interface DeleteConfirmDialogProps {
  setName: string;
  loading?: boolean;
  error?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({
  setName,
  loading = false,
  error,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <Modal onClose={onCancel} ariaLabelledBy="delete-dialog-title" size="sm">
      <div className="p-6">
        <h3 id="delete-dialog-title" className="text-lg font-semibold text-gray-900">
          {t("sets.delete.title")}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {t("sets.delete.description", { name: setName })}
        </p>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outlined" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {t("sets.delete.button")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
