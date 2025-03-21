import type { Testimonial } from "@/types/testimonials";
import { v4 as uuidv4 } from "uuid";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: uuidv4(),
    name: "Juana García",
    message:
      "Días de Fiesta hizo de mi matrimonio una experiencia para recordar siempre.",
    rating: 5,
    date: "2020-03-15",
  },
  {
    id: uuidv4(),
    name: "Carlos Gómez",
    message: "Excelente equipo y servicio.",
    rating: 4,
    date: "2021-04-28",
  },
  {
    id: uuidv4(),
    name: "Alba Gonzalez",
    message: "Recomiendo a Días de Fiesta!",
    rating: 5,
    date: "2023-10-20",
  },
  {
    id: uuidv4(),
    name: "Sofía Cruz",
    message: "Gracias por todo!",
    rating: 5,
    date: "2025-01-15",
  },
];
