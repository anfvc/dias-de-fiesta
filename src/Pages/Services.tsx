import { SERVICES } from "@/consts/services";
import { motion, easeInOut } from "framer-motion";

const Services = () => {
  return (
    <section
      className="w-full pt-[84.16px] md:pt-[92.19px] max-w-[1500px] mx-auto"
      id="services"
    >
      <div className="my-20 px-4 lg:px-0">
        <h2 className="text-4xl text-center font-bold mb-8">
          Nuestros servicios
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 lg:gap-10  lg:grid-cols-3">
          {SERVICES.map((service, id) => (
            <motion.div
              key={id}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: easeInOut, delay: id * 0.2 }}
              className="p-4 rounded-lg service-shadow"
            >
              <div className="flex justify-center items-center relative">
                <div className="absolute w-full h-full inset-0 bg-black/25"></div>
                <img
                  src={service.image}
                  alt={service.description}
                  className="w-full aspect-square object-cover md:min-w-xs"
                />
                <h3 className="text-3xl md:text-4xl text-white font-bold absolute bottom-4 left-4">
                  {service.name}
                </h3>
                <div className="w-full absolute flex justify-end items-center top-4 right-4">
                  <h2 className="text-3xl p-2 bg-gold-section text-black font-bold text-pretty ">
                    {service.price}
                  </h2>
                </div>
              </div>
              <div className="mt-3 p-4">
                <p className="text-xl md:text-3xl text-gray-500 text-clip">
                  {service.description.slice(0, 80)}.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
