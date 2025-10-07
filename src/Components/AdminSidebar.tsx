import clsx from "clsx";
import { Link } from "react-router";
import { X, LogOut } from "lucide-react";
import AdminContext from "@/context/AdminContext";
import { useContext } from "react";

const AdminSidebar = () => {
  const { setSidebarOpen, sidebarOpen, handleLogout } =
    useContext(AdminContext);
  return (
    <div className="flex h-screen shadow-md flex-col">
      <aside
        className={clsx(
          "bg-gray-50 w-64 p-4 transition-transform duration-300 border-t-0 shadow-lg",
          sidebarOpen ? "translate-x-0" : "-translate-x-64",
          "md:translate-x-0 md:static fixed z-40 h-screen flex flex-col justify-between"
        )}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-gray-700 hover:text-gray-900"
        ></button>
        <div className="flex flex-col justify-between">
          <div className="flex items-center ">
            <h1 className="text-2xl font-bold text-indigo-600 mb-8">
              Dias de Fiesta Admin Panel
            </h1>
            {sidebarOpen && (
              <button onClick={() => setSidebarOpen(false)}>
                <X />
              </button>
            )}
          </div>
          <div className="w-full">
            <nav className="flex flex-col gap-4 justify-between mb-10">
              <Link
                to={"/admin/dashboard"}
                onClick={() => setSidebarOpen(false)}
              >
                Dashboard
              </Link>
              <Link to={"/admin/events"} onClick={() => setSidebarOpen(false)}>
                Create Event
              </Link>
              <Link to={"/admin/uploads"} onClick={() => setSidebarOpen(false)}>
                Photos Upload
              </Link>
              <Link to={"/admin/users"} onClick={() => setSidebarOpen(false)}>
                User Management
              </Link>
              <Link
                to={"/admin/settings"}
                onClick={() => setSidebarOpen(false)}
              >
                Settings
              </Link>
            </nav>
          </div>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
