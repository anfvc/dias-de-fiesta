import Testimonials from "@/components/Testimonials/Testimonials";
import ServicesShort from "@/components/ServicesShort";
import { easeInOut, motion } from "framer-motion";
import { Link } from "react-router";
import missionImg from "/images/ny.jpg";

const About = () => {
  return (
    <section className="w-full pt-[84.16px]  md:pt-[92.19px] max-w-[1500px] mx-auto ">
      <div className="w-full bg-cover bg-[url(/images/about-top.webp)] h-[800px] bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: easeInOut }}
          className="w-full h-full flex flex-col gap-6 text-5xl sm:text-6xl absolute justify-center items-center font-extrabold md:text-8xl "
        >
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-white">BIENVENIDOS A</h3>
            <h3 className="text-7xl sm:text-8xl md:text-9xl text-gold-text text-pretty text-center">
              DÍAS DE FIESTA
            </h3>
          </div>
          <Link to="/contact" className="inline-flex rounded-full mt-6">
            <button className="font-semibold text-white text-3xl md:text-4xl bg-gold-section cursor-pointer active:scale-95 active:transform transition-all rounded-full py-6 px-10 md:px-15 md:py-8">
              Organiza tu Evento
            </button>
          </Link>
        </motion.div>
      </div>
      <div className="w-full mt-20 px-6 md:px-4">
        <h2 className="text-6xl font-semibold text-gold-section text-pretty">
          <span className="underline">Quiénes</span> somos?
        </h2>
        <p className="text-3xl lg:text-4xl my-10 text-balance">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quod
          earum maiores, inventore reprehenderit, molestiae quia odit incidunt,
          eos enim nostrum iste vero assumenda numquam tempora? Officiis
          mollitia quisquam quis labore in, saepe voluptate rem quae quam magni
          doloribus alias veritatis magnam ad? Vel, veniam repudiandae?
          Assumenda facere voluptate praesentium.
        </p>
        <div className="w-full my-20 flex flex-col gap-10 items-center md:gap-15 lg:gap-20 md:flex-row-reverse">
          {/* <div className="skewed"></div> */}
          <div className="w-full md:w-1/2 flex flex-col justify-center gap-5">
            <h3 className="text-4xl text-gold-section font-bold underline">
              Nuestra Misión
            </h3>
            <h2 className="text-5xl pt-2 font-bold text-pretty">
              Haz parte de momentos inolvidables
            </h2>
            <p className="text-3xl lg:text-4xl py-6 text-balance">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis rem aliquid incidunt repudiandae animi cumque
              consectetur recusandae adipisci inventore dolore? Illo laborum,
              quae quo autem nemo fuga iure iusto nostrum minus est doloribus
              sit rerum praesentium natus commodi quia accusantium?
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={missionImg}
              alt="Image dedicated to the missiong of the company"
              className="w-full"
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
