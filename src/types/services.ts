type ServiceId =
  | "graduaciones"
  | "bodas"
  | "cumpleaños"
  | "bautizos"
  | "conferencias"
  | "fiestas infantiles";

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
  price: string;
}
