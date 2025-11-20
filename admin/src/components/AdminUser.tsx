import AdminContext from "@/context/AdminContext";
import type { User } from "@/types/users";
import { useContext } from "react";
// import { Link } from "react-router";

type AdminUserCardProps = {
  user: User;
};

const AdminUser = ({ user }: AdminUserCardProps) => {
  const { deleteUser, currentUser } = useContext(AdminContext);

  const currentUserRole = currentUser?.role;
  const canDelete = currentUserRole === "admin" || currentUserRole === "owner";

  return (
    <div className="relative bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
      {/* Delete button */}
      {canDelete && (
        <button
          className="absolute right-3 top-3 text-white bg-red-500 transition-colors border p-2 text-lg rounded-lg cursor-pointer"
          onClick={(e) => {
            e.preventDefault(); // prevent triggering <Link> click
            e.stopPropagation(); // stop the link navigation
            deleteUser(user._id);
          }}
        >
          Delete
        </button>
      )}

      {/* User content */}
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {user.email}
        </p>

        {user.role && (
          <p className="text-gray-700">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
        )}

        <p className="text-sm text-gray-500 mt-1">
          <span className="font-semibold">ID:</span> {user._id}
        </p>
      </div>
    </div>
  );
};

export default AdminUser;
