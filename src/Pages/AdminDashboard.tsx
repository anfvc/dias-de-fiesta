import { useState } from "react";
import { Menu, X, Bell, LogOut } from "lucide-react";
import clsx from "clsx";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // console.log(url);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login")
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-blue-200 w-64 p-4 shadow-lg transition-transform duration-300 border",
          sidebarOpen ? "translate-x-0" : "-translate-x-64",
          "md:translate-x-0 md:static fixed z-40 h-full"
        )}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-gray-700 hover:text-gray-900"
        >
          {/* <X className="w-6 h-6" /> */}
        </button>
        <h1 className="text-2xl font-bold text-indigo-600 mb-8">Backoffice</h1>
        <nav className="flex flex-col space-y-2 mb-10">
          <Link to={"/admin/dashboard"}>Dashboard</Link>
          <Link to={"/admin/admin-panel-events"}>Events</Link>
          <Link to={"/admin/admin-panel-photo-uploads"}>Photos</Link>
          <Link to={"/admin/admin-panel-users"}>Users</Link>
          <Link to={"/admin/admin-panel-settings"}>Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-white shadow p-4 cursor-pointer">
          <button
            className="md:hidden p-2 z-999"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>

          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block border rounded-lg px-4 py-2 w-80 focus:outline-indigo-500"
          />

          <div className="flex items-center gap-4">
            <button className="relative p-2">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
