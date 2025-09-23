import { X } from "lucide-react";
import { User } from "@/pages/AdminUsers";

type AdminUserCardProps = {
  user: User;
  url: string;
  onUserDeleted: (id: string) => void;
};

const AdminUserCard = ({ user, url, onUserDeleted }: AdminUserCardProps) => {
  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`${url}/api/admin/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const { error } = await response.json();
        console.log(error);
        throw new Error(error);
      }

      onUserDeleted(userId); // --> updating the state of the users array so that it updates immediately after a user gets deleted.
      // const { message } = await response.json();
      // console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        key={user._id}
        className="p-3 rounded-md shadow-md bg-white w-md relative"
      >
        <button
          className="absolute right-2 hover:text-red-500 transition-colors duration-150"
          onClick={() => deleteUser(user._id)}
        >
          <X />
        </button>
        <p className="font-semibold">{user.name}</p>
        <p className="text-gray-600">{user.email}</p>
        {user.role && <p className="text-sm">Role: {user.role}</p>}
      </div>
    </div>
  );
};

export default AdminUserCard;
