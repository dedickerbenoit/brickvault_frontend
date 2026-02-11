import { Dropdown } from "../ui";
import { Button } from "../ui";
import { cn } from "@/utils";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks";
import { ROUTES } from "@/constants";

export default function LoginDropdown() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dropdown
      trigger={
        <button
          className={cn(
            "text-gray-700 hover:text-primary transition-colors font-medium px-4 py-2 rounded-lg cursor-pointer",
          )}
        >
          {t("auth.login.trigger")}
        </button>
      }
      className="w-80"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("auth.login.title")}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("auth.login.email")}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500
 focus:border-transparent"
            placeholder={t("auth.login.emailPlaceholder")}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("auth.login.password")}
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500
 focus:border-transparent"
            placeholder={t("auth.login.passwordPlaceholder")}
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <a
            href={ROUTES.FORGOT_PASSWORD}
            className="text-xs text-gray-500 hover:text-primary-500 transition-colors"
          >
            {t("auth.login.forgotPassword")}
          </a>
        </div>

        {/* Error */}
        {mutation.isError && (
          <p className="text-sm text-red-600">{t("auth.login.error")}</p>
        )}

        {/* Submit */}
        <Button type="submit" size="md" fullWidth loading={mutation.isPending}>
          {t("auth.login.submit")}
        </Button>
      </form>

      {/* Register Link */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          {t("auth.login.noAccount")}{" "}
          <a
            href={ROUTES.REGISTER}
            className="font-medium text-primary-500 hover:text-primary-600 transition-colors"
          >
            {t("auth.login.createAccount")}
          </a>
        </p>
      </div>
    </Dropdown>
  );
}
