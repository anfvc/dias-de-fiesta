import React, { useState } from "react";
import PublicContext from "./PublicContext";
import { Event } from "@/types/events";
import { Testimonial } from "@/types/testimonials";
import { Photo } from "@/types/photos";

interface PublicContextProps {
  children: React.ReactNode;
}

const PublicContextProvider = ({ children }: PublicContextProps) => {
  const url = import.meta.env.VITE_SERVER;
  const [events, setEvents] = useState<Event[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${url}/api/admin/events/all`);

      if (!response.ok) {
        const { error } = await response.json();
        console.error(error);
        return;
      }

     const eventsFetched = await response.json();
      // console.log(eventsFetched);
      setEvents(eventsFetched);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${url}/api/admin/testimonials/get`);

      if (!response.ok) {
        const { error } = await response.json();
        console.error(error);
        return;
      }

      const data = await response.json();
      // console.log(data);
      setTestimonials(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${url}/api/admin/photos/all`);

      if (!response.ok) {
        const { error } = await response.json();
        console.error(error);
        return;
      }

      const data = await response.json();
      // console.log(data);
      setPhotos(data.photos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PublicContext.Provider
      value={{
        events,
        fetchEvents,
        fetchTestimonials,
        testimonials,
        photos,
        fetchPhotos,
      }}
    >
      {children}
    </PublicContext.Provider>
  );
};

export default PublicContextProvider;
