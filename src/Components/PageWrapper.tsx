import usePageAnimation from "@/hooks/usePageAnimation";
import { motion } from "framer-motion";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const motionProps = usePageAnimation();
  return (
    <div>
      <motion.div {...motionProps}>{children}</motion.div>
    </div>
  );
};

export default PageWrapper;
