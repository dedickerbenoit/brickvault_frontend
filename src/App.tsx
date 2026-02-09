import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/layout";
import { LoginDropdown } from "@/components/auth";
import { APP_NAME, ROUTES } from "@/constants";
import LandingPage from "@/pages/LandingPage";
import "@/locales/i18n";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header
          sticky
          logo={
            <a href={ROUTES.HOME}>
              <img src="/logobrickvault.png" alt={APP_NAME} className="w-14 h-14" />
            </a>
          }
          actions={<LoginDropdown />}
        />
        <Routes>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
