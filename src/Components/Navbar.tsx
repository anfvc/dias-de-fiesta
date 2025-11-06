import { useState } from "react";
import { Link } from "react-router";
import HamburgerMenu from "@/components/HamburgerMenu";
import useNavbarConfig from "@/hooks/useNavbarConfig.ts";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { textColor, dynamicNavbarColor, logo, navbarItem, navBarPositon } =
    useNavbarConfig();

  const handleMenuOpenOrClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`w-full ${navBarPositon} ${dynamicNavbarColor} top-0 z-40`}
    >
      <nav className="w-full flex items-center justify-between px-4 py-4 md:px-10 2xl:px-0 max-w-[1500px] mx-auto">
        <div className="w-full flex items-center justify-between logo-container">
          <Link to="/" target="_self">
            <img
              src={logo}
              alt="Logo de Dias de Fiesta"
              className={`w-40 ${textColor} sm:w-45`}
            />
          </Link>
          <ul
            className={`hidden gap-7 ${textColor} sm:flex sm:text-3xl lg:text-4xl font-semibold p-4`}
          >
            <li className={navbarItem}>
              <Link to="/about">Nosotros</Link>
            </li>
            <li className={navbarItem}>
              <Link to="/services">Servicios</Link>
            </li>
            <li className={navbarItem}>
              <Link to="/portfolio">Portafolio</Link>
            </li>
            <li className={navbarItem}>
              <Link to="/contact">Contáctanos</Link>
            </li>
          </ul>
        </div>

        <HamburgerMenu
          toggleMenu={handleMenuOpenOrClose}
          isOpen={isOpen}
          // textColor={textColor}
        />
      </nav>
    </header>
  );
};

export default Navbar;
