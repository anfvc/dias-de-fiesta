import AdminSidebar from "@/components/AdminSidebar";
import { Outlet } from "react-router";
import AdminNavbar from "@/components/AdminNavbar";

// type urlProps = {
//   url: string;
// };

const AdminLayout = () => {
  return (
    <div className="flex w-full bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminNavbar />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
