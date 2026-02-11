import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";
import PasswordStrengthIndicator from "@/components/ui/PasswordStrengthIndicator";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { resetPassword } from "@/services/authService";
import { ROUTES } from "@/constants";
import { cn, isPasswordValid, passwordsMatch as checkPasswordsMatch } from "@/utils";

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const emailParam = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    email: emailParam,
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (data: {
      token: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) => resetPassword(data),
    onError: (error: unknown) => {
      const axiosError = error as { response?: { status?: number; data?: { errors?: Record<string, string[]>; message?: string } } };
      if (axiosError.response?.status === 422 && axiosError.response.data?.errors) {
        const apiErrors: Record<string, string> = {};
        for (const [field, messages] of Object.entries(axiosError.response.data.errors)) {
          apiErrors[field] = messages[0];
        }
        setErrors(apiErrors);
      }
    },
  });

  const passwordValid = isPasswordValid(formData.password);
  const pwMatch = checkPasswordsMatch(formData.password, formData.password_confirmation);

  const isFormValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    passwordValid &&
    pwMatch &&
    !!token;

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      if (field === "password") delete next.password_confirmation;
      return next;
    });
    if (mutation.isError) mutation.reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    mutation.mutate({ token, ...formData });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("auth.resetPassword.title")}
          </h1>
          <p className="mt-2 text-gray-600">
            {t("auth.resetPassword.subtitle")}
          </p>
        </div>

        {mutation.isSuccess ? (
          /* Success state */
          <div className="space-y-6">
            <div className="rounded-lg bg-green-50 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t("auth.resetPassword.successTitle")}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {t("auth.resetPassword.successMessage")}
              </p>
            </div>

            <a href={ROUTES.HOME}>
              <Button size="md" fullWidth>
                {t("auth.resetPassword.goToLogin")}
              </Button>
            </a>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("auth.login.email")}
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
                placeholder={t("auth.login.emailPlaceholder")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("auth.resetPassword.newPassword")}
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
                placeholder={t("auth.login.passwordPlaceholder")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Password Strength */}
            {formData.password && (
              <PasswordStrengthIndicator password={formData.password} />
            )}

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("auth.resetPassword.confirmPassword")}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password_confirmation}
                  onChange={(e) => updateField("password_confirmation", e.target.value)}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent",
                    errors.password_confirmation
                      ? "border-red-500 focus:ring-red-500"
                      : pwMatch
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-primary-500",
                  )}
                  placeholder={t("auth.register.confirmPasswordPlaceholder")}
                />
                {pwMatch && (
                  <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            {/* Token error */}
            {errors.token && (
              <p className="text-sm text-red-600">{errors.token}</p>
            )}

            {/* API error (only show if no field-level errors) */}
            {mutation.isError && Object.keys(errors).length === 0 && (
              <p className="text-sm text-red-600">
                {(mutation.error as { response?: { data?: { message?: string } } })?.response?.data?.message || t("auth.login.error")}
              </p>
            )}

            <Button
              type="submit"
              size="md"
              fullWidth
              loading={mutation.isPending}
              disabled={!isFormValid}
            >
              {t("auth.resetPassword.submit")}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
