import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks";
import { ROUTES, APP_NAME } from "@/constants";
import Header, { NavLink } from "./Header";
import { Dropdown } from "../ui";

export default function AuthenticatedLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <>
      <Header
        sticky
        logo={
          <Link to={ROUTES.DASHBOARD}>
            <img
              src="/logobrickvault.png"
              alt={APP_NAME}
              className="w-14 h-14"
            />
          </Link>
        }
        navigation={
          <>
            <NavLink to={ROUTES.DASHBOARD} active>
              {t("layout.nav.dashboard")}
            </NavLink>
          </>
        }
        actions={
          <Dropdown
            trigger={
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100">
                {user?.first_name}
              </button>
            }
            className="w-48"
          >
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              {t("layout.profile.logout")}
            </button>
          </Dropdown>
        }
      />
      <main>
        <Outlet />
      </main>
    </>
  );
}
