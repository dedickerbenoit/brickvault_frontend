import { useTranslation } from "react-i18next";
import { CubeIcon, LinkIcon, PencilIcon, ShoppingCartIcon, StarIcon, TrashIcon } from "@/assets/icons";
import type { WishlistItemData } from "@/services/wishlistService";

interface WishlistRowProps {
  item: WishlistItemData;
  onEdit: () => void;
  onDelete: () => void;
  onMarkPurchased: () => void;
}

export default function WishlistRow({ item, onEdit, onDelete, onMarkPurchased }: WishlistRowProps) {
  const { t } = useTranslation();

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {item.set.img_url ? (
            <img
              src={item.set.img_url}
              alt={item.set.name}
              className="w-12 h-12 object-contain rounded"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
              <CubeIcon className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium text-gray-900 truncate">
              {item.set.name}
            </p>
            <p className="text-sm text-gray-500">#{item.set.set_num}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 hidden md:table-cell">
        {item.set.theme?.name ?? "-"}
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className={`w-4 h-4 ${
                i < item.priority ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </td>
      <td className="px-4 py-3 text-right text-sm font-medium text-gray-900 hidden sm:table-cell">
        {item.target_price != null
          ? `${item.target_price.toFixed(2)} \u20AC`
          : "-"}
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-1">
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={t("wishlist.link")}
              className="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              <LinkIcon className="w-5 h-5" />
            </a>
          )}
          <button
            type="button"
            title={t("wishlist.markPurchased")}
            onClick={onMarkPurchased}
            className="p-2 rounded-full text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            title={t("wishlist.edit")}
            onClick={onEdit}
            className="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            title={t("wishlist.delete")}
            onClick={onDelete}
            className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
