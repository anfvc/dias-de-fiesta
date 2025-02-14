import { ChangeEvent, FormEvent, useEffect, useState } from "react";

//* Defining type for the formData:
type FormData = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const url: string | undefined = import.meta.env.VITE_SERVER;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching the data.", error);
    }
  };

  return (
    <section
      id="contact"
      className="w-full h-full flex justify-center items-center py-40"
    >
      <div className="w-full flex justify-center items-center">
        <form className="w-lg flex flex-col gap-4" onSubmit={handleSendEmail}>
          <input
            type="text"
            name="fullName"
            placeholder="Escribe tu nombre completo..."
            className="border p-2"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Tu email va aquí..."
            className="border p-2"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Celular o Teléfono..."
            className="border p-2"
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
            <option value="Weddings">Bodas</option>
            <option value="Graduations">Graduaciones</option>
            <option value="Birthdays">Cumpleaños</option>
            <option value="Children's parties">Fiestas Infantiles</option>
            <option value="Conferences">Conferencias</option>
            <option value="Baptisms">Bautizos</option>
          </select>
          <textarea
            name="message"
            id="message"
            placeholder="Tu mensaje..."
            className="border p-2"
            rows={8}
          ></textarea>
          <div className="button-container">
            <button className="w-full border p-2">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
