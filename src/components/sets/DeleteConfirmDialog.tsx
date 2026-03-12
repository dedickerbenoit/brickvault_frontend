import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
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
    </div>
  );
}
