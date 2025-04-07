import { SERVICES } from "@/consts/services";
import { useParams } from "react-router";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((service) => service.id === id);

  if (!service) {
    return <div>Service not found</div>;
  }

  const image = service.image;

  return (
    <div
      className={`w-full h-[500px] relative`}
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
          <h2 className="text-7xl font-bold">{service.name}</h2>
          <ul className="flex flex-col items-center justify-center">
            <li>{service.description}</li>
            <li>Precio: {service.price}</li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
