import clsx from "clsx";
import { Link } from "react-router";
import { X, LogOut } from "lucide-react";
import AdminContext from "@/context/AdminContext";
import { useContext } from "react";
// import D from "../assets/svg/iconW.svg"
import logo from "../assets/svg/logoWhite.svg";

const AdminSidebar = () => {
  const { setSidebarOpen, sidebarOpen, handleLogout } =
    useContext(AdminContext);

  const navItems = [
    {
      to: "/admin/dashboard",
      name: "Dashboard",
      action: () => setSidebarOpen(false),
    },
    {
      to: "/admin/events",
      name: "Create Event",
      action: () => setSidebarOpen(false),
    },
    {
      to: "/admin/uploads",
      name: "Photo Uploads",
      action: () => setSidebarOpen(false),
    },
    {
      to: "/admin/users",
      name: "User Management",
      action: () => setSidebarOpen(false),
    },
    {
      to: "/admin/testimonials",
      name: "Testimonials",
      action: () => setSidebarOpen(false),
    },
    {
      to: "/admin/settings",
      name: "Settings",
      action: () => setSidebarOpen(false),
    },
  ];

  return (
    <div className="flex shadow-md flex-col text-white">
      <aside
        className={clsx(
          "bg-gray-800 w-64 p-4 transition-transform duration-300 border-t-0 shadow-lg",
          sidebarOpen ? "translate-x-0" : "-translate-x-64",
          "md:translate-x-0 md:static fixed z-40 h-screen flex flex-col justify-between border-r border-gray-300"
        )}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-gray-700 hover:text-gray-900"
        ></button>
        <div className="flex flex-col justify-between gap-10">
          <div className="flex justify-between">
            {/* <img src={D} alt="Logo Dias de Fiesta" className="w-20" /> */}
            <img src={logo} alt="Logo Dias de Fiesta" className="w-40" />
            {sidebarOpen && (
              <button onClick={() => setSidebarOpen(false)}>
                <X />
              </button>
            )}
          </div>
          <div className="w-full">
            <nav className="flex flex-col gap-4 justify-between mb-10">
              {navItems.map((navItem, index) => (
                <Link to={navItem.to} onClick={navItem.action} key={index}>
                  {navItem.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="flex navItems-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
