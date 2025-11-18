export interface Photo {
  _id: string;
  photo: string;
  photoPublicId: string;
  title?: string;
  category?: string
}

export interface PhotoUploadData {
  file: File;
  previewUrl: string;
  category: string;
  title: string;
}
