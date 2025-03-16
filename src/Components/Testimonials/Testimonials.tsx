import testimonials from "./testimonials.ts";
import Testimony from "./Testimony.tsx";

const Testimonials = () => {
  return (
    <div className=" border mt-20">
      <h3 className="text-3xl underline">Testimonios</h3>
      <h2 className="text-5xl pt-6">
        Lo que nuestros clientes dicen de nosotros
      </h2>
      <div className="carrousel flex flex-col md:flex-row justify-center gap-8 my-15">
        {testimonials.map((testimonial, index) => (
          <Testimony
            key={index}
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
