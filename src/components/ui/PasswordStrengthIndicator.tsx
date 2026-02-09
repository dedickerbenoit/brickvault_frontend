import { useTranslation } from "react-i18next";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { cn } from "@/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

const RULES = [
  { key: "minLength", test: (p: string) => p.length >= 8 },
  { key: "uppercase", test: (p: string) => /[A-Z]/.test(p) },
  { key: "digit", test: (p: string) => /[0-9]/.test(p) },
  { key: "specialChar", test: (p: string) => /[@$!%*?&]/.test(p) },
] as const;

export default function PasswordStrengthIndicator({
  password,
  className,
}: PasswordStrengthIndicatorProps) {
  const { t } = useTranslation();

  const passedCount = RULES.filter((rule) => rule.test(password)).length;

  const barColor =
    passedCount <= 1
      ? "bg-red-500"
      : passedCount === 2
        ? "bg-orange-500"
        : passedCount === 3
          ? "bg-yellow-500"
          : "bg-green-500";

  return (
    <div className={cn("space-y-2", className)}>
      {/* Progress bar */}
      <div className="flex gap-1">
        {RULES.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < passedCount ? barColor : "bg-gray-200",
            )}
          />
        ))}
      </div>

      {/* Rules list */}
      <ul className="space-y-1">
        {RULES.map((rule) => {
          const passed = rule.test(password);
          return (
            <li
              key={rule.key}
              className={cn(
                "text-xs flex items-center gap-1.5 transition-colors",
                passed ? "text-green-600" : "text-gray-400",
              )}
            >
              {passed ? (
                <CheckCircleIcon className="w-3.5 h-3.5" />
              ) : (
                <XCircleIcon className="w-3.5 h-3.5" />
              )}
              <span>{t(`auth.register.passwordRules.${rule.key}`)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
