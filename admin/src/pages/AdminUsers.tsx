import AdminUser from "@/components/AdminUser";
import AdminContext from "@/context/AdminContext";
import type { User } from "@/types/users";
import { useContext, useState, useEffect } from "react";
import { X } from "lucide-react";

const AdminUsers = () => {
  const { users, getUsers } = useContext(AdminContext);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="relative">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        User Management ({users.length} Total)
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.length === 0 ? (
          <p className="text-gray-500 col-span-full italic">
            No users found. Please create them.
          </p>
        ) : (
          users.map((user: User) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className="cursor-pointer"
            >
              <AdminUser user={user} />
            </div>
          ))
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-3 top-3 text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              {selectedUser.name}
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedUser.email}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {selectedUser.role}
              </p>
              <p className="text-xs text-gray-500 pt-1">
                <span className="font-semibold">ID:</span> {selectedUser._id}
              </p>
            </div>

            <div className="mt-6">
              <label className="block mb-2 font-semibold" htmlFor="userRole">
                Edit Role
              </label>
              <select
                className="border rounded-md p-2 w-full"
                value={selectedUser.role || ""}
                name="userRole"
                id="userRole"
                onChange={(e) => console.log("Update role to", e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
