import Form from "../Components/Form";

const Contact = () => {
  //? To reset my successMessage after some time:

  // console.log(formData.message);

  return (
    <section
      id="contact"
      className="w-full h-full my-10"
    >
      <div className="w-full h-full flex flex-col justify-start gap-8 mx-auto items-center px-4">
        <div className="w-full text-center">
          <h2>Contact</h2>
        </div>
        <div className="w-fit border">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
          repellat! Eius laboriosam modi est laborum, sit accusamus mollitia.
          Consectetur ad nemo officiis distinctio beatae optio atque asperiores
          itaque, voluptas modi? Quam ipsum deleniti laborum, quia odio quos
          voluptatum quibusdam quis consequuntur nulla officia doloremque
          aspernatur architecto tenetur ratione dignissimos ab quod nihil eum
          deserunt fugit ut similique perspiciatis? Quibusdam, adipisci?
          Blanditiis, tenetur. Quidem cumque veritatis, tempore porro fugit,
          dolorum expedita ea quas atque minus sapiente repellat perferendis
          vero repellendus velit id excepturi labore tempora ipsum debitis, non
          possimus delectus neque. Similique voluptas sunt ratione consequatur?
          Incidunt consequatur perferendis, possimus, quia inventore enim
          praesentium, quaerat vitae dolorum obcaecati quas. In ipsam voluptatem
          harum! Voluptates
        </div>
        <Form />
      </div>
    </section>
  );
};

export default Contact;
