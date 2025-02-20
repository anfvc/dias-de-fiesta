import { useState } from "react";
// import logo from "../assets/logo.svg";
import logoW from "../assets/logoWhite.svg"
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuOpenOrClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full fixed backdrop-blur-md bg-white/10 top-0 z-40">
      <nav className="w-full flex items-center justify-between px-4 py-4 md:px-10 max-w-[1300px] mx-auto">
        <div className="w-full flex items-center justify-between logo-container">
          <Link to="/">
            <img
              src={logoW}
              alt="Logo de Dias de Fiesta"
              className="w-40 sm:w-50"
            />
          </Link>
          <ul className="hidden gap-7 text-white sm:flex sm:text-3xl lg:text-4xl font-semibold">
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

        <HamburgerMenu toggleMenu={handleMenuOpenOrClose} isOpen={isOpen} />
      </nav>
    </header>
  );
};

export default Navbar;
