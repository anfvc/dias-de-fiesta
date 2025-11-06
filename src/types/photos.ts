export interface Photo {
  id: string;
  image: File | null;
  photoPublicId: string;
  title?: string;
}
