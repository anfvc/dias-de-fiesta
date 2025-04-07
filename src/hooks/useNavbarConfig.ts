import { useLocation } from "react-router";
import logoB from "@/assets/svg/logo.svg";
import logoW from "@/assets/svg/logoWhite.svg";

const useNavbarConfig = () => {
  //* useLocation - location is an object
  const location = useLocation();

  const isHome = location.pathname === "/";
  //* Checking if we are on the services details page, if so we do the below:
  const isServicePage = /^\/services\/\w+/.test(location.pathname);

  //? If current page is home, let's have the text white otherwise, black:
  const textColor = isHome || isServicePage ? "text-white" : "text-black";

  //? If current page is home, then we show the white logo, otherwise a black one:
  const logo = isHome || isServicePage ? logoW : logoB;

  //? When the current page isn't home, let's show a white navbar:
  const navbarColor = isHome
    ? "backdrop-blur-xl bg-white/10"
    : `bg-white shadow-md`;


  //? If we are in the serviceDetails page, let's remove the white navbar for transparent one:
  const dynamicNavbarColor = isServicePage ? `bg-none` : navbarColor;

  return {
    textColor,
    logo,
    dynamicNavbarColor,
    navbarColor,
    isServicePage,
  };
};

export default useNavbarConfig;
