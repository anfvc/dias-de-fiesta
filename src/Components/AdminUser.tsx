import AdminContext from "@/context/AdminContext";
import { User } from "@/types/users";
import { X } from "lucide-react";
import { useContext } from "react";
import { useParams } from "react-router";

type AdminUserCardProps = {
  user?: User;
};

const AdminUser = ({ user }: AdminUserCardProps) => {
  const { users, deleteUser } = useContext(AdminContext);
  const { id } = useParams<{ id: string }>();

  const selectedUser = user || users.find((user) => user._id === id);

  if (!selectedUser) {
    return <p>No user has been found</p>;
  }

  return (
    <div>
      <div
        key={selectedUser._id}
        className="p-3 rounded-md shadow-md bg-white w-md relative"
      >
        <button
          className="absolute right-2 hover:text-red-500 transition-colors duration-150"
          onClick={() => deleteUser(selectedUser._id)}
        >
          <X />
        </button>

        <p className="font-semibold">{selectedUser.name}</p>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {selectedUser.email}
        </p>
        {selectedUser.role && (
          <p className="text-xl">
            <span className="font-semibold">Role: </span>
            {selectedUser.role}
          </p>
        )}
        {selectedUser._id && (
          <p className="text-sm text-gray-600">
            <span className="font-semibold">id:</span> {selectedUser._id}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminUser;
