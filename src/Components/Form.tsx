import { useState, ChangeEvent, FormEvent, useEffect } from "react";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
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
        setSuccessMessage(data.message);
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
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <form
      className="w-5/6 flex flex-col gap-4 border"
      onSubmit={handleSendEmail}
    >
      <input
        type="text"
        name="fullName"
        placeholder="Escribe tu nombre completo..."
        className="w-full border p-2"
        autoComplete="name"
        value={formData.fullName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Tu email va aquí..."
        className="border p-2"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Danos tu teléfono..."
        className="border p-2"
        autoComplete="tel"
        value={formData.phone}
        onChange={handleChange}
      />
      <select
        name="subject"
        id="subject"
        className="p-3 border"
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setFormData({ ...formData, subject: e.target.value })
        }
        value={formData.subject}
      >
        <option value="" disabled>
          --Seleeciona una opción--
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
        placeholder="Cuéntanos en qué te podemos ayudar..."
        className="border p-2"
        rows={8}
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      <div className="button-container">
        <button className="w-full border p-2">Enviar</button>
      </div>
      {successMessage && (
        <p className="text-green-800">
          <strong>{successMessage}</strong>
        </p>
      )}
      {warning && (
        <p className="text-red-700">
          <strong>{warning}</strong>
        </p>
      )}
    </form>
  );
};

export default Form;
