import logoWhite from "../assets/logoWhite.svg";
const Footer = () => {
  return (
    <section
      id="footer"
      className="w-full bg-[#AA9A45] relative border-black py-20 px-10 text-white "
    >
      <div className="absolute bg-black/30 inset-0"></div>
      <div className="flex flex-col gap-4 z-10 relative">
        <div>
          <img
            src={logoWhite}
            alt="Dias de Fiesta logo white"
            className="w-50"
          />
        </div>
          <h2 className="text-4xl w-2/3 font-bold">
            Convierte tus celebraciones en experiencias inigualables
          </h2>
          <p className="w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            commodi totam vel sed minima magni dolore placeat temporibus
            consequatur tempora.
          </p>

        </div>
    </section>
  );
};

export default Footer;
