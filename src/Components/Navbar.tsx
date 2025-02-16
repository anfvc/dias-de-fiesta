import { useState } from "react";
import logo from "../assets/dias-de-fiesta-logo-black.svg";
import { CgMenuRightAlt } from "react-icons/cg";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="bg-amber-700">
      <nav className="flex items-center justify-between">
        <div className="logo-container">
          <img src={logo} alt="Logo de Dias de Fiesta" className="w-40" />
        </div>
        {isOpen ? <CgClose /> : <CgMenuRightAlt />}
        <ul className="md:flex gap-4 border bg-amber-400 mr-2">
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
