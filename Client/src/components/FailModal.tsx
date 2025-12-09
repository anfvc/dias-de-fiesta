import { motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

type FailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string
};

const FailModal = ({ isOpen, onClose, message }: FailModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="relative bg-white p-10 md:p-16 rounded-3xl shadow-2xl max-w-lg w-full text-center border-t-8 border-red-500"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Cerrar"
        >
          <X size={32} />
        </button>

        <AlertTriangle className="w-24 h-24 mx-auto mb-6 text-red-500" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Error de Envío
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 font-medium">
          {message}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FailModal;
