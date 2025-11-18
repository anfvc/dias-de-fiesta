import { useLocation } from "react-router";

const useHamburgerConfig = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isServicePage = /^\/services\/\w+/.test(location.pathname);
  const color = isHome || isServicePage ? "bg-white" : "bg-black"; //if location.pathname !== "/" hamb menu should be black
  const dynamicTextColor = `text-white`; //if location.pathname !== "/" sidebar text color should be white
  const background = `bg-home`;

  return {
    color,
    dynamicTextColor,
    background,
    isHome,
    isServicePage,
  };
};

export default useHamburgerConfig;
