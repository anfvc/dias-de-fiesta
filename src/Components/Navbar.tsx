import { useState } from "react";
import logo from "../assets/logo.svg";
// import secondary from "../assets/logo-secondary.svg"
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuOpenOrClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full sticky top-0 z-40">
      <nav className="w-full flex items-center justify-between px-4 py-3 md:px-10 max-w-[1300px] mx-auto">
        <div className="w-full flex logo-container">
          <Link to="/">
            <img src={logo} alt="Logo de Dias de Fiesta" className="w-40 sm:w-50" />
          </Link>
        </div>

        <HamburgerMenu toggleMenu={handleMenuOpenOrClose} isOpen={isOpen} />

        <ul className="hidden gap-7 sm:flex sm:text-3xl font-semibold mr-4">
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
      </nav>
    </header>
  );
};

export default Navbar;
