import { useEffect } from "react";
import { cn } from "@/utils";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  ariaLabelledBy?: string;
  size?: "sm" | "md";
  className?: string;
}

const sizeClasses: Record<"sm" | "md", string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
};

export default function Modal({
  children,
  onClose,
  ariaLabelledBy,
  size = "md",
  className,
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white rounded-2xl shadow-xl w-full max-h-[90vh] overflow-y-auto",
          sizeClasses[size],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
