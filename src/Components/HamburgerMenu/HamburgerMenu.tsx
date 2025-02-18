import "./HamburgerMenu.css";
import logo from "../../assets/dias-de-fiesta-logo-black.svg";
import { Link } from "react-router";

type Props = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const HamburgerMenu = ({ toggleMenu, isOpen }: Props) => {
  return (
    <section id="hamburgerMenu" onClick={toggleMenu} className="md:hidden mr-3">
      <div id="burger" onClick={toggleMenu} className={isOpen ? "open" : ""}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav id="sidebar" className={isOpen ? "open" : ""}>
        <Link to="/">
          <img src={logo} alt="Logo de Dias de Fiesta" className="w-40" />
        </Link>
        <div className="w-full h-full border flex">
          <ul className="w-full h-full flex flex-col justify-start mt-30 gap-20 ml-4 text-xl">
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
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default HamburgerMenu;
