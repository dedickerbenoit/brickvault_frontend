import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/layout";
import { AuthenticatedLayout } from "@/components/layout";
import { LoginDropdown, ProtectedRoute } from "@/components/auth";
import { AuthProvider } from "@/contexts";
import { useAuth } from "@/hooks";
import { APP_NAME, ROUTES } from "@/constants";
import LandingPage from "@/pages/LandingPage";
import RegisterPage from "@/pages/RegisterPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import DashboardPage from "@/pages/DashboardPage";
import SetsPage from "@/pages/SetsPage";
import CollectionsPage from "@/pages/CollectionsPage";
import CollectionDetailPage from "@/pages/CollectionDetailPage";
import WishlistPage from "@/pages/WishlistPage";
import "@/locales/i18n";

const queryClient = new QueryClient();

function PublicLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header
        sticky
        logo={
          <Link to={ROUTES.HOME}>
            <img
              src="/logobrickvault.png"
              alt={APP_NAME}
              className="w-14 h-14"
            />
          </Link>
        }
        actions={!isAuthenticated ? <LoginDropdown /> : undefined}
      />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AuthenticatedLayout />}>
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                <Route path={ROUTES.SETS} element={<SetsPage />} />
                <Route path={ROUTES.COLLECTIONS} element={<CollectionsPage />} />
                <Route path={ROUTES.COLLECTION_DETAIL} element={<CollectionDetailPage />} />
                <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
              </Route>
            </Route>

            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path={ROUTES.HOME} element={<LandingPage />} />
              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
              <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
              <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
