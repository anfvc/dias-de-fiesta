import useHamburgerConfig from "@/hooks/useHamburgerConfig";
import logoW from "@/assets/svg/logoWhite.svg";
import { Link } from "react-router";
import "@/styles/HamburgerMenu.css";

type Props = {
  isOpen: boolean;
  toggleMenu: () => void;
  textColor: string;
};

const HamburgerMenu = ({ toggleMenu, isOpen, textColor }: Props) => {
  const { color, background, dynamicTextColor } = useHamburgerConfig(textColor);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest("#burger") || target.closest("#sidebar ul li")) {
      toggleMenu();
    }
  };

  return (
    <section
      id="hamburgerMenuMobile"
      onClick={handleClick}
      className="flex justify-center items-center sm:hidden"
    >
      <div id="burger" onClick={toggleMenu} className={isOpen ? "open" : ""}>
        <div className={color}></div>
        <div className={color}></div>
        <div className={color}></div>
      </div>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div>
      <nav id="sidebar" className={`${isOpen ? "open" : ""} ${background}`}>
        <div className="w-full px-4 flex justify-between items-center">
          <Link to="/" onClick={toggleMenu}>
            <img
              src={logoW}
              alt="Logo de Dias de Fiesta"
              className="w-40 sm:w-50 py-4"
            />
          </Link>
          {/* <RiCloseLargeLine className="text-6xl text-white fill font-extrabold cursor-pointer" onClick={toggleMenu}/> */}
        </div>
        <ul
          className={`${dynamicTextColor} w-2/3 flex flex-col text-3xl font-semibold underline justify-start mt-20 gap-20 px-6 py-6`}
        >
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
