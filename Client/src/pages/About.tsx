import Testimonials from "@/components/Testimonials";
import ServicesShort from "@/components/ServicesShort";
import { easeInOut, motion } from "framer-motion";
import { Link } from "react-router";
import missionImg from "/images/ny.jpg";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section className="w-full pt-[84.16px] md:pt-[92.19px] max-w-[1500px] mx-auto ">
      <div className="w-full bg-cover bg-[url(/images/about-top.webp)] h-[800px] bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: easeInOut }}
          className="w-full h-full flex flex-col gap-6 text-5xl sm:text-6xl absolute justify-center items-center font-extrabold md:text-8xl "
        >
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-white font-bold">BIENVENIDOS A</h3>
            <h3 className="text-7xl sm:text-8xl md:text-9xl text-gold-text text-pretty text-center font-bold">
              DÍAS DE FIESTA
            </h3>
          </div>
          <Link to="/contact" className="inline-flex rounded-full mt-6">
            <button className="flex items-center font-semibold text-white text-3xl md:text-4xl bg-gold-section cursor-pointer active:transform transition-all rounded-full py-6 px-10 md:px-15 md:py-8 hover:scale-105 active:scale-95">
              Diseñemos juntos tu evento
              <ArrowRight className="w-10 h-10 ml-3" />
            </button>
          </Link>
        </motion.div>
      </div>
      <div className="w-full mt-20 px-6 md:px-4">
        <h2 className="text-6xl font-semibold text-gold-section text-pretty">
          <span className="underline">Quiénes</span> somos?
        </h2>
        <p className="text-3xl my-10">
          Creamos experiencias que celebran los momentos más importantes de la
          vida, transformándolos en recuerdos memorables, elegantes y
          emocionalmente significativos.
        </p>
        <div className="w-full my-20 flex flex-col gap-10 items-center md:gap-15 lg:gap-20 md:flex-row-reverse">
          {/* <div className="skewed"></div> */}
          <div className="w-full md:w-1/2 flex flex-col justify-center gap-3">
            <h3 className="text-3xl text-gold-section font-bold underline">
              Nuestra Misión
            </h3>
            <h2 className="text-5xl font-bold text-pretty text-gray-800">
              Lo que hacemos todos los días
            </h2>
            <p className="text-3xl py-3 text-balance">
              Diseñar, planear y producir celebraciones con un alto estándar
              estético y humano, cuidando cada detalle para que nuestros
              clientes vivan su evento con tranquilidad, emoción y orgullo.
            </p>
            <p className="text-3xl py-3 text-balance">Nos enfocamos en:</p>
            <ul className="list-disc pl-10">
              <li className="text-3xl py-2">
                Escuchar profundamente al cliente
              </li>
              <li className="text-3xl py-2">Interpretar su visión</li>
              <li className="text-3xl py-2">
                Convertirla en una experiencia impecable
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={missionImg}
              alt="Image dedicated to the missiong of the company"
              className="w-full object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02] rounded-3xl"
            />
          </div>
        </div>
      </div>
      <ServicesShort />
      <Testimonials />
    </section>
  );
};

export default About;
