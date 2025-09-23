import clsx from "clsx";
import { Link } from "react-router";
import { X } from "lucide-react";

type prop = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
};

const AdminSidebar = ({ setSidebarOpen, sidebarOpen }: prop) => {
  return (
    <div className="flex h-screen shadow">
      <aside
        className={clsx(
          "bg-gray-50 w-64 p-4 transition-transform duration-300 border-t-0 shadow-lg",
          sidebarOpen ? "translate-x-0" : "-translate-x-64",
          "md:translate-x-0 md:static fixed z-40 h-full"
        )}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-gray-700 hover:text-gray-900"
        ></button>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-indigo-600 mb-8">
            Dias de Fiesta Admin Panel
          </h1>
          {sidebarOpen && <button onClick={() => setSidebarOpen(false)}><X  /></button>}
        </div>
        <nav className="flex flex-col space-y-2 mb-10">
          <Link to={"/admin/dashboard"}>Dashboard</Link>
          <Link to={"/admin/events"}>Events</Link>
          <Link to={"/admin/uploads"}>Photos</Link>
          <Link to={"/admin/users"}>Users</Link>
          <Link to={"/admin/settings"}>Settings</Link>
        </nav>
      </aside>
    </div>
  );
};

export default AdminSidebar;
