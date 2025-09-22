import { useState, useEffect } from "react";
import { X } from "lucide-react";

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
    <div className="grid sm:grid-cols-1 gap-2">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            className="p-3 rounded-md shadow-md bg-white w-md relative"
          >
            <button className="absolute right-2 hover:text-red-500 transition-colors duration-150">
              <X />
            </button>
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
