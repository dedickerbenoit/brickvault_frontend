import { forwardRef } from "react";
import { cn } from "@/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "tonal" | "outlined" | "text" | "elevated" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "filled",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      type = "button",
      rightIcon,
      className,
      ...rest
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-[0.38] disabled:cursor-not-allowed disabled:shadow-none";

    const sizeClasses: Record<"sm" | "md" | "lg", string> = {
      sm: "px-4 py-2 text-sm h-9 min-w-[64px]",
      md: "px-6 py-2.5 text-sm h-10 min-w-[80px]",
      lg: "px-8 py-3 text-base h-12 min-w-[96px]",
    };

    const variantClasses: Record<
      NonNullable<ButtonProps["variant"]>,
      string
    > = {
      filled:
        "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-none",
      tonal:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-500 shadow-none",
      outlined:
        "border border-primary-500 text-primary-500 hover:bg-primary-500/8 active:bg-primary-500/12 focus:ring-primary-500 bg-transparent",
      text: "text-primary-500 hover:bg-primary-500/8 active:bg-primary-500/12 focus:ring-primary-500 bg-transparent",
      elevated:
        "bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 focus:ring-primary-500 shadow-md hover:shadow-lg active:shadow-sm",
      danger:
        "bg-error text-white hover:bg-red-700 active:bg-red-800 focus:ring-error shadow-none",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && "w-full",
          loading && "cursor-wait",
          className,
        )}
        {...rest}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="flex items-center">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!loading && rightIcon && (
          <span className="flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
