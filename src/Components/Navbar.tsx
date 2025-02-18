import { useState } from "react";
import logo from "../assets/dias-de-fiesta-logo-black.svg";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuOpenOrClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full border bg-white sticky top-0">
      <nav className="flex items-center justify-between mx-3">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo de Dias de Fiesta" className="w-25 md:w-35" />
          </Link>
        </div>

        <HamburgerMenu toggleMenu={handleMenuOpenOrClose} isOpen={isOpen} />

        <ul className="hidden md:flex gap-4 border mr-2 text-xl">
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
