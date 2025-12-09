import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FormData, FormErrors, FormFieldProps } from "@/types/form";
import { Send, Loader2 } from "lucide-react";
import SuccessModal from "./SuccessModal";
import FailModal from "./FailModal";

type VisibleProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};

const FormField = ({ children, name, errors }: FormFieldProps) => (
  <div className="relative">
    {children}
    <AnimatePresence>
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-red-600 text-lg mt-1 ml-4 absolute bottom-[-2rem] left-0"
        >
          {errors[name]}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const GOLD_COLOR = "border-[#B8860B] focus:border-[#B8860B]";
const GOLD_BG = "bg-[#B8860B] hover:bg-[#A5780A]";

const Form = ({ setIsVisible }: VisibleProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState<boolean>(false);

  const url: string | undefined = import.meta.env.VITE_SERVER;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  //*To control select area options:
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, subject: value });
  };

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Check for required fields
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "Este campo es obligatorio.";
        isValid = false;
      }
    });

    // Specific validation for email format
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Introduce un email válido.";
      isValid = false;
    }

    // Specific validation for phone format (ensure it doesn't contain letters)
    if (formData.phone && !/^\+?[\d\s()-]*$/.test(formData.phone)) {
      newErrors.phone = "El teléfono contiene caracteres inválidos.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccessModalOpen(false);
    setIsFailModalOpen(false);

    if (!validateForm()) {
      setWarning(
        "El formulario debe completarse en su totalidad antes de ser enviado."
      );
      setIsFailModalOpen(true);
      return;
    }

    setIsLoading(true);

    if (!url) {
      console.error("VITE_SERVER is not defined.");
      setIsFailModalOpen(true);
      setIsLoading(false);
      return;
    }

    try {
      // console.log("fetching from", url);
      const response = await fetch(`${url}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMsg = await response.json();
        console.log(errorMsg.error);
        return;
      }

      const data = await response.json();
      setSuccess(data.message);
      setIsSuccessModalOpen(true);
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    } catch (error) {
      console.error("Error fetching the data.", error);
      console.log(error);
      setIsFailModalOpen(true);
    }

    setIsLoading(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setErrors({});
  };

  const closeModal = () => {
    setIsSuccessModalOpen(false);
    setIsFailModalOpen(false);
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto p-4">
        <form
          className="w-full flex flex-col gap-10 text-2xl md:text-3xl"
          onSubmit={handleSendEmail}
        >
          <FormField name="fullName" errors={errors}>
            <input
              type="text"
              name="fullName"
              placeholder="Tu nombre completo"
              className={`w-full border-b-2 p-4 text-xl md:text-2xl transition-colors duration-300 outline-none ${GOLD_COLOR} ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </FormField>
          <FormField name="email" errors={errors}>
            <input
              type="text"
              name="email"
              placeholder="Tu email"
              className={`w-full border-b-2 p-4 text-xl md:text-2xl transition-colors duration-300 outline-none ${GOLD_COLOR} ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormField>
          <FormField name="phone" errors={errors}>
            <input
              type="tel"
              name="phone"
              placeholder="Tu teléfono"
              className={`w-full border-b-2 p-4 text-xl md:text-2xl transition-colors duration-300 outline-none ${GOLD_COLOR} ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormField>
          <FormField name="subject" errors={errors}>
            <div className="relative">
              <select
                name="subject"
                id="subject"
                className={`w-full border-b-2 p-4 text-xl md:text-2xl bg-white appearance-none transition-colors duration-300 outline-none ${GOLD_COLOR} ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                } ${formData.subject ? "text-gray-800" : "text-gray-500"}`}
                onChange={handleSelectChange}
                value={formData.subject}
              >
                <option value="" disabled className="text-gray-200">
                  --Selecciona una opción--
                </option>
                <option value="Bodas">Bodas</option>
                <option value="Graduaciones">Graduaciones</option>
                <option value="Cumpleaños">Cumpleaños</option>
                <option value="Fiestas Infantiles">Fiestas Infantiles</option>
                <option value="Baby Showers">Baby Showers</option>
                <option value="Conferencias">Conferencias</option>
                <option value="Bautizos">Bautizos</option>
              </select>
              {/* Custom arrow for the select input */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 top-0 h-full">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </FormField>
          <FormField name="message" errors={errors}>
            <textarea
              name="message"
              id="message"
              placeholder="Tu mensage"
              className={`w-full border-b-2 p-4 text-xl md:text-2xl resize-y transition-colors duration-300 outline-none ${GOLD_COLOR} ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              rows={8}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </FormField>
          <div className="button-container mt-12 flex flex-col items-center">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full max-w-sm flex items-center justify-center px-10 py-4 rounded-full text-4xl font-bold text-white transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[#B8860B]/50 ${GOLD_BG} ${
                isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-8 h-8 mr-3 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-8 h-8 mr-3" />
                  Enviar
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
      <AnimatePresence>
        {isSuccessModalOpen && (
          <SuccessModal
            isOpen={isSuccessModalOpen}
            onClose={closeModal}
            message={success}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFailModalOpen && (
          <FailModal
            isOpen={isFailModalOpen}
            onClose={closeModal}
            message={warning}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Form;
