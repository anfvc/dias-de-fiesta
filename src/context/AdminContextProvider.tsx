import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminContext from "./AdminContext";
import { Event, EventFormData } from "@/types/events";
import { User, RegisterFormData, LoginFormData } from "@/types/users";
// import { Testimonial } from "@/types/testimonials";
// import { Photo } from "@/types/photos";
import toast from "react-hot-toast";

interface AdminContextProviderProps {
  children: React.ReactNode;
}

const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
  const url: string = import.meta.env.VITE_SERVER;
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  // const [photos, setPhotos] = useState<Photo[]>([])
  // const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const [EventformData, setEventFormData] = useState<EventFormData>({
    title: "",
    subtitle: "",
    description: "",
    price: "",
    category: "",
  });

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
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
        toast.success(data.message);
        console.log(data);
        navigate("/admin/dashboard"); // redirect to dashboard
      } else {
        const { error } = await response.json();
        toast.error(error);
        // console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    const response = await fetch(`${url}/api/admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success("Account created successfully. Please log in.");
      navigate("/admin/login");
    } else {
      const err = await response.json();
      alert(err.message || "Failed to register");
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, price, description, category, subtitle } = EventformData;

    if (!title || !price || !description || !category || !subtitle) {
      toast.error("All fields are required.");
      return;
    }

    const data = new FormData();
    data.append("title", EventformData.title);
    data.append("subtitle", EventformData.subtitle);
    data.append("description", EventformData.description);
    data.append("price", EventformData.price.toString());
    data.append("category", EventformData.category);

    if (!image) {
      toast.error("Please upload an image!!");
      return;
    } else {
      data.append("image", image);
    }
    setLoading(true);

    try {
      const settings = {
        method: "POST",
        body: data,
      };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/admin/events/create`,
        settings
      );

      if (response.ok) {
        setEventFormData({
          title: "",
          description: "",
          price: "",
          category: "",
          subtitle: "",
        });
        setImage(null);
        setLoading(false);
        const { message } = await response.json();
        toast.success(message);
        fetchEvents();
      } else {
        const { errorData } = await response.json();
        toast.error(errorData);
        // console.log(errorData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${url}/api/admin/events/all`);

      if (!response.ok) {
        const { error } = await response.json();
        toast.error(error);
        return;
      }

      const eventsFetched = await response.json();
      // console.log(eventsFetched);
      setEvents(eventsFetched);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [url]);

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

  const deleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${url}/api/admin/${userId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const { error } = await response.json();
          toast.error(error);
          console.log(error);
          throw new Error(error);
        }

        setUsers(users.filter((user) => user._id !== userId));
        //onUserDeleted(userId); // --> updating the state of the users array so that it updates immediately after a user gets deleted.
        // const { message } = await response.json();
        // console.log(message);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          const error = await response.json();

          if (error.error === "Session has expired. Please log in again.") {
            toast.error("Your session has expired. Please log in again.");
          }

          localStorage.removeItem("token");
          setCurrentUser(null);
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
  }, [url, navigate]);

  const handleLogout = () => {
    const userName = currentUser?.name.split(" ")[0] || "User"; //if currentUser exists, display the name otherswise just "User"
    if (confirm(`${userName}, are you sure you want to log out?`)) {
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  };

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
        handleLogout,
        EventformData,
        setEventFormData,
        handleCreateEvent,
        image,
        setImage,
        loading,
        setLoading,
        events,
        setEvents,
        deleteUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
