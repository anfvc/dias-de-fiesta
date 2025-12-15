import Testimony from "@/components/Testimony";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperButtons from "@/components/SwiperButtons";
import { motion, easeInOut } from "framer-motion";
import { useContext, useEffect } from "react";
import PublicContext from "@/context/PublicContext";

const Testimonials = () => {
  const { testimonials, fetchTestimonials } = useContext(PublicContext);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="w-full px-6">
      <div className="my-30">
        <h3 className="text-3xl underline text-gold-section font-bold">
          Testimonios
        </h3>
        <h2 className="text-5xl pt-6 font-bold text-gray-800 text-pretty">
          Lo que nuestros clientes dicen de nosotros
        </h2>
        <Swiper
          className="w-full my-15"
          spaceBetween={15}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {testimonials.map((testimonial, id) => (
            <SwiperSlide key={id} className="p-5 items-stretch">
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: easeInOut, delay: id * 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                className="flex-1"
              >
                <Testimony
                  name={testimonial.name}
                  message={testimonial.message}
                  rating={testimonial.rating}
                  date={testimonial.date}
                />
              </motion.div>
            </SwiperSlide>
          ))}
          <SwiperButtons />
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
