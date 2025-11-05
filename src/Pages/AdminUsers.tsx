import AdminUser from "@/components/AdminUser";
import AdminContext from "@/context/AdminContext";
import { User } from "@/types/users";
import { useContext, useState } from "react";
import { X } from "lucide-react";

const AdminUsers = () => {
  const { users } = useContext(AdminContext);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="relative">
      <div className="grid sm:grid-cols-1 gap-3">
        {users.length === 0 ? (
          <p>You have no users so far, please create them.</p>
        ) : (
          users.map((user: User) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className="cursor-pointer border border-gray-200"
            >
              <AdminUser user={user} />
            </div>
          ))
        )}
      </div>

      {/* Modal view */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <h2 className="text-4xl font-bold mb-4">{selectedUser.name}</h2>

            <p>
              <span className="font-semibold">Email:</span> {selectedUser.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {selectedUser.role}
            </p>
            <p>
              <span className="font-semibold">ID:</span> {selectedUser._id}
            </p>

            <div className="mt-6">
              <label className="block mb-2 font-semibold" htmlFor="userRole">Edit Role</label>
              <select
                className="border rounded-md p-2 w-full"
                value={selectedUser.role || ""}
                name="userRole"
                id="userRole"
                onChange={(e) => console.log("Update role to", e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
