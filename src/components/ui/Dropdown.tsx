import {
  useState,
  useEffect,
  useRef,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { cn } from "@/utils";

interface DropdownProps {
  trigger: ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  children: ReactNode;
  className?: string;
}

export default function Dropdown({
  trigger,
  children,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {isValidElement(trigger) &&
        cloneElement(trigger, {
          onClick: () => setIsOpen(!isOpen),
          "aria-expanded": isOpen,
          "aria-haspopup": true,
        } as React.ButtonHTMLAttributes<HTMLButtonElement>)}

      {isOpen && (
        <div
          role="menu"
          className={cn(
            "absolute right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-50",
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
