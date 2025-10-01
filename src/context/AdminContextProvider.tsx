import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminContext, { RegisterFormData } from "./AdminContext";
import { User, FormData } from "./AdminContext";

interface AdminContextProviderProps {
  children: React.ReactNode;
}

const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
  const url: string = import.meta.env.VITE_SERVER;
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert("Please provide credentials!!!");
      return;
    }

    const response = await fetch(`${url}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      localStorage.setItem("token", data.token); // store JWT
      setCurrentUser(data.user); //? storing the logged in user info coming from the login route into the state variable "loggedinUser"
      // console.log("Logged in and current user:", data.user);
      // console.log(data.message);
      navigate("/admin/dashboard"); // redirect to dashboard
    } else {
      const { error } = await response.json();
      console.error(error);
      alert(error);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields!");
      return;
    }

    const response = await fetch(`${url}/api/admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Account created successfully. Please log in.");
      navigate("/admin/login");
    } else {
      const err = await response.json();
      alert(err.message || "Failed to register");
    }
  }

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
  }, [url]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await fetch(`${url}/api/admin/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          setCurrentUser(null);
          console.warn("Session has expired. Please log in again.");
          navigate("/admin/login");
          return;
        }

        const me = await response.json();
        setCurrentUser(me);
        // console.log(me);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentUser();
  }, [url]);

  return (
    <AdminContext.Provider
      value={{
        users,
        url,
        setUsers,
        setSidebarOpen,
        sidebarOpen,
        data,
        setData,
        handleLogin,
        handleRegister,
        setFormData,
        formData,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
