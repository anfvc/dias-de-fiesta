import Socials from "@/components/Socials";
import Form from "@/components/Form";
import FAQ from "@/components/FAQ";
import Confetti from "@/components/Confetti";
import { useState } from "react";

type urlProps = {
  url: string;
};

const Contact = ({ url }: urlProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <section
      id="contact"
      className="w-full pt-[84.16px] md:pt-[92.19px] max-w-[1500px] mx-auto relative"
    >
      <div className="w-full h-full flex flex-col md:flex-row gap-15 items-center px-4 my-30  ">
        <div className="w-full flex flex-col text-left gap-20 ">
          <div className="">
            <h2 className="text-3xl text-gold-section font-bold underline">
              Contáctanos
            </h2>
            <h3 className="text-5xl md:text-6xl xl:text-8xl pt-2 font-bold text-pretty">
              Queremos ser parte de tu celebración!
            </h3>
          </div>
          <div className="w-fit text-2xl md:text-4xl my-5 leading-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
            repellat! Eius laboriosam modi est laborum, sit accusamus mollitia.
            Consectetur ad nemo officiis distinctio beatae optio atque
            asperiores itaque, voluptas modi? Quam ipsum deleniti laborum, quia
            odio quos voluptatum quibusdam quis consequuntur nulla officia
            doloremque aspernatur
          </div>
          <div className="w-full flex flex-col gap-5 text-4xl ">
            <h4 className="text-4xl text-gold-section font-bold">Síguenos</h4>
            <Socials url={url} />
          </div>
        </div>
        <Form setIsVisible={setIsVisible} />
      </div>
      <div>{isVisible && <Confetti />}</div>
      <FAQ />
    </section>
  );
};

export default Contact;
