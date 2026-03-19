import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
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
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    // Focus the panel on mount
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleFocusTrap = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;

    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      onClick={onClose}
      onKeyDown={handleFocusTrap}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        data-testid="modal-panel"
        className={cn(
          "bg-white rounded-2xl shadow-xl w-full max-h-[90vh] overflow-y-auto outline-none",
          sizeClasses[size],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
