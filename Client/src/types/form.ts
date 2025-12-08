export type FormData = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

export type FormFieldProps = {
  children: React.ReactNode;
  name: keyof FormData;
  errors: FormErrors;
};
