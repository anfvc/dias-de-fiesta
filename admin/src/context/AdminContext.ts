import { createContext } from "react";
import type { Event, EventFormData } from "@/types/events";
import type { Photo, PhotoUploadData } from "@/types/photos";
import type { Testimonial, TestimonialData } from "@/types/testimonials";
import type { User, LoginFormData, RegisterFormData } from "@/types/users";
import type { FAQ } from "@/types/faqs";

export type AdminContextType = {
  url: string;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  uploadedPhotos: Photo[];
  setUploadedPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  selectedPhotos: PhotoUploadData[];
  setSelectedPhotos: React.Dispatch<React.SetStateAction<PhotoUploadData[]>>;
  updatePhotoMetadata: (
    index: number,
    key: "category" | "title",
    value: string
  ) => void;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
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
  testimonialData: TestimonialData;
  setTestimonialData: React.Dispatch<React.SetStateAction<TestimonialData>>;
  createOrUpdateTestimonial: (e: React.FormEvent) => Promise<void>;
  createOrUpdateEvent: (e: React.FormEvent) => Promise<void>;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUser: (userId: string) => Promise<void>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  editId: string | null;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
  fetchTestimonials: () => void;
  fetchEvents: () => void;
  previewImage: string | null;
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
  faqs: FAQ[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQ[]>>;
  getCurrentUser: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getUsers: () => Promise<void>;
  uploadPhotos: () => Promise<void>;
  fetchPhotos: () => Promise<void>;
  handleDeletePhoto: (photoId: string, photoPublicId: string) => Promise<void>;
  isGalleryLoading: boolean;
  setIsGalleryLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export default AdminContext;
