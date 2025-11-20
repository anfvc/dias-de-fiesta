import clsx from "clsx";
import { NavLink } from "react-router";
import { X } from "lucide-react";
import AdminContext from "@/context/AdminContext";
import { useContext } from "react";
import logo from "@/assets/svg/logoWhite.svg";
import { adminSidebarNavItems } from "@/data/AdminSidebarNavItems";

const AdminSidebar = () => {
  const { setSidebarOpen, sidebarOpen, handleLogout } =
    useContext(AdminContext);

  return (
    <div className="flex shadow-md flex-col text-white">
      <aside
        className={clsx(
          "bg-gray-800 w-80 p-4 transition-transform duration-300 border-t-0 shadow-lg",
          sidebarOpen ? "translate-x-0" : "-translate-x-80",
          "md:translate-x-0 md:static fixed z-40 h-screen flex flex-col justify-between border-r border-gray-300"
        )}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-gray-700 hover:text-gray-900"
        ></button>
        <div className="flex flex-col justify-between gap-10">
          <div className="flex justify-between">
            <a href="/admin/dashboard"><img src={logo} alt="Logo Dias de Fiesta" className="w-40" /></a>
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="cursor-pointer"
              >
                <X />
              </button>
            )}
          </div>
          <div className="w-full">
            <nav className="flex flex-col gap-4 justify-between mb-10">
              {adminSidebarNavItems.map((navItem, index) => (
                <NavLink
                  to={navItem.to}
                  onClick={() => setSidebarOpen(false)}
                  key={index}
                  className={({ isActive }) =>
                    clsx(
                      "block px-6 py-3 rounded-full transition-colors duration-200",
                      isActive
                        ? "bg-white text-gray-900 font-semibold"
                        : "text-gray-200 hover:bg-gray-700 hover:text-white"
                    )
                  }
                >
                  {navItem.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6 mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-gray-200 font-semibold px-5 py-2 rounded-full cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
