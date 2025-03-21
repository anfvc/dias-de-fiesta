import { TESTIMONIALS } from "@/consts/testimonials.ts";
import Testimony from "@/components/Testimonials/Testimony";

const Testimonials = () => {
  return (
    <div className=" border mt-20">
      <h3 className="text-4xl underline text-[#AA9A45] font-bold">Testimonios</h3>
      <h2 className="text-5xl pt-6 font-bold">
        Lo que nuestros clientes dicen de nosotros
      </h2>
      <div className="carrousel flex flex-col md:flex-row justify-center gap-8 my-15">
        {TESTIMONIALS.map((testimonial, id) => (
          <Testimony
            key={id}
            name={testimonial.name}
            message={testimonial.message}
            rating={testimonial.rating}
            date={testimonial.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
