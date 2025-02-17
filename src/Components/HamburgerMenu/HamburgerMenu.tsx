import "./HamburgerMenu.css";
import logo from "../../assets/dias-de-fiesta-logo-black.svg";
import { Link } from "react-router";

type Props = {
  toggleMenu: () => void;
};

const HamburgerMenu = ({ toggleMenu }: Props) => {
  return (
    <section id="hamburgerMenu" onClick={toggleMenu} className="md:hidden mr-3">
      <input type="checkbox" id="menyAvPaa" />
      <label id="burger" htmlFor="menyAvPaa">
        <div></div>
        <div></div>
        <div></div>
      </label>
      <nav id="sidebar">
        <Link to="/">
          <img src={logo} alt="Logo de Dias de Fiesta" className="w-40" />
        </Link>
        <div className="w-full h-full border flex">
          <ul className="w-full h-full flex flex-col justify-start mt-30 gap-20 ml-4 text-xl">
            <li>
              <Link to="/about" target="_self" onClick={toggleMenu}>Nosotros</Link>
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
      </nav>
    </section>
  );
};

export default HamburgerMenu;
