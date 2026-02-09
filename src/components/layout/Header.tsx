import type { ReactNode } from "react";
import { cn } from "@/utils";

type HeaderVariant = NonNullable<HeaderProps["variant"]>;

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  variant?: "default" | "transparent" | "elevated";
  sticky?: boolean;
}

export default function Header({
  logo,
  navigation,
  actions,
  variant = "default",
  sticky = false,
  className,
  ...rest
}: HeaderProps) {
  const baseClasses = "w-full z-50 transition-all duration-200";

  const variantClasses: Record<HeaderVariant, string> = {
    default: "bg-white border-b border-gray-200",
    transparent: "bg-transparent",
    elevated: "bg-white shadow-md",
  };

  return (
    <header
      className={cn(
        baseClasses,
        variantClasses[variant],
        sticky && "sticky top-0",
        className,
      )}
      {...rest}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {logo && <div className="flex-shrink-0">{logo}</div>}

          {navigation && (
            <nav className="hidden md:flex space-x-8">{navigation}</nav>
          )}

          {actions && (
            <div className="flex items-center space-x-4">{actions}</div>
          )}
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  active?: boolean;
}

export function NavLink({
  href,
  children,
  active = false,
  className,
  ...rest
}: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "text-primary-500 bg-primary-500/10"
          : "text-gray-700 hover:text-primary-500 hover:bg-gray-100",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
