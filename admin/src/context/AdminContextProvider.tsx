import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminContext from "./AdminContext";
import type { Event, EventFormData } from "@/types/events";
import type { User, RegisterFormData, LoginFormData } from "@/types/users";
import type { Testimonial, TestimonialData } from "@/types/testimonials";
import type { Photo } from "@/types/photos";
import type { PhotoUploadData } from "@/types/photos";
import toast from "react-hot-toast";
import type { FAQ } from "@/types/faqs";

interface AdminContextProviderProps {
  children: React.ReactNode;
}

const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
  const url: string = import.meta.env.VITE_SERVER;

  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<PhotoUploadData[]>([]);
  // const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState<boolean>(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [data, setData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [EventformData, setEventFormData] = useState<EventFormData>({
    title: "",
    subtitle: "",
    description: "",
    price: 0,
    category: "",
  });

  const [testimonialData, setTestimonialData] = useState<TestimonialData>({
    name: "",
    message: "",
    rating: 1,
    date: "",
  });

  const navigate = useNavigate();

  const updatePhotoMetadata = (
    index: number,
    key: "category" | "title",
    value: string
  ) => {
    setSelectedPhotos((prev) => {
      const newState = [...prev];
      if (newState[index]) {
        newState[index] = { ...newState[index], [key]: value };
      }
      return newState;
    });
  };

  const fetchPhotos = async () => {
    try {
      setIsGalleryLoading(true);
      const response = await fetch(`${url}/api/admin/photos/all`);

      if (!response.ok) {
        const { error } = await response.json();
        console.log(`Failed to fetch the photos:`, error);
        return;
      }

      const data = await response.json();
      // console.log(data);
      setUploadedPhotos(data.photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsGalleryLoading(false);
    }
  };

  const uploadPhotos = async () => {
    if (selectedPhotos.length === 0) {
      toast("Please select photos to upload", { icon: "⚠️" });
      return;
    }

    const isMissingMetaData = selectedPhotos.some(
      (p) => !p.title.trim() || !p.category.trim()
    );
    if (isMissingMetaData) {
      toast.error(
        `Please provide a title and a category for all selected photos.`
      );
      return;
    }

    const toastId = toast.loading(
      `Uploading ${selectedPhotos.length} photo(s)...`
    );
    setLoading(true);

    try {
      const photoData = new FormData();
      //appending all selected files to the FormData object:
      selectedPhotos.forEach((item, index) => {
        photoData.append(`photos`, item.file);
        photoData.append(`categories[${index}]`, item.category);
        photoData.append(`titles[${index}]`, item.title);
      });

      const response = await fetch(`${url}/api/admin/photos/upload`, {
        method: "POST",
        body: photoData,
        credentials: "include",
      });

      if (!response.ok) {
        const { error } = await response.json();
        toast.error(error || `Photo Upload failed.`, { id: toastId });
        return;
      }

      //*Cleaning up temporary resources:
      selectedPhotos.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      toast.success(`Photos uploaded successfully!`, { id: toastId });

      //*Clearing states after the upload is complete:
      setSelectedPhotos([]);
      // setPreviewPhotos([]);

      await fetchPhotos();
    } catch (error) {
      toast.error(`An unexpected error occurred during upload.`, {
        id: toastId,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (photoId: string, photoPublicId: string) => {
    const toastId = toast.loading(`Deleting photo...`);
    setIsGalleryLoading(true);

    try {
      const response = await fetch(
        `${url}/api/admin/photos/delete/${photoId}`,
        {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify({ photoPublicId }),
          headers: {
            "Content-Type": "Application/JSON",
          },
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        toast.error(error || `We couldn't complete this request.`, {
          id: toastId,
        });
        return;
      }

      toast.success("🗑️ Photo deleted successfully!", { id: toastId });
      await fetchPhotos();
      setIsGalleryLoading(false);
    } catch (error) {
      console.error("Delete Error:", error);
    } finally {
      setIsGalleryLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!data.email && !data.password) {
        toast("Please provide your credentials", { icon: "⚠️" });
        return;
      }

      if (!data.email) {
        toast.error("Please provide your email");
        return;
      }

      if (!data.password) {
        toast.error("Please provide your password");
        return;
      }

      const response = await fetch(`${url}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user); //? storing the logged in user info coming from the login route into the state variable "loggedinUser"
        toast.success(data.message);
        // console.log(data);
        setData({ email: "", password: "" }); // reseting login form
        navigate("/admin/dashboard"); // redirect to dashboard
      } else {
        const { error } = await response.json();
        toast.error(error);
        // console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!formData.name && !formData.email && !formData.password) {
        toast("Please provide all your credentials", { icon: "⚠️" });
        return;
      }

      if (!formData.name) {
        toast.error("Your name is still missing.");
        return;
      }
      if (!formData.email) {
        toast.error("Your email is still missing.");
        return;
      }
      if (!formData.password) {
        toast.error("Your password is still missing.");
        return;
      }

      const response = await fetch(`${url}/api/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Failed to register");
        return;
      }

      toast.success("Account created successfully. Please log in.");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
    }
  }

  const createOrUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, price, description, category, subtitle } = EventformData;

    if (!title || !price || !description || !category || !subtitle) {
      toast("Make sure all fields are provided.", { icon: "⚠️" });
      return;
    }

    try {
      const endpoint = editMode
        ? `${url}/api/admin/events/update/${editId}`
        : `${url}/api/admin/events/create`;

      const method = editMode ? "PUT" : "POST";

      const data = new FormData();
      data.append("title", EventformData.title);
      data.append("subtitle", EventformData.subtitle);
      data.append("description", EventformData.description);
      data.append("price", EventformData.price.toString());
      data.append("category", EventformData.category);

      if (!image && !editMode) {
        toast("Please upload an image!!", { icon: "🏞️" });
        return;
      }

      if (image) {
        data.append("image", image);
      }

      setLoading(true);

      const response = await fetch(endpoint, {
        method,
        body: data,
        credentials: "include",
      });

      if (!response.ok) {
        const { error } = await response.json();
        toast.error(error);
        return;
      }

      toast.success(
        editMode
          ? "🎉 Event updated successfully!"
          : "👏 Event created successfully!"
      );
      setEventFormData({
        //reseting form state
        title: "",
        description: "",
        price: 0,
        category: "",
        subtitle: "",
      });
      setImage(null);
      setPreviewImage(null);
      setLoading(false);
      setEditMode(false);
      setEditId(null);
      fetchEvents();
    } catch (error) {
      console.log(error);
      setEventFormData({
        //reseting form state
        title: "",
        description: "",
        price: 0,
        category: "",
        subtitle: "",
      });
      setPreviewImage(null);
    } finally {
      setLoading(false);
      setEventFormData({
        //reseting form state
        title: "",
        description: "",
        price: 0,
        category: "",
        subtitle: "",
      });
      setPreviewImage(null);
    }

    // setLoading(true);
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

  const createOrUpdateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, message, rating, date } = testimonialData;

    if (!name || !message || !rating || !date) {
      toast("You must provide all the fields.", { icon: "⚠️" });
      return;
    }

    try {
      const endpoint = editMode
        ? `${url}/api/admin/testimonials/update/${editId}`
        : `${url}/api/admin/testimonials/create`;

      const method = editMode ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(testimonialData),
        credentials: "include",
      });

      if (!response.ok) {
        const { error } = await response.json();
        toast.error(error);
        return;
      }

      const data = await response.json();
      console.log(data);
      toast(
        editMode
          ? "✅ Testimonial updated successfully!"
          : "👏 Testimonial created successfully!"
      );
      setTestimonialData({ name: "", message: "", rating: 1, date: "" }); //resting fields
      setEditMode(false); //reseting editMode
      setEditId(null); //reseting editId
      fetchTestimonials();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating testimonial.");
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${url}/api/admin/testimonials/get`, {
        credentials: "include",
      });

      if (!response.ok) {
        const { error } = await response.json();
        toast.error(error);
        return;
      }

      const data = await response.json();
      if (!data || (Array.isArray(data) && data.length === 0)) {
        setTestimonials([]);
        toast.error("You have no testimonials so far.");
        return;
      }

      setTestimonials(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch testimonials.");
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(`${url}/api/admin/users`, {
        credentials: "include",
      });

      if (response.ok) {
        const result: User[] = await response.json();
        // console.log(result);
        setUsers(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId: string) => {
    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p className="text-white mb-2">
            Are you sure you want to delete this user?
          </p>
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white px-5 py-2 hover:bg-red-600 cursor-pointer rounded-full duration-200 transition-all"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const response = await fetch(`${url}/api/admin/${userId}`, {
                    method: "DELETE",
                    credentials: "include",
                  });

                  if (!response.ok) {
                    const { error } = await response.json();
                    console.log(error);
                    toast.error(error);
                    console.log(error);
                    throw new Error(error);
                  }

                  setUsers(users.filter((user) => user._id !== userId));
                  toast.success("User deleted successfully.");
                } catch (error) {
                  console.log(error);
                  // toast.error("Failed to delete user.");
                }
              }}
            >
              Delete
            </button>
            <button
              className="bg-gray-500 text-white px-5 py-2 hover:bg-gray-600 cursor-pointer rounded-full duration-200 transition-all"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          background: "#1d2938",
          color: "#fff",
          borderRadius: "10px",
        },
      }
    );
  };

  const getCurrentUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/api/admin/me`, {
        credentials: "include",
      });

      if (response.status === 401 || !response.ok) {
        // 'errorData' is the parsed JSON object: { name: '...', error: '...' }
        const errorData = await response.json();

        let errorMessage;
        let showToast = true; // Control variable for showing the toast

        // Check for the specific error name first
        if (errorData.name === "TokenExpiredError") {
          // --- 1. Token Expired Error (Show toast) ---
          errorMessage = "Session has expired. Please log in again.";
        } else if (
          errorData.error &&
          errorData.error.includes("No token provided")
        ) {
          // --- 2. Access Denied / No Token (Suppress toast, only log) ---
          errorMessage = errorData.error;
          showToast = false; // Prevents the toast from showing up
        } else if (errorData.error) {
          // --- 3. Fallback to generic server error (Show toast) ---
          errorMessage = errorData.error;
        } else {
          // --- 4. Last fallback (Show toast) ---
          errorMessage = "Authentication failed. Please log in again.";
        }

        // Always log the error details to the console
        console.error("Authentication check failed:", errorMessage);
        console.log("Server error name:", errorData.name);

        // Only show the toast if showToast is true
        if (showToast && typeof errorMessage === "string") {
          toast(errorMessage, { icon: "⚠️" });
        } else if (typeof errorMessage !== "string") {
          // Handle case where error message is unexpected, log and show generic toast
          console.error(
            "Error message is not a string. Showing fallback toast."
          );
          toast.error("An unexpected error occurred. Please log in.");
        }

        setCurrentUser(null);
        // !!! FIX: REMOVED UNCONDITIONAL REDIRECT !!!
        // navigate("/admin/login");
        //* Redirection happens in ProtectedRoute.tsx

        return;
      } else {
        const currentUserData = await response.json();
        setCurrentUser(currentUserData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const userName = currentUser?.name.split(" ")[0] || "User";
    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p className="text-white mb-2">{`${userName}, are you sure you want to log out?`}</p>
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white px-5 py-2 hover:bg-red-600 cursor-pointer rounded-full duration-200 transition-all"
              onClick={async () => {
                toast.dismiss(t.id);

                try {
                  const response = await fetch(`${url}/api/admin/logout`, {
                    method: "POST",
                    credentials: "include",
                  });

                  if (!response.ok) {
                    const error = await response.json();
                    console.log(error);
                    return;
                  }

                  const result = await response.json();
                  toast.success(result.message);
                } catch (error) {
                  console.error("Network error during logout request:", error);
                } finally {
                  setCurrentUser(null);
                  navigate("/admin/login");
                }
              }}
            >
              Logout
            </button>
            <button
              className="bg-gray-500 text-white px-5 py-2 hover:bg-gray-600 cursor-pointer rounded-full duration-200 transition-all"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          background: "#1d2938",
          color: "#fff",
          borderRadius: "10px",
        },
      }
    );
  };

  useEffect(() => {
    fetchEvents();
    fetchTestimonials();
    fetchPhotos();

    return () => {
      selectedPhotos.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
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
        handleLogout,
        EventformData,
        setEventFormData,
        createOrUpdateEvent,
        image,
        setImage,
        loading,
        setLoading,
        events,
        setEvents,
        deleteUser,
        uploadedPhotos,
        setUploadedPhotos,
        testimonials,
        setTestimonials,
        testimonialData,
        setTestimonialData,
        createOrUpdateTestimonial,
        editMode,
        setEditMode,
        editId,
        setEditId,
        fetchTestimonials,
        fetchEvents,
        previewImage,
        setPreviewImage,
        faqs,
        setFaqs,
        getCurrentUser,
        isLoading,
        setIsLoading,
        getUsers,
        selectedPhotos,
        setSelectedPhotos,
        uploadPhotos,
        fetchPhotos,
        handleDeletePhoto,
        isGalleryLoading,
        setIsGalleryLoading,
        updatePhotoMetadata,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
