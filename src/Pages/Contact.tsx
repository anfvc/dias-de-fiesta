import { ChangeEvent, FormEvent, useState, useEffect } from "react";

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

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  //? To reset my successMessage after some time:
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // console.log(formData.message);

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

  return (
    <section id="contact" className="w-full h-full my-10 border-4 border-blue-600">
      <div className="w-full h-full flex flex-col justify-start gap-8 mx-auto items-center px-4">
        <div className="w-full text-center">
          <h2>Contact</h2>
        </div>
        <div className="w-full border">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
          repellat! Eius laboriosam modi est laborum, sit accusamus mollitia.
          Consectetur ad nemo officiis distinctio beatae optio atque asperiores
          itaque, voluptas modi? Quam ipsum deleniti laborum, quia odio quos
          voluptatum quibusdam quis consequuntur nulla officia doloremque
          aspernatur architecto tenetur ratione dignissimos ab quod nihil eum
          deserunt fugit ut similique perspiciatis? Quibusdam, adipisci?
          Blanditiis, tenetur. Quidem cumque veritatis, tempore porro fugit,
          dolorum expedita ea quas atque minus sapiente repellat perferendis
          vero repellendus velit id excepturi labore tempora ipsum debitis, non
          possimus delectus neque. Similique voluptas sunt ratione consequatur?
          Incidunt consequatur perferendis, possimus, quia inventore enim
          praesentium, quaerat vitae dolorum obcaecati quas. In ipsam voluptatem
          harum! Voluptates
        </div>
        <form
          className="w-full flex flex-col gap-4 border"
          onSubmit={handleSendEmail}
        >
          <input
            type="text"
            name="fullName"
            placeholder="Escribe tu nombre completo..."
            className="w-full border p-2"
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
            placeholder="Danos tu teléfono..."
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
      </div>
    </section>
  );
};

export default Contact;
