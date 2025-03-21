import Testimonials from "@/components/Testimonials/Testimonials";

const About = () => {
  return (
    <section className="w-full pt-[100.23px] max-w-[1500px] mx-auto">
      <div className="w-full bg-cover bg-[url(/images/about-top.webp)] h-[800px] bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="w-full h-full flex flex-col gap-6 text-5xl sm:text-6xl absolute justify-center items-center font-extrabold md:text-8xl ">
          <h3 className="text-white">BIENVENIDOS A</h3>
          <h3 className="text-7xl sm:text-8xl md:text-9xl text-[#C6B870]">
            DÍAS DE FIESTA
          </h3>
          <button className="font-semibold mt-5 text-white text-3xl md:text-4xl px-10 py-5 md:px-20 md:py-8 rounded-full bg-[#AA9A45] cursor-pointer">
            Organiza tu Evento
          </button>
        </div>
      </div>
      <div className="mt-15">
        <h2 className="text-6xl font-semibold"><span className="underline">Quiénes</span> somos?</h2>
      </div>
      <Testimonials />
    </section>
  );
};

export default About;
