import { SERVICES } from "@/consts/services";
import { Link } from "react-router";
import { motion, easeInOut } from "framer-motion";

const ServicesShort = () => {
  //Showing only the three first services for this page:
  const firstThree = SERVICES.slice(0, 3);

  return (
    <div className="w-full max-w-[1500px] mx-auto px-6 md:px-4">
      <div>
        <h3 className="text-3xl text-gold-section font-bold underline">
          Servicio de Calidad
        </h3>
        <h2 className="text-5xl pt-2 font-bold text-pretty">
          Nuestros Servicios
        </h2>
        <p className="text-3xl py-6 text-pretty">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          rem aliquid incidunt repudiandae animi cumque consectetur recusandae
          adipisci inventore dolore? Illo laborum, quae quo autem nemo fuga iure
          iusto nostrum minus est doloribus sit rerum praesentium natus commodi
          quia accusantium?
        </p>
      </div>
      <div className="w-full grid my-15 gap-6 md:gap-8 lg:gap-10 md:grid-cols-3">
        {firstThree.map((service, id) => (
          <motion.div
            key={id}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: easeInOut, delay: id * 0.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="w-full flex-col justify-center gap-5 relative service-shadow"
          >
            <div className="flex justify-center items-center relative">
              <div className="absolute w-full h-full inset-0 bg-black/25"></div>
              <img
                src={service.image}
                alt={service.description}
                className="w-full aspect-square object-cover md:min-w-xs"
              />
              <h3 className="text-5xl text-white font-bold absolute bottom-4 left-4">
                {service.name}
              </h3>
              <div className="w-full absolute flex justify-end items-center top-4 right-4">
                <h2 className="text-3xl p-2 bg-gold-section text-black font-bold text-pretty ">
                  {service.price.toLocaleString("co-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </h2>
              </div>
            </div>
            <div className="mt-3 p-4">
              <p className="text-2xl text-gray-500">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center">
        <Link to="/services" className="inline-flex rounded-full">
          <button className="rounded-full text-3xl py-4 px-10 md:py-6 md:px-15 bg-gold-section font-semibold text-white button-shadow cursor-pointer hover:bg-white hover:text-black transition-all duration-200 border-2">
            Ver Todos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServicesShort;
