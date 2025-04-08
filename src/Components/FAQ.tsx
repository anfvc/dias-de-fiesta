import { FAQs } from "@/consts/faqs";
import Accordion from "@/components/Accordion";

const FAQ = () => {
  return (
    <div className="my-30 p-4">
      <div className="mb-20">
        <h3 className="my-5 text-3xl text-gold-section font-bold underline">
          FAQ
        </h3>
        <h2 className="text-5xl pt-2 font-bold text-pretty">
          Preguntas Frecuentes
        </h2>
      </div>
      {FAQs.map((faq, id) => (
        <Accordion key={id} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQ;
