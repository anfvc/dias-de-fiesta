import { useState } from "react";
import AccordionButton from "@/components/AccordionButton";

type AccordionProps = {
  question: string;
  answer: string;
};

const Accordion = ({ question, answer }: AccordionProps) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div className="">
      <button
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setAccordionOpen(!accordionOpen)}
      >
        <span className="text-4xl lg:text-5xl text-start font-semibold">{question}</span>
        <AccordionButton accordionOpen={accordionOpen} />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-600 ease-in-out text-slate-600 ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden text-3xl lg:text-4xl py-4 my-5">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
