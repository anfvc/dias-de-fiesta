import { Link } from "react-router";
import Socials from "@/components/Socials";
import logoWhite from "@/assets/svg/logoWhite.svg";

type urlProps = {
  url: string;
};

const Footer = ({ url }: urlProps) => {
  const telephone: string = import.meta.env.VITE_TELEPHONE;
  const companyEmail: string = import.meta.env.VITE_COMPANY_EMAIL;
  const devLinkedin: string = import.meta.env.VITE_DEV_LINKEDIN;

  return (
    <section
      id="footer"
      className="w-full relative py-30 px-8 bg-[url(/images/dark-bag3.jpg)] bg-cover bg-no-repeat bg-center"
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="w-full flex relative justify-start max-w-[1500px] mx-auto mb-10">
        <img src={logoWhite} alt="Dias de Fiesta logo white" className="w-50" />
      </div>
      <div className="w-full flex flex-col gap-8 md:flex-row md:gap-10 max-w-[1500px] mx-auto relative z-10 text-white">
        <div className="w-full flex flex-col justify-between gap-8 z-10 relative max-w-[800px]">
          <h2 className="text-4xl md:text-5xl font-bold text-pretty">
            Convierte tus celebraciones en experiencias inigualables
          </h2>
          <p className="text-balance text-2xl lg:text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quos laborum ipsa
            deserunt impedit ipsam ex molestias exercitationem, cum dolor
            similique, earum.
          </p>
          <button className="w-xs p-6 bg-white text-black font-semibold rounded-full cursor-pointer">
            Organiza tu evento
          </button>
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-start gap-10 text-2xl md:text-3xl mt-8 md:mt-0">
          <h3 className="font-bold">CONTACTO</h3>
          <div className="w-full">
            <h4>Teléfonos</h4>
            <p>{telephone}</p>
          </div>
          <div className="w-full">
            <h4>Correos</h4>
            <p>{companyEmail}</p>
          </div>
          <Socials color="text-white" url={url} />
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-start mt-8 md:mt-0">
          <ul className="flex flex-col gap-7 text-2xl md:text-3xl">
            <h3 className="font-bold">PÁGINAS</h3>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/about">Nosotros</Link>
            </li>
            <li>
              <Link to="/services">Servicios</Link>
            </li>
            <li>
              <Link to="/portfolio">Portafolio</Link>
            </li>
            <li>
              <Link to="/contact">Contáctanos</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full mt-20 border-t border-white max-w-[1500px] mx-auto relative">
        <div className="flex flex-col items-center md:flex-row md:justify-between pt-8 text-white">
          <p>&copy; {new Date().getFullYear()} Días de Fiesta</p>
          <p className="text-lg md:text-2xl">
            Diseñado y desarrollado con 🩶 por{" "}
            <span className="underline">
              <a href={devLinkedin} target="_blank">
                Andrés Villay
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
