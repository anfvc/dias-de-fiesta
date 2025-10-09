import AdminUser from "@/components/AdminUser";
import AdminContext from "@/context/AdminContext";
import { User } from "@/types/users";
import { useContext } from "react";
import { Link } from "react-router";

const AdminUsers = () => {
  const { users } = useContext(AdminContext);

  return (
    <div className="grid sm:grid-cols-1 gap-2 bg-red-500">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user: User) => (
          <Link to={`/admin/users/${user._id}`} key={user._id}>
            <AdminUser user={user} />
          </Link>
        ))
      )}
    </div>
  );
};

export default AdminUsers;
