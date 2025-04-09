import { useLocation } from "react-router";
import logoB from "@/assets/svg/logo.svg";
import logoW from "@/assets/svg/logoWhite.svg";

const useNavbarConfig = () => {
  //* useLocation - location is an object
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  //* Checking if we are on the services details page, if so we do the below:
  const isServicePage = /^\/services\/\w+/.test(location.pathname);
  const differentNavbar = isHome || isServicePage;

  //? If current page is home, let's have the text white otherwise, black:
  const textColor = differentNavbar ? "text-white" : "text-black";

  //? If current page is home, then we show the white logo, otherwise a black one:
  const logo = differentNavbar ? logoW : logoB;

  //? When the current page isn't home, let's show a white navbar:
  const navbarColor = isHome
    ? "backdrop-blur-xl bg-white/10"
    : `bg-white shadow-md`;

  //? If we are in the serviceDetails page, let's lose the fixed navbar and have an absolute one:

  const navBarPositon = isServicePage ? "absolute" : "fixed";
  //? If we are in the serviceDetails page, let's remove the white navbar for transparent one:
  const dynamicNavbarColor = isServicePage ? `bg-none` : navbarColor;

  const navbarItem = differentNavbar
    ? "p-4 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-white after:transition-all after:scale-x-0 after:duration-500 hover:after:scale-x-100 "
    : "p-4 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-black after:transition-all after:scale-x-0 after:duration-500 hover:after:scale-x-100 ";

  return {
    textColor,
    logo,
    dynamicNavbarColor,
    navbarColor,
    isServicePage,
    navbarItem,
    navBarPositon,
  };
};

export default useNavbarConfig;
