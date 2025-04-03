import { SERVICES } from "@/consts/services";
import { useParams } from "react-router";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  // const location = useLocation();

  const service = SERVICES.find((service) => service.id === id);

  if (!service) {
    return <div>Service not found</div>;
  }

  const image = service.image;

  console.log(image);

  return (
    <div
      className={`w-full h-[700px] bg-cover  bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        className={`w-full pt-[84.16px]  md:pt-[92.19px]  max-w-[1500px] mx-auto`}
      >
        {service.name}
        {service.description}
      </div>
    </div>
  );
};

export default ServiceDetails;
