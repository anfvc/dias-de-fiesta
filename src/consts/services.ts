import type { Services } from "@/types/services";

import graduation from "@/assets/services/graduation.jpeg";
import birthday from "@/assets/services/birthday.jpg";
import wedding from "@/assets/services/matri.webp";
import baptism from "@/assets/services/bapti.jpeg";
import conference from "@/assets/services/conf.webp";
import kidsBirthday from "@/assets/services/kidbday.jpg";

export const SERVICES: Services[] = [
  {
    id: "graduaciones",
    name: "Graduaciones",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: "XXXX",
    image: graduation,
  },
  {
    id: "cumpleaños",
    name: "Cumpleaños",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: "XXXX",
    image: birthday,
  },
  {
    id: "bodas",
    name: "Bodas",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: "XXXX",
    image: wedding,
  },
  {
    id: "bautizos",
    name: "Bautizos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: "XXXX",
    image: baptism,
  },
  {
    id: "conferencias",
    name: "Conferencias",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: "XXXX",
    image: conference,
  },
  {
    id: "fiestas infantiles",
    name: "Fiestas Infantiles",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: "XXXX",
    image: kidsBirthday,
  },
];
