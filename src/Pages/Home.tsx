import { easeInOut, motion } from "framer-motion";
import HomeButton from "@/components/HomeButton";
import "@/styles/Home.css"

const Home = () => {
  return (
    <section
      className="home w-full h-screen bg-no-repeat bg-cover bg-center overflow-hidden bg-fixed"
      id="heroImageContainer"
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-white max-w-[1300px] mx-auto ">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: easeInOut }}
          className="w-full flex flex-col gap-4 sm:gap-6 lg:gap-10 px-6 md:px-14 items-center"
        >
          <h1 className="w-full text-center text-5xl leading-15 sm:leading-15 md:leading-20 font-bold md:text-7xl lg:text-8xl xl:text-9xl xl:leading-35 tracking-normal">
            Convertimos tus celebraciones en momentos únicos
          </h1>
          <p className="w-full text-center text-2xl font-normal sm:text-3xl lg:text-4xl p-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            aliquam quidem, illo hic ex temporibus saepe voluptates maxime ad
            beatae eum praesentium tenetur!
          </p>
          <HomeButton />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
