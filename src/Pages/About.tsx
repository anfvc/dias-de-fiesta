import Testimonials from "@/components/Testimonials/Testimonials";
import { easeInOut, motion } from "framer-motion";

const About = () => {
  return (
    <section className="w-full pt-[84.16px]  md:pt-[92.19px] max-w-[1500px] mx-auto">
      <div className="w-full bg-cover bg-[url(/images/about-top.webp)] h-[800px] bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: easeInOut }}
          className="w-full h-full flex flex-col gap-6 text-5xl sm:text-6xl absolute justify-center items-center font-extrabold md:text-8xl "
        >
          <h3 className="text-white">BIENVENIDOS A</h3>
          <h3 className="text-7xl sm:text-8xl md:text-9xl text-gold-text">
            DÍAS DE FIESTA
          </h3>
          <button className="font-semibold mt-5 text-white text-3xl md:text-4xl px-10 py-5 md:px-20 md:py-8 rounded-full bg-[#AA9A45] cursor-pointer">
            Organiza tu Evento
          </button>
        </motion.div>
      </div>
      <div className="w-full my-15 px-6 md:px-4">
        <h2 className="text-6xl font-semibold text-gold-section">
          <span className="underline">Quiénes</span> somos?
        </h2>
        <p className="text-3xl md:text-4xl my-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quod
          earum maiores, inventore reprehenderit, molestiae quia odit incidunt,
          eos enim nostrum iste vero assumenda numquam tempora? Officiis
          mollitia quisquam quis labore in, saepe voluptate rem quae quam magni
          doloribus alias veritatis magnam ad? Vel, veniam repudiandae?
          Assumenda facere voluptate praesentium.
        </p>
      </div>
      <Testimonials />
    </section>
  );
};

export default About;
