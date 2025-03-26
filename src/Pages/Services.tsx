import { SERVICES } from "@/consts/services";
import { motion, easeInOut } from "framer-motion";

const Services = () => {
  return (
    <section className="w-full pt-[84.16px]  md:pt-[92.19px] max-w-[1500px] mx-auto">
      <div className="">
        <h2 className="text-4xl text-center font-bold mb-8">
          Nuestros servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, id) => (
            <motion.div
              key={id}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: easeInOut, delay: id * 0.2 }}
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-120 object-cover rounded-md"
              />
              <h3 className="text-2xl font-bold mt-4">{service.name}</h3>
              <p className="text-gray-500 mt-2">{service.description}</p>
              <p className="text-gray-500 mt-2">Precio: {service.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
