type ServiceId =
  | "graduations"
  | "weddings"
  | "birthdays"
  | "baptisms"
  | "conferences"
  | "children's parties";

type ServiceName =
  | "Graduaciones"
  | "Bodas"
  | "Cumpleaños"
  | "Bautizos"
  | "Conferencias"
  | "Fiestas Infantiles";

export interface Services {
  id: ServiceId;
  name: ServiceName;
  description: string;
  price: number;
  image: any;
}
