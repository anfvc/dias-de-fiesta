import { Variants } from "framer-motion";

const usePageAnimation = () => {
  const motionProps: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

  return motionProps;
};

export default usePageAnimation;
