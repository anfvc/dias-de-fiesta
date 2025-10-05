import { createContext } from "react";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type FormData = {
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
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogout: () => void;
};

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export default AdminContext;
