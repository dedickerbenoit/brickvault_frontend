import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAddToWishlist, useUpdateWishlistItem } from "@/hooks";
import { searchSets } from "@/services/userSetService";
import { Button, Modal } from "@/components/ui";
import { StarIcon } from "@/assets/icons";
import type { WishlistItemData } from "@/services/wishlistService";
import type { SetData } from "@/services/userSetService";

interface WishlistItemModalProps {
  wishlistItem?: WishlistItemData;
  onClose: () => void;
  onSuccess: () => void;
}

export default function WishlistItemModal({
  wishlistItem,
  onClose,
  onSuccess,
}: WishlistItemModalProps) {
  const { t } = useTranslation();
  const addMutation = useAddToWishlist();
  const updateMutation = useUpdateWishlistItem();
  const isEdit = !!wishlistItem;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SetData[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedSet, setSelectedSet] = useState<SetData | null>(
    wishlistItem?.set ?? null,
  );
  const [priority, setPriority] = useState(wishlistItem?.priority ?? 0);
  const [targetPrice, setTargetPrice] = useState(
    wishlistItem?.target_price?.toString() ?? "",
  );
  const [url, setUrl] = useState(wishlistItem?.url ?? "");
  const [notes, setNotes] = useState(wishlistItem?.notes ?? "");
  const [error, setError] = useState("");

  const isLoading = addMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await searchSets(searchQuery, { signal: controller.signal });
        setSearchResults(results);
      } catch {
        if (!controller.signal.aborted) {
          setSearchResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setSearching(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const parsedPrice = targetPrice ? parseFloat(targetPrice) : null;
    const trimmedUrl = url.trim() || null;

    if (isEdit && wishlistItem) {
      updateMutation.mutate(
        {
          id: wishlistItem.id,
          payload: {
            priority,
            target_price: parsedPrice,
            url: trimmedUrl,
            notes: notes.trim() || null,
          },
        },
        {
          onSuccess,
          onError: () => setError(t("wishlist.errors.updateFailed")),
        },
      );
    } else {
      if (!selectedSet) return;
      addMutation.mutate(
        {
          set_num: selectedSet.set_num,
          priority,
          target_price: parsedPrice,
          url: trimmedUrl,
          notes: notes.trim() || null,
        },
        {
          onSuccess,
          onError: (err) => {
            const axiosError = err as { response?: { status?: number } };
            if (axiosError.response?.status === 422) {
              setError(t("wishlist.errors.alreadyInWishlist"));
            } else {
              setError(t("wishlist.errors.createFailed"));
            }
          },
        },
      );
    }
  }

  return (
    <Modal onClose={onClose} ariaLabelledBy="wishlist-form-title">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2
          id="wishlist-form-title"
          className="text-lg font-semibold text-gray-900"
        >
          {isEdit ? t("wishlist.form.editTitle") : t("wishlist.form.title")}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {!isEdit && (
          <div>
            <label
              htmlFor="wishlistSearch"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("sets.list.tableHeader.set")}
            </label>
            {selectedSet ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">
                    {selectedSet.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    #{selectedSet.set_num}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSet(null);
                    setSearchQuery("");
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer"
                >
                  {t("common.change")}
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  id="wishlistSearch"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t("sets.form.searchPlaceholder")}
                  autoFocus
                />
                {searching && (
                  <div className="absolute right-3 top-2.5">
                    <div className="animate-spin h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full" />
                  </div>
                )}
                {searchResults.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {searchResults.map((set) => (
                      <li key={set.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSet(set);
                            setSearchQuery("");
                            setSearchResults([]);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {set.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            #{set.set_num}
                            {set.theme && ` - ${set.theme.name}`}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("wishlist.form.priority")}
          </label>
          <div className="flex gap-1">
            {Array.from({ length: 6 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPriority(i)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  priority === i
                    ? "bg-primary-100 text-primary-700 ring-2 ring-primary-300"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {i > 0 && (
                  <StarIcon className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                )}
                {i === 0 ? t("wishlist.priority.0") : i}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="targetPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("wishlist.form.targetPrice")}
            </label>
            <input
              id="targetPrice"
              type="number"
              step="0.01"
              min="0"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="149.99"
            />
          </div>
          <div>
            <label
              htmlFor="wishlistUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("wishlist.form.url")}
            </label>
            <input
              id="wishlistUrl"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder={t("wishlist.form.urlPlaceholder")}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="wishlistNotes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t("wishlist.form.notes")}
          </label>
          <textarea
            id="wishlistNotes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            maxLength={1000}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder={t("wishlist.form.notesPlaceholder")}
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
            {isEdit ? t("wishlist.form.update") : t("wishlist.form.submit")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
