import { createContext } from "react";
import { Event, EventFormData } from "@/types/events";
import { Photo } from "@/types/photos";
import { Testimonial } from "@/types/testimonials";
import { User, LoginFormData, RegisterFormData } from "@/types/users";

export type AdminContextType = {
  url: string;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  testimonials: Testimonial[];
  setTestimonial: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: LoginFormData;
  setData: React.Dispatch<React.SetStateAction<LoginFormData>>;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogout: () => void;
  EventformData: EventFormData;
  setEventFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  handleCreateEvent: (e: React.FormEvent) => Promise<void>;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUser: (userId: string) => Promise<void>;
};

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export default AdminContext;
