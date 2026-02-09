import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks";
import { Button, PasswordStrengthIndicator } from "@/components/ui";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { ROUTES } from "@/constants";
import { cn } from "@/utils";
import axios from "axios";

export default function RegisterForm() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = t("validation.firstNameRequired");
    }
    if (!formData.name.trim()) {
      newErrors.name = t("validation.nameRequired");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid");
    }
    if (!formData.password) {
      newErrors.password = t("validation.passwordRequired");
    }
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = t("validation.passwordMismatch");
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await register(formData);
      navigate(ROUTES.HOME);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const serverErrors: Record<string, string> = {};
        const validationErrors = error.response.data.errors as Record<
          string,
          string[]
        >;
        for (const [field, messages] of Object.entries(validationErrors)) {
          serverErrors[field] = messages[0];
        }
        setErrors(serverErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch =
    formData.password !== "" &&
    formData.password_confirmation !== "" &&
    formData.password === formData.password_confirmation;

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("auth.register.title")}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {t("auth.register.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* First Name + Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("auth.register.firstName")}
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => updateField("first_name", e.target.value)}
                className={cn(
                  "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent",
                  errors.first_name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary-500",
                )}
                placeholder={t("auth.register.firstNamePlaceholder")}
              />
              {errors.first_name && (
                <p className="text-xs text-red-600 mt-1">{errors.first_name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("auth.register.name")}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={cn(
                  "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent",
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary-500",
                )}
                placeholder={t("auth.register.namePlaceholder")}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("auth.register.email")}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={cn(
                "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent",
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500",
              )}
              placeholder={t("auth.register.emailPlaceholder")}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("auth.register.password")}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              className={cn(
                "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent",
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500",
              )}
              placeholder={t("auth.register.passwordPlaceholder")}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Password Strength */}
          {formData.password && (
            <PasswordStrengthIndicator
              password={formData.password}
              className="-mt-1"
            />
          )}

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("auth.register.confirmPassword")}
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.password_confirmation}
                onChange={(e) =>
                  updateField("password_confirmation", e.target.value)
                }
                className={cn(
                  "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent",
                  errors.password_confirmation
                    ? "border-red-500 focus:ring-red-500"
                    : passwordsMatch
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-300 focus:ring-primary-500",
                )}
                placeholder={t("auth.register.confirmPasswordPlaceholder")}
              />
              {passwordsMatch && (
                <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.password_confirmation && (
              <p className="text-xs text-red-600 mt-1">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" size="md" fullWidth loading={isLoading}>
            {t("auth.register.submit")}
          </Button>
        </form>

        {/* Login link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {t("auth.register.hasAccount")}{" "}
            <Link
              to={ROUTES.HOME}
              className="font-medium text-primary-500 hover:text-primary-600 transition-colors"
            >
              {t("auth.register.login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
