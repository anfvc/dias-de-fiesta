import logoWhite from "../../src/assets/svg/logoWhite.svg"
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
      className="w-full bg-[#AA9A45] relative border-black py-30 px-10"
    >
      <div className="absolute bg-black/30 inset-0"></div>
      <div className="w-full flex flex-col gap-10 md:flex-row  md:gap-16 max-w-[1500px] mx-auto">
        <div className="w-full flex flex-col gap-8 z-10 relative text-white">
          <div>
            <img
              src={logoWhite}
              alt="Dias de Fiesta logo white"
              className="w-60"
            />
          </div>
          <h2 className="w-full text-5xl font-bold text-pretty">
            Convierte tus celebraciones en experiencias inigualables
          </h2>
          <p className="w-full text-pretty text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            commodi totam vel sed minima magni dolore placeat temporibus
            consequatur tempora.
          </p>
          <button className="w-xs p-4 bg-white text-black font-semibold rounded-full cursor-pointer">
            Organiza tu evento
          </button>
        </div>
        <div className="w-1/3 flex flex-col justify-center text-3xl gap-10 relative text-white">
          <div className="w-full flex flex-col">
            <h4>Teléfonos</h4>
            <p>{telephone}</p>
          </div>
          <div className="w-full flex flex-col text-white text-3xl">
            <h4 className="text-balance">Correos</h4>
            <p>{companyEmail}</p>
          </div>
          <div className="flex gap-10 text-5xl">
            <IoLogoInstagram />
            <IoLogoFacebook />
            <IoLogoWhatsapp />
          </div>
        </div>
        <div className="w-1/3 flex flex-col justify-center relative text-white">
          <ul className="flex flex-col gap-8 text-3xl">
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
      <div className="w-full mt-20 border-t-2 border-white max-w-[1500px] mx-auto relative md:text-4xl">
        <div className="flex flex-col md:flex-row justify-center md:justify-between pt-10 text-white">
          <p> &copy; {new Date().getFullYear()} Días de Fiesta</p>
          <p>Diseñado y desarrollado con ❤️ por <span className="underline"><a href="https://linkedin.com/in/avillay " target="_blank">Andrés Villay</a></span></p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
