import { easeInOut, motion } from "framer-motion";

const Home = () => {
  return (
    <section className="w-full h-screen" id="heroImage">
      <div className="w-full h-full flex flex-col justify-center items-center text-white max-w-[1300px] mx-auto">
        <div className="w-full flex flex-col gap-8 px-6 md:px-14 items-center md:gap-15">
          <motion.h1
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 15, opacity: 1 }}
            transition={{ duration: 1, ease: easeInOut }}
            className="w-full text-center text-4xl leading-10 sm:text-5xl sm:leading-15 md: font-bold md:text-7xl lg:text-8xl lg:leading-24 tracking-normal xl:leading-25 2xl:leading-30"
          >
            Convertimos tus celebraciones en momentos únicos
          </motion.h1>
          <motion.p
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 15, opacity: 1 }}
            transition={{ duration: 1.2, ease: easeInOut }}
            className="w-full text-center text-2xl font-normal sm:text-4xl lg:text-5xl lg:w-5/6 xl:text-5xl 2xl:text-5xl"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            aliquam quidem, illo hic ex temporibus saepe voluptates maxime ad
            beatae eum praesentium tenetur!
          </motion.p>
          <motion.a
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 15, opacity: 1 }}
            transition={{ duration: 1.4, ease: easeInOut }}
            href="/contact"
            className="w-5/6 sm:w-3/5 block text-center py-3 text-2xl rounded-full font-bold  md:py-8 md:text-4xl 2xl:text-6xl bg-[#AA9A45] "
          >
            <button className="cursor-pointer">Cotiza tu Evento</button>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Home;
