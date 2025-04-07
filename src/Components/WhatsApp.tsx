import { FaWhatsapp } from "react-icons/fa";

type HomeProps = {
  url: string;
};

const WhatsApp: React.FC<HomeProps> = ({ url }) => {
  // console.log(url);
  return (

    <a
      href={`${url}/whatsapp`}
      target="_blank"
      className="fixed bottom-5 right-5 z-50"
      title="Contáctanos por WhatsApp"
      aria-label="Contáctanos por WhatsApp"
    >
      <FaWhatsapp className="text-9xl text-white" />
    </a>
  );
};

export default WhatsApp;
