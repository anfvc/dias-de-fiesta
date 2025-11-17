import { useContext } from "react";
import { Menu, X } from "lucide-react";
import AdminContext from "@/context/AdminContext";

const AdminNavbar = () => {
  const { sidebarOpen, setSidebarOpen, currentUser } = useContext(AdminContext);
  // console.log(currentUser);

  return (
    <header>
      {/* Top bar */}
      <nav className="flex items-center justify-between bg-white shadow p-4 border-b border-gray-300">
        <button
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>

        <input
          type="text"
          placeholder="Search..."
          id="search"
          name="search"
          className="hidden md:block border rounded-lg px-4 py-2 w-80 focus:outline-indigo-500"
        />

        <div className="flex items-center gap-4">
          {currentUser && <span>👋 Hola, {currentUser.name.split(" ")[0]}</span>}
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;
