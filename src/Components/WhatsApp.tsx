import { FaWhatsapp } from "react-icons/fa";

type HomeProps = {
  whatsapp: string;
};

const WhatsApp: React.FC<HomeProps> = ({ whatsapp }) => {
  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${whatsapp}&text=Hola,%20me%20interesa%20más%20información%20sobre%20sus%20servicios.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50"
      title="Contáctanos por WhatsApp"
      aria-label="Contáctanos por WhatsApp"
      aria-hidden="true"
    >
      <FaWhatsapp className="text-9xl text-white" />
    </a>
  );
};

export default WhatsApp;
