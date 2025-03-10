import logoWhite from "../assets/logoWhite.svg";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
import { Link } from "react-router";

const Footer = () => {
  const telephone: string = import.meta.env.VITE_TELEPHONE;
  const companyEmail: string = import.meta.env.VITE_COMPANY_EMAIL;

  return (
    <section
      id="footer"
      className="w-full bg-[#AA9A45] relative border-black py-20 px-10 text-white "
    >
      <div className="absolute bg-black/30 inset-0"></div>
      <div className="w-full flex flex-col md:flex-row gap-16 max-w-[1300px] mx-auto">
        <div className="w-full flex flex-col gap-10 z-10 relative">
          <div>
            <img
              src={logoWhite}
              alt="Dias de Fiesta logo white"
              className="w-50"
            />
          </div>
          <h2 className="w-full text-4xl font-bold text-balance">
            Convierte tus celebraciones en experiencias inigualables
          </h2>
          <p className="w-full text-pretty">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            commodi totam vel sed minima magni dolore placeat temporibus
            consequatur tempora.
          </p>
          <button className="w-xs p-4 bg-white text-black font-semibold rounded-full">
            Organiza tu evento
          </button>
        </div>
        <div className="w-1/3 flex flex-col justify-center text-3xl gap-6">
          <div className="flex flex-col">
            <h4>Teléfonos</h4>
            <p>{telephone}</p>
          </div>
          <div className="flex flex-col">
            <h4>Correos</h4>
            <p>{companyEmail}</p>
          </div>
          <div className="flex gap-10 text-5xl">
            <IoLogoInstagram />
            <IoLogoFacebook />
            <IoLogoWhatsapp />
          </div>
        </div>
        <div className="w-1/3 flex flex-col justify-center">
          <ul className="flex flex-col gap-6">
            <li>
              <Link to="/about" target="_self">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/services" target="_self">
                Servicios
              </Link>
            </li>
            <li>
              <Link to="/portfolio" target="_self">
                Portafolio
              </Link>
            </li>
            <li>
              <Link to="/contact" target="_self">
                Contáctanos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
