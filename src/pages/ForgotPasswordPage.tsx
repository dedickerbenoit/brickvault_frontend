import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";
import { forgotPassword } from "@/services/authService";
import { ROUTES } from "@/constants";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: { email: string }) => forgotPassword(data),
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError(t("validation.emailRequired"));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("validation.emailInvalid"));
      return;
    }

    mutation.mutate({ email });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("auth.forgotPassword.title")}
          </h1>
          <p className="mt-2 text-gray-600">
            {t("auth.forgotPassword.subtitle")}
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
                {t("auth.forgotPassword.successTitle")}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {t("auth.forgotPassword.successMessage")}
              </p>
            </div>

            <a href={ROUTES.HOME}>
              <Button size="md" fullWidth>
                {t("auth.forgotPassword.backToLogin")}
              </Button>
            </a>
          </div>
        ) : (
          /* Form */
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("auth.login.email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={t("auth.login.emailPlaceholder")}
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                {mutation.isError && (
                  <p className="mt-1 text-sm text-red-600">
                    {mutation.error?.message || t("auth.login.error")}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="md"
                fullWidth
                loading={mutation.isPending}
              >
                {t("auth.forgotPassword.submit")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <a
                href={ROUTES.HOME}
                className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
              >
                {t("auth.forgotPassword.backToLogin")}
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
