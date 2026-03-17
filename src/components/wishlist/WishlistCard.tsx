import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LinkIcon, PencilIcon, ShoppingCartIcon, StarIcon, TrashIcon } from "@/assets/icons";
import { Card, CardImage } from "@/components/ui";
import type { WishlistItemData } from "@/services/wishlistService";

interface WishlistCardProps {
  item: WishlistItemData;
  onEdit: () => void;
  onDelete: () => void;
  onMarkPurchased: () => void;
  onPriorityChange: (priority: number) => void;
}

function PriorityStars({
  priority,
  onChange,
}: {
  priority: number;
  onChange?: (priority: number) => void;
}) {
  const { t } = useTranslation();
  const [localPriority, setLocalPriority] = useState(priority);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  useEffect(() => {
    setLocalPriority(priority);
  }, [priority]);

  function handleClick(starIndex: number) {
    const newPriority = starIndex === localPriority ? 0 : starIndex;
    setLocalPriority(newPriority);
    onChange?.(newPriority);
  }

  return (
    <div
      className="flex -ml-1.5"
      onMouseLeave={() => setHoveredStar(null)}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const starIndex = i + 1;
        const isFilled =
          hoveredStar !== null ? starIndex <= hoveredStar : starIndex <= localPriority;

        return (
          <button
            key={i}
            type="button"
            aria-label={t("wishlist.priority." + starIndex)}
            className={`p-1.5 cursor-pointer ${
              isFilled ? "text-yellow-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHoveredStar(starIndex)}
            onClick={() => handleClick(starIndex)}
          >
            <StarIcon
              className={`w-4 h-4 pointer-events-none ${isFilled ? "fill-yellow-400" : ""}`}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function WishlistCard({
  item,
  onEdit,
  onDelete,
  onMarkPurchased,
  onPriorityChange,
}: WishlistCardProps) {
  const { t } = useTranslation();

  return (
    <Card size="md">
      <div className="flex items-start gap-4">
        <CardImage src={item.set.img_url} alt={item.set.name} size="md" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 truncate">
            {item.set.name}
          </h3>
          <p className="text-sm text-gray-500">#{item.set.set_num}</p>
          {item.set.theme && (
            <p className="text-sm text-gray-500">{item.set.theme.name}</p>
          )}
          <div className="mt-2">
            <PriorityStars priority={item.priority} onChange={onPriorityChange} />
          </div>
        </div>
      </div>
      {item.notes && (
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {item.notes}
        </p>
      )}
      <div className="flex items-center justify-between mt-4">
        <div>
          {item.target_price != null && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
              {item.target_price.toFixed(2)} &euro;
            </span>
          )}
        </div>
        <div className="flex gap-1">
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
      </div>
    </Card>
  );
}
