const HomeButton = () => {
  return (
    <a href="/contact" className="inline-block rounded-full">
      <button className="cursor-pointer w-fit py-4 px-6 text-2xl md:py-6 md:px-8 block text-center rounded-full font-bold md:text-3xl lg:text-4xl bg-transparent border-3 border-white hover:bg-white hover:text-black ease-in-out duration-300">
        Escríbenos y planea con expertos
      </button>
    </a>
  );
};

export default HomeButton;
