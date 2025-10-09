import AdminUserCard from "@/components/AdminUserCard";
import AdminContext from "@/context/AdminContext";
import { User } from "@/types/users";
import { useContext } from "react";

const AdminUsers = () => {
  const { users } = useContext(AdminContext);

  return (
    <div className="grid sm:grid-cols-1 gap-2">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user: User) => <AdminUserCard key={user._id} user={user} />)
      )}
    </div>
  );
};

export default AdminUsers;
