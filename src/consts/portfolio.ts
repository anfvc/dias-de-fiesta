import type { portfolioPhotos } from "@/types/portfolio";
import { v4 as uuidv4 } from "uuid";
import weddings1 from "@/assets/weddings1.jpg";
import weddings2 from "@/assets/weddings2.jpg";
import weddings3 from "@/assets/weddings3.jpg";

import birthday1 from "@/assets/birthday1.webp";
import birthday2 from "@/assets/birthday2.jpg";
import conferences1 from "@/assets/conferences1.jpg";

export const PHOTOS: portfolioPhotos[] = [
  {
    id: uuidv4(),
    image: birthday1,
    category: "birthdays",
  },
  {
    id: uuidv4(),
    image: birthday2,
    category: "birthdays",
  },
  {
    id: uuidv4(),
    image: conferences1,
    category: "conferences",
  },
  {
    id: uuidv4(),

    image: weddings3,
    category: "weddings",
  },
  {
    id: uuidv4(),

    image: weddings1,
    category: "weddings",
  },
  {
    id: uuidv4(),

    image: weddings2,
    category: "weddings",
  },
];
