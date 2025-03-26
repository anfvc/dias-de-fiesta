import { TESTIMONIALS } from "@/consts/testimonials.ts";
import Testimony from "@/components/Testimonials/Testimony";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperButtons from "../SwiperButtons";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 2 } }}
      viewport={{ once: true }}
      className="w-full px-6"
    >
      <div className="my-30">
        <h3 className="text-3xl underline text-gold-section font-bold">
          Testimonios
        </h3>
        <h2 className="text-5xl pt-6 font-bold">
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
          {TESTIMONIALS.map((testimonial, id) => (
            <SwiperSlide key={id} className="p-2">
              <Testimony
                name={testimonial.name}
                message={testimonial.message}
                rating={testimonial.rating}
                date={testimonial.date}
              />
            </SwiperSlide>
          ))}
          <SwiperButtons />
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Testimonials;
