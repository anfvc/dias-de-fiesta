import { createContext } from "react";

export type Event = {
  _id: string;
  title: string;
  description: string;
  subtitle: string;
  price: string;
  category: string;
  image: string;
};

export interface EventFormData {
  title: string;
  description: string;
  subtitle: string;
  price: string;
  category: string;
}

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export type AdminContextType = {
  url: string;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
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
};

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export default AdminContext;
