import type { Services } from "@/types/services";

import graduation from "@/assets/services/graduation.webp";
import birthday from "@/assets/services/birthday.webp";
import wedding from "@/assets/services/matri.webp";
import baptism from "@/assets/services/bapti.webp";
import conference from "@/assets/services/conf.webp";
import kidsBirthday from "@/assets/services/kidbday.webp";

export const SERVICES: Services[] = [
  {
    id: "graduations",
    name: "Graduaciones",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: 867,
    image: graduation,
  },
  {
    id: "birthdays",
    name: "Cumpleaños",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: 777,
    image: birthday,
  },
  {
    id: "weddings",
    name: "Bodas",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: 990,
    image: wedding,
  },
  {
    id: "baptisms",
    name: "Bautizos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: 6756,
    image: baptism,
  },
  {
    id: "conferences",
    name: "Conferencias",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: 838,
    image: conference,
  },
  {
    id: "children's parties",
    name: "Fiestas Infantiles",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem aliquid incidunt repudiandae animi cumque consectetur recusandae adipisci inventore dolore",
    price: 262,
    image: kidsBirthday,
  },
];
