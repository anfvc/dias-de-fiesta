import { Link } from "react-router";

const Home = () => {
  return (
    <section className="w-full h-screen" id="heroImage">
      <div className="w-full h-full flex flex-col justify-center items-center text-white max-w-[1300px] mx-auto">
        <div className="w-full flex flex-col gap-8 px-8 md:px-14 items-center md:gap-15">
          <h1 className="w-full text-center text-3xl leading-10 sm:text-4xl  sm:leading-17 md: font-bold md:text-7xl lg:text-8xl lg:leading-24 tracking-normal xl:leading-25 2xl:leading-30">
            Convertimos tus celebraciones en momentos únicos
          </h1>
          <p className="w-full text-center text-2xl font-normal sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            aliquam quidem, illo hic ex temporibus saepe voluptates maxime ad
            beatae eum praesentium tenetur!
          </p>
          <Link
            to="/contact"
            className="w-5/6 sm:w-3/5 block text-center py-4 rounded-full font-bold  md:py-8 md:text-4xl 2xl:text-6xl bg-[#AA9A45] text-3xl"
          >
            <button>Cotiza tu Evento</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
