import { FAQs } from "@/consts/faqs";
import { motion, easeInOut } from "framer-motion";
import Accordion from "@/components/Accordion";

const FAQ = () => {
  return (
    <div className="my-40 p-4">
      <motion.div
        className="flex flex-col md:flex-row gap-20"
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: easeInOut }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="w-md md:w-xl md:sticky md:top-20">
          <h3 className="mb-5 text-3xl text-gold-section font-bold underline">
            FAQ
          </h3>
          <h2 className="text-5xl md:text-6xl pt-2 font-bold leading-15 md:leading-20">
            Las Preguntas más Frecuentes
          </h2>
        </div>

        <div className="space-y-2">
          {FAQs.map((faq, id) => (
            <Accordion key={id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
