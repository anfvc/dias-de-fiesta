import { Event } from "@/types/events";
import { Photo } from "@/types/photos";
import { Testimonial } from "@/types/testimonials";
import { createContext } from "react";

export type PublicContextType = {
  events: Event[];
  testimonials: Testimonial[];
  photos: Photo[];
  fetchEvents: () => Promise<void>;
  fetchTestimonials: () => Promise<void>;
  fetchPhotos: () => Promise<void>;

};

const PublicContext = createContext<PublicContextType>({} as PublicContextType);

export default PublicContext;
