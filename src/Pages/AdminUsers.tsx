import { useState, useEffect } from "react";

type urlProps = {
  url: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const AdminUsers = ({ url }: urlProps) => {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <div className="p-4 space-y-2">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            className="border p-3 rounded-md shadow-sm bg-white"
          >
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            {user.role && <p className="text-sm">Role: {user.role}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminUsers;
