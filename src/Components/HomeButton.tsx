const HomeButton = () => {
  return (
    <a href="/contact" className="inline-block rounded-full">
      <button className="cursor-pointer w-sm text-2xl py-4 md:py-6 sm:w-md md:w-lg lg:py-8 xl:py-10 block text-center rounded-full font-bold md:text-3xl lg:text-4xl lg:w-xl bg-transparent border-3 border-white hover:bg-white hover:text-black ease-in-out duration-300">
        Cotiza tu Evento
      </button>
    </a>
  );
};

export default HomeButton;
