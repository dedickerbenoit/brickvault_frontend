import { cn } from "@/utils";
import { CubeIcon } from "@/assets/icons";

interface CardImageProps {
  src?: string | null;
  alt: string;
  size?: "sm" | "md";
  fallbackIcon?: React.ReactNode;
  className?: string;
}

const imageSizeClasses: Record<"sm" | "md", string> = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
};

const iconSizeClasses: Record<"sm" | "md", string> = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
};

export default function CardImage({
  src,
  alt,
  size = "md",
  fallbackIcon,
  className,
}: CardImageProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          imageSizeClasses[size],
          "object-contain rounded flex-shrink-0",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        imageSizeClasses[size],
        "bg-gray-100 rounded flex items-center justify-center flex-shrink-0",
        className,
      )}
    >
      {fallbackIcon ?? (
        <CubeIcon className={cn(iconSizeClasses[size], "text-gray-400")} />
      )}
    </div>
  );
}
