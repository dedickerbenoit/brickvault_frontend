import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAddUserSet, useUpdateUserSet } from "@/hooks";
import { Button, Modal } from "@/components/ui";
import { CubeIcon } from "@/assets/icons";
import type { SetData, UserSetData } from "@/services";
import SetSearchInput from "./SetSearchInput";

interface SetFormProps {
  userSet?: UserSetData;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SetForm({ userSet, onClose, onSuccess }: SetFormProps) {
  const { t } = useTranslation();
  const addMutation = useAddUserSet();
  const updateMutation = useUpdateUserSet();
  const isEdit = !!userSet;

  const [selectedSet, setSelectedSet] = useState<SetData | null>(
    userSet?.set ?? null,
  );
  const [purchasePrice, setPurchasePrice] = useState(
    userSet?.purchase_price?.toString() ?? "",
  );
  const [purchaseDate, setPurchaseDate] = useState(
    userSet?.purchase_date ?? new Date().toISOString().split("T")[0],
  );
  const [condition, setCondition] = useState<"new" | "opened" | "built">(
    userSet?.condition ?? "new",
  );
  const [notes, setNotes] = useState(userSet?.notes ?? "");
  const [error, setError] = useState("");

  const isLoading = addMutation.isPending || updateMutation.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!isEdit && !selectedSet) {
      setError(t("sets.errors.noSetSelected"));
      return;
    }

    if (isEdit && userSet) {
      updateMutation.mutate(
        {
          id: userSet.id,
          payload: {
            purchase_price: purchasePrice ? parseFloat(purchasePrice) : null,
            purchase_date: purchaseDate || null,
            condition,
            notes: notes || null,
          },
        },
        {
          onSuccess,
          onError: () => setError(t("sets.errors.updatingFailed")),
        },
      );
    } else if (selectedSet) {
      addMutation.mutate(
        {
          set_num: selectedSet.set_num,
          purchase_price: purchasePrice ? parseFloat(purchasePrice) : null,
          purchase_date: purchaseDate || null,
          condition,
          notes: notes || null,
        },
        {
          onSuccess,
          onError: () => setError(t("sets.errors.addingFailed")),
        },
      );
    }
  }

  return (
    <Modal onClose={onClose} ariaLabelledBy="set-form-title">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2
          id="set-form-title"
          className="text-lg font-semibold text-gray-900"
        >
          {isEdit ? t("sets.edit.title") : t("sets.add.title")}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isEdit && <SetSearchInput onSelect={setSelectedSet} />}

          {selectedSet && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {selectedSet.img_url ? (
                <img
                  src={selectedSet.img_url}
                  alt={selectedSet.name}
                  className="w-14 h-14 object-contain rounded"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
                  <CubeIcon className="w-7 h-7 text-gray-400" />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{selectedSet.name}</p>
                <p className="text-sm text-gray-500">
                  #{selectedSet.set_num}
                  {selectedSet.theme && ` · ${selectedSet.theme.name}`}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="purchasePrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("sets.form.purchasePrice")}
              </label>
              <input
                id="purchasePrice"
                type="number"
                step="0.01"
                min="0"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="299.99"
              />
            </div>
            <div>
              <label
                htmlFor="purchaseDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("sets.form.purchaseDate")}
              </label>
              <input
                id="purchaseDate"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="condition"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("sets.form.condition")}
            </label>
            <select
              id="condition"
              value={condition}
              onChange={(e) =>
                setCondition(e.target.value as "new" | "opened" | "built")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="new">{t("sets.form.conditionNew")}</option>
              <option value="opened">{t("sets.form.conditionOpened")}</option>
              <option value="built">{t("sets.form.conditionBuilt")}</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("sets.form.notes")}
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder={t("sets.form.notesPlaceholder")}
            />
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
              disabled={!isEdit && !selectedSet}
            >
              {isEdit ? t("sets.edit.button") : t("sets.add.button")}
            </Button>
          </div>
      </form>
    </Modal>
  );
}
