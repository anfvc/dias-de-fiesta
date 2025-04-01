import { SERVICES } from "@/consts/services";
import { useParams } from "react-router";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();

  const service = SERVICES.find((service) => service.id === id);
  if (!service) {
    return (<div>Service not found</div>);
  }

  // const { name, description, image, price } = service;

  console.log(service);

  // Fetch the service details using the id
  // const service = SERVICES.find((service) => service.id === id)
  // if (!service) {
  //   return <div>Service not found</div>
  // }
  // const { name, description, image, price } = service
  // const priceFormatted = price.toLocaleString("co-CO", {
  //   style: "currency",
  //   currency: "COP",
  //   minimumFractionDigits: 0,

  return (
  <div className="pt-[84.16px] sm:pt-[92.19px] max-w-[1500px] mx-auto">ServiceDetails</div>)
};

export default ServiceDetails;
