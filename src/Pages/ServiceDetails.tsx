import { useParams } from "react-router"

const ServiceDetails = () => {

  const { id } = useParams()

  console.log(id);
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
    <div>ServiceDetails</div>
  )
}

export default ServiceDetails
