import { useParams } from "react-router";
import FAQ from "@/components/FAQ";
import { useContext } from "react";
import AdminContext from "@/context/AdminContext";

const ServiceDetails = () => {
  const { events } = useContext(AdminContext);
  const { id } = useParams<{ id: string }>();
  const service = events.find((service) => service._id === id);

  if (!service) {
    return <div>Service not found</div>;
  }

  const image = service.image;

  return (
    <section>
      <div
        className={`w-full h-[650px] relative md:h-[700px] lg:h-[800px] bg-gold-section`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div
          className={`w-full h-full pt-[84.16px]  md:pt-[92.19px] max-w-[1500px] mx-auto relative`}
        >
          <div className="w-full h-full flex flex-col gap-10 justify-center items-center absolute md:bottom-0 text-white">
            <h2 className="text-7xl font-bold">{service.title}</h2>
            <ul className="flex flex-col items-center justify-center p-10 gap-10">
              <li>{service.description}</li>
              <li className="font-bold text-4xl">Desde {service.price} COP</li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" max-w-[1500px] mx-auto py-20">
        <FAQ />
      </div>
    </section>
  );
};

export default ServiceDetails;
