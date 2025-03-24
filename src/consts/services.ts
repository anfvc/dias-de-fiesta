import type { Services } from "@/types/services";

import graduation from "@/assets/services/graduation.jpeg";
import birthday from "@/assets/services/birthday.jpeg";
import wedding from "@/assets/services/matri.webp";
import baptism from "@/assets/services/bapti.jpeg";
import conference from "@/assets/services/conf.webp";
import kidsBirthday from "@/assets/services/kidbday.jpg";

export const SERVICES: Services[] = [
  {
    id: "graduaciones",
    name: "Graduaciones",
    description: "lorem20",
    price: "XXXX",
    image: graduation,
  },
  {
    id: "cumpleaños",
    name: "Cumpleaños",
    description: "lorem20",
    price: "XXXX",
    image: birthday,
  },
  {
    id: "bodas",
    name: "Bodas",
    description: "lorem20",
    price: "XXXX",
    image: wedding,
  },
  {
    id: "bautizos",
    name: "Bautizos",
    description: "lorem20",
    price: "XXXX",
    image: baptism,
  },
  {
    id: "conferencias",
    name: "Conferencias",
    description: "lorem20",
    price: "XXXX",
    image: conference,
  },
  {
    id: "fiestas infantiles",
    name: "Fiestas Infantiles",
    description: "lorem20",
    price: "XXXX",
    image: kidsBirthday,
  },
];
