import AdminContext from "@/context/AdminContext";
// import { User } from "@/context/AdminContext";
import { User } from "@/types/users";
import { X } from "lucide-react";
import { useContext } from "react";

type AdminUserCardProps = {
  user: User;
};

const AdminUser = ({ user }: AdminUserCardProps) => {
  const { users, deleteUser } = useContext(AdminContext);
  console.log(users);

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
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          {user.role && (
            <p className="text-xl">
              <span className="font-semibold">Role: </span>
              {user.role}
            </p>
          )}
          {user._id && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">id:</span> {user._id}
            </p>
          )}

      </div>
    </div>
  );
};

export default AdminUser;
