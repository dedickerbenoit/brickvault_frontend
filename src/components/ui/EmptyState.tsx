import type { ReactNode } from "react";
import { cn } from "@/utils";
import { Button } from "./";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "filled" | "tonal" | "outlined";
  };
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className,
      )}
    >
      {icon && <span className="text-gray-300 mb-4">{icon}</span>}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mt-2 max-w-md">{description}</p>
      )}
      {action && (
        <div className="mt-6">
          <Button variant={action.variant ?? "filled"} onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
