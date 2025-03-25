import type { Testimonial } from "@/types/testimonials";
import { v4 as uuidv4 } from "uuid";

const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString("es-ES");
  return formattedDate;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: uuidv4(),
    name: "Juana García",
    message:
      "Días de Fiesta hizo de mi matrimonio una experiencia para recordar siempre.",
    rating: 5,
    date: formatDate("2021-10-10"),
  },
  {
    id: uuidv4(),
    name: "Carlos Gómez",
    message: "Excelente equipo y servicio.",
    rating: 4,
    date: formatDate("2021-10-10"),
  },
  {
    id: uuidv4(),
    name: "Alba Gonzalez",
    message: "Recomiendo a Días de Fiesta!",
    rating: 5,
    date: formatDate("2021-10-10"),
  },
  {
    id: uuidv4(),
    name: "Sofía Cruz",
    message: "Gracias por todo!",
    rating: 5,
    date: formatDate("2021-10-10"),
  },
];
