import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Menu, Bell, LogOut, X } from "lucide-react";

type prop = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
};

const AdminNavbar = ({ setSidebarOpen, sidebarOpen }: prop) => {
  const [loggedInName, setLoggedInName] = useState<string>("");
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm(`${loggedInName.split(" ")[0]}, are you sure you want to be logged out?`)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    const loggedInuser = localStorage.getItem("user");
    if (loggedInuser) {
      const foundUser = JSON.parse(loggedInuser);
      setLoggedInName(foundUser.name);
    }
  }, []);

  return (
    <header>
      {/* Top bar */}
      <nav className="flex items-center justify-between bg-white shadow p-4">
        <button
          className="md:hidden p-2"
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
            onClick={handleLogout}
            className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
          {loggedInName && <span>Hola, {loggedInName.split(" ")[0]}</span>}
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;
