import { useState, useEffect } from "react";
import AdminUserCard from "@/components/AdminUserCard";

type urlProps = {
  url: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const AdminUsers = ({ url }: urlProps) => {
  const [users, setUsers] = useState<User[]>([]);
  console.log(users);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`${url}/api/admin/users`);

        if (response.ok) {
          const result: User[] = await response.json();
          // console.log(result);
          setUsers(result);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  const handleUserDeleted = (userId: string) => {
    setUsers(users.filter(user => user._id !== userId))
  }

  return (
    <div className="grid sm:grid-cols-1 gap-2">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => <AdminUserCard user={user} key={user._id} url={url} onUserDeleted={handleUserDeleted}  />)
      )}
    </div>
  );
};

export default AdminUsers;
