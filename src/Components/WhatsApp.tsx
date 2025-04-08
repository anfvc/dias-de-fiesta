import { FaWhatsapp } from "react-icons/fa";

type HomeProps = {
  url: string;
};

const WhatsApp = ({ url }: HomeProps) => {
  // console.log(url);
  return (
    <a
      href={`${url}/whatsapp`}
      target="_blank"
      className="fixed bottom-3 right-2 z-50"
      title="Contáctanos por WhatsApp"
      aria-label="Contáctanos por WhatsApp"
    >
      <FaWhatsapp className=" text-7xl md:text-8xl lg:text-9xl text-white" />
    </a>
  );
};

export default WhatsApp;
