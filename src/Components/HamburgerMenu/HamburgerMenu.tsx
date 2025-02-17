import "./HamburgerMenu.css";
import logo from "../../assets/dias-de-fiesta-logo-black.svg";

type Props = {
  toggleMenu: () => void;
};

const HamburgerMenu = ({ toggleMenu }: Props) => {
  return (
    <section onClick={toggleMenu} className="md:hidden mr-3">
      <input type="checkbox" id="menyAvPaa" />
      <label id="burger" htmlFor="menyAvPaa">
        <div></div>
        <div></div>
        <div></div>
      </label>
      <nav id="sidebar">
        <img src={logo} alt="Logo de Dias de Fiesta" className="w-40" />
        <div className="w-full h-full border flex">
          <ul className="h-full flex flex-col justify-start mt-40 gap-20 ml-8 text-xl">
            <li>Nosotros</li>
            <li>Servicios</li>
            <li>Portafolio</li>
            <li>Contáctanos</li>
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default HamburgerMenu;
