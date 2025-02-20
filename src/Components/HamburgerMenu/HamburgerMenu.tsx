import "./HamburgerMenu.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router";

type Props = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const HamburgerMenu = ({ toggleMenu, isOpen }: Props) => {
  return (
    <section
      id="hamburgerMenuMobile"
      onClick={toggleMenu}
      className="flex justify-center items-center mr-4 sm:hidden"
    >
      <div id="burger" onClick={toggleMenu} className={isOpen ? "open" : ""}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav id="sidebar" className={isOpen ? "open text-black z-40" : ""}>
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="Logo de Dias de Fiesta"
              className="w-40 py-3 ml-10"
            />
          </Link>
        </div>
        <div className="w-full h-full flex">
          <ul className="w-full h-full flex flex-col text-3xl font-semibold justify-start mt-30 gap-20 ml-10">
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
