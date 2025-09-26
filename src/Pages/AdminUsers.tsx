import AdminUserCard from "@/components/AdminUserCard";
import { AdminContext, User } from "@/context/AdminContextProvider";
import { useContext } from "react";

const AdminUsers = () => {
  const { users, url, setUsers } = useContext(AdminContext);
  const handleUserDeleted = (userId: string) => {
    setUsers(users.filter((user: User) => user._id !== userId));
  };

  return (
    <div className="grid sm:grid-cols-1 gap-2">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user: User) => (
          <AdminUserCard
            key={user._id}
            user={user}
            onUserDeleted={handleUserDeleted}
          />
        ))
      )}
    </div>
  );
};

export default AdminUsers;
