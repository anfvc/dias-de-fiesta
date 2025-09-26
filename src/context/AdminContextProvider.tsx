import React, { useEffect, useState, createContext } from "react";

interface AdminContextProviderProps {
  children: React.ReactNode;
}

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type AdminContextType = {
  url: string;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export const AdminContext = createContext<AdminContextType>(
  {} as AdminContextType
);

const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
  const url: string = import.meta.env.VITE_SERVER;
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

  return (
    <AdminContext.Provider value={{ users, url, setUsers }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
