import pageNotFoundImg from "@/assets/404.png";
import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <section className="">
      <div className="h-screen flex pt-[84.16px] md:pt-[92.19px] max-w-[1500px] mx-auto">
        <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center gap-15 ">
          <div className="w-1/2 flex flex-col justify-center items-center gap-15">
            <h2 className="text-5xl sm:text-6xl md:text-9xl font-extrabold text-center">
              LO SENTIMOS...
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center">
              ...la página que buscas no existe <span className="font-extrabold">:(</span>
            </h3>
            <Link to="/">
              <button className="border-2 md:border-3 px-15 py-5 text-3xl md:px-20 md:py-10 rounded-full cursor-pointer font-semibold md:text-5xl hover:text-white hover:bg-gold-section transition-all duration-200 active:scale-95 active:transform button-shadow">
                Regresar
              </button>
            </Link>
          </div>
          <img
            src={pageNotFoundImg}
            alt="404 error image for page not found"
            className="notfound w-3xl object-cover aspect-square"
          />
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
