import { useState } from "react";
import logo from "../assets/dias-de-fiesta-logo-black.svg";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuOpenOrClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="border">
      <nav className="flex items-center justify-between">
        <div className="logo-container">
          <img src={logo} alt="Logo de Dias de Fiesta" className="w-40" />
        </div>

        <HamburgerMenu toggleMenu={handleMenuOpenOrClose} />

        <ul className="hidden md:flex gap-4 border mr-2">
          <li>Nosotros</li>
          <li>Servicios</li>
          <li>Portafolio</li>
          <li>Contáctanos</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
