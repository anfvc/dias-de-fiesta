import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

// type NotificationData = {
//   success: string;
//   warning: string;
// }

type VisibleProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = ({ setIsVisible }: VisibleProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  // const [notification, setNotification] = useState<NotificationData>({
  //   success: "";
  //   warning: ""
  // })
  const url: string | undefined = import.meta.env.VITE_SERVER;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormIncomplete = Object.values(formData).some((value) => !value);

    if (isFormIncomplete) {
      setWarning(
        "Para enviarnos tu mensaje, asegúrate que todos los campos han sido completados!"
      );
      return;
    }

    setWarning("");

    if (!url) {
      console.error("VITE_SERVER is not defined.");
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
      } else {
        const data = await response.json();
        setSuccess(data.message);
        setIsVisible(true); //showing confetti on submission
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error fetching the data.", error);
      console.log(error);
    }

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  useEffect(() => {
    if (success || warning) {
      const timer = setTimeout(() => {
        setSuccess("");
        setWarning("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, warning]);

  return (
    <div className="w-full">
      <form
        className="w-full flex flex-col gap-6 text-2xl md:text-3xl"
        onSubmit={handleSendEmail}
      >
        <input
          type="text"
          name="fullName"
          placeholder="Tu nombre completo"
          className="w-full border p-6 border-r-0 border-l-0 border-t-0 outline-gold-section"
          autoComplete="name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          className="border p-6 border-r-0 border-l-0 border-t-0 outline-gold-section"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Tu teléfono..."
          className="border border-r-0 border-l-0 border-t-0 p-6 outline-gold-section"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
        />
        <select
          name="subject"
          id="subject"
          className="p-6 border border-r-0 border-l-0 border-t-0 outline-gold-section"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          value={formData.subject}
        >
          <option value="" disabled>
            --Selecciona una opción--
          </option>
          <option value="Bodas">Bodas</option>
          <option value="Graduaciones">Graduaciones</option>
          <option value="Cumpleaños">Cumpleaños</option>
          <option value="Fiestas Infantiles">Fiestas Infantiles</option>
          <option value="Conferencias">Conferencias</option>
          <option value="Bautizos">Bautizos</option>
        </select>
        <textarea
          name="message"
          id="message"
          placeholder="Tu mensage"
          className="border p-6 border-r-0 border-l-0 border-t-0 outline-gold-section"
          rows={8}
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <div className="button-container mt-10 flex justify-center text-4xl text-white">
          <button
            className="w-xs sm:w-sm md:w-md p-6 rounded-full bg-transparent border-3 border-gold-section text-black font-semibold hover:bg-gold-section hover:text-white hover:transition-all hover:duration-400 cursor-pointer"
            // onClick={() => setIsVisible(true)}
          >
            Enviar
          </button>
        </div>
      </form>

      {success && (
        <p className="text-green-800">
          <strong>{success}</strong>
        </p>
      )}

      <AnimatePresence>
        {warning && (
          <motion.p
            key="warning"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className="text-red-700 mt-10 text-center"
          >
            <span>⚠️</span>
            <strong>{warning}</strong>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Form;
