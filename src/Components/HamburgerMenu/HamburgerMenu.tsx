import "./HamburgerMenu.css";
import logoW from "../../assets/logoWhite.svg";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
// import { Dispatch, SetStateAction } from "react";

type Props = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const HamburgerMenu = ({ toggleMenu, isOpen }: Props) => {
  const [hamburger, setHamburger] = useState<string>("bg-white");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setHamburger("bg-black");
    } else {
      setHamburger("bg-white");
    }
  }, [location.pathname]);

  return (
    <section
      id="hamburgerMenuMobile"
      onClick={toggleMenu}
      className="flex justify-center items-center mr-4 sm:hidden"
    >
      <div id="burger" onClick={toggleMenu} className={isOpen ? `open` : ""}>
        <div className={hamburger}></div>
        <div className={hamburger}></div>
        <div className={hamburger}></div>
      </div>
      <nav id="sidebar" className={isOpen ? "open text-white" : "text-white"}>
        <div className="w-full px-4">
          <Link to="/">
            <img
              src={logoW}
              alt="Logo de Dias de Fiesta"
              className="w-40 sm:w-50 py-4"
            />
          </Link>
        </div>
        <ul className="w-full h-full flex flex-col text-3xl font-semibold underline justify-start mt-20 gap-20 px-6">
          <li>
            <Link to="/about" target="_self" onClick={toggleMenu}>
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/services" target="_self" onClick={toggleMenu}>
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/portfolio" target="_self" onClick={toggleMenu}>
              Portafolio
            </Link>
          </li>
          <li>
            <Link to="/contact" target="_self" onClick={toggleMenu}>
              Contáctanos
            </Link>
          </li>
          <Link to="/contact">
            <button
              className="border-2 px-6 py-4 rounded-full"
              onClick={toggleMenu}
            >
              Escríbenos
            </button>
          </Link>
        </ul>
      </nav>
    </section>
  );
};

export default HamburgerMenu;
