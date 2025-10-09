export interface Event {
  _id: string;
  title: string;
  description: string;
  subtitle: string;
  price: string;
  category: string;
  image: string;
}

export interface EventFormData {
  title: string;
  description: string;
  subtitle: string;
  price: string;
  category: string;
}
