import { cn } from "@/utils";

interface CardProps {
  size?: "sm" | "md";
  hoverable?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const sizeClasses: Record<"sm" | "md", string> = {
  sm: "p-3",
  md: "p-5",
};

export default function Card({
  size = "md",
  hoverable = true,
  onClick,
  className,
  children,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-shadow",
        hoverable && "hover:shadow-md",
        onClick && "cursor-pointer",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
