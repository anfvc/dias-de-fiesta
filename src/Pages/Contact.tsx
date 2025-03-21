import Form from "@/components/Form";

const Contact = () => {
  //? To reset my successMessage after some time:

  // console.log(formData.message);

  return (
    <section id="contact" className="w-full my-10 pt-[84.16px] md:pt-[92.19px]">
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
          aspernatur
        </div>
        <Form />
      </div>
    </section>
  );
};

export default Contact;
