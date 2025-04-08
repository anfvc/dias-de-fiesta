import type { FAQ } from "@/types/faqs";
import { v4 as uuidv4 } from "uuid";

export const FAQs: FAQ[] = [
  {
    id: uuidv4(),
    question: "¿Qué servicios ofrecen?",
    answer:
      "Ofrecemos una amplia gama de servicios para eventos, incluyendo planificación, decoración, catering y entretenimiento.",
  },
  {
    id: uuidv4(),
    question: "¿Cuál es el proceso de reserva?",
    answer:
      "Loremos una consulta inicial para entender tus necesidades y luego firmamos un contrato para asegurar tu fecha.",
  },
  {
    id: uuidv4(),
    question: "¿Tienen paquetes personalizados?",
    answer:
      "Sí, ofrecemos paquetes personalizados para adaptarnos a tu presupuesto y preferencias. Podemos trabajar juntos para crear el paquete perfecto para ti.",
  },
  {
    id: uuidv4(),
    question: "¿Con cuánto tiempo de anticipación debo reservar?",
    answer:
      "Recomendamos reservar al menos 3 meses antes de tu evento para asegurarte de que tenemos disponibilidad y tiempo suficiente para planificar todos los detalles.",
  },
];
