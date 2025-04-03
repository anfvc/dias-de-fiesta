import { SERVICES } from "@/consts/services";
import { motion, easeInOut } from "framer-motion";
import serviceHeadingImg from "@/assets/services/serviceHeadImg.webp";
import { Link } from "react-router";

const Services = () => {
  return (
    <section
      className="w-full pt-[84.16px] md:pt-[92.19px] max-w-[1500px] mx-auto"
      id="services"
    >
      <div className=" mx-auto my-30 px-8 2xl:px-0">
        <div className="w-full flex flex-col lg:flex-row-reverse md:items-center gap-10 bg-gold-section rounded-4xl mx-auto p-15 md:p-20 xl:pb-0">
          <div className="w-full lg:w-1/2 flex justify-center items-center mt-10">
            <img
              src={serviceHeadingImg}
              alt="service heading image"
              className="aspect-auto object-cover rounded-3xl xl:rounded-bl-none xl:rounded-br-none w-full md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]"
            />
          </div>
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "tween", ease: easeInOut }}
            className="w-full h-auto lg:w-1/2 flex flex-col items-start gap-4 text-white mt-6 xl:mt-0 text-balance"
          >
            <h2 className="text-start text-5xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6">
              Nuestros Servicios
            </h2>
            <p className="mb-10 md:text-4xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              obcaecati quae voluptatem perferendis corrupti laudantium quod
              placeat debitis molestias nemo!
            </p>
            <Link to="/contact" className="w-md sm:w-lg mb-10">
              <button className="w-md sm:w-lg border-3 md:border-3 text-3xl border-white rounded-full p-8  md:p-7 md:text-4xl cursor-pointer">
                Escríbenos
              </button>
            </Link>
            <blockquote className="md:text-4xl block border-4 border-t-0 border-b-0 border-r-0 pl-10 py-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              perferendis consequuntur quis laborum libero, totam, in vel
              doloribus.
            </blockquote>
          </motion.div>
        </div>
      </div>
      <div className="mb-40 px-4 lg:px-0">
        <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 lg:gap-10  lg:grid-cols-3">
          {SERVICES.map((service, id) => (
            <Link to={`/services/${service.id}`} key={id}>
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: easeInOut, delay: id * 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                className="p-4 rounded-lg service-shadow"
              >
                <div className="flex justify-center items-center relative">
                  <div className="absolute w-full h-full inset-0 bg-black/25"></div>
                  <img
                    src={service.image}
                    alt={service.description}
                    className="w-full aspect-square object-cover md:min-w-xs"
                  />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold absolute bottom-4 left-4 text-pretty">
                    {service.name}
                  </h3>
                  <div className="w-full absolute flex justify-end items-center top-2 right-2 md:top-4 md:right-4">
                    <h2 className="text-xl p-1 sm:text-2xl sm:p-2 md:text-3xl bg-gold-section text-black font-bold text-pretty ">
                      {service.price.toLocaleString("co-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </h2>
                  </div>
                </div>
                <div className="mt-3 p-1 sm:p-2">
                  <p className="text-xl md:text-2xl text-gray-500 text-clip">
                    {service.description}.
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
