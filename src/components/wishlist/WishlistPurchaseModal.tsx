import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMarkWishlistPurchased } from "@/hooks";
import { Button, Modal } from "@/components/ui";
import { CubeIcon } from "@/assets/icons";
import type { WishlistItemData } from "@/services/wishlistService";

interface WishlistPurchaseModalProps {
  item: WishlistItemData;
  onClose: () => void;
  onSuccess: () => void;
}

export default function WishlistPurchaseModal({
  item,
  onClose,
  onSuccess,
}: WishlistPurchaseModalProps) {
  const { t } = useTranslation();
  const mutation = useMarkWishlistPurchased();

  const [purchasePrice, setPurchasePrice] = useState(
    item.target_price?.toString() ?? "",
  );
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [condition, setCondition] = useState<"new" | "opened" | "built">("new");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    mutation.mutate(
      {
        id: item.id,
        payload: {
          purchase_price: purchasePrice ? parseFloat(purchasePrice) : null,
          purchase_date: purchaseDate || null,
          condition,
          notes: notes.trim() || null,
        },
      },
      {
        onSuccess,
        onError: () => setError(t("wishlist.errors.purchaseFailed")),
      },
    );
  }

  return (
    <Modal onClose={onClose} ariaLabelledBy="purchase-modal-title">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2
          id="purchase-modal-title"
          className="text-lg font-semibold text-gray-900"
        >
          {t("wishlist.purchaseModal.title")}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {t("wishlist.purchaseModal.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          {item.set.img_url ? (
            <img
              src={item.set.img_url}
              alt={item.set.name}
              className="w-14 h-14 object-contain rounded"
            />
          ) : (
            <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
              <CubeIcon className="w-7 h-7 text-gray-400" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{item.set.name}</p>
            <p className="text-sm text-gray-500">
              #{item.set.set_num}
              {item.set.theme && ` \u00B7 ${item.set.theme.name}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="purchasePrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("wishlist.purchaseModal.purchasePrice")}
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
              {t("wishlist.purchaseModal.purchaseDate")}
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
            {t("wishlist.purchaseModal.condition")}
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
            htmlFor="purchaseNotes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t("wishlist.purchaseModal.notes")}
          </label>
          <textarea
            id="purchaseNotes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            maxLength={1000}
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
            loading={mutation.isPending}
          >
            {t("wishlist.purchaseModal.submit")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
