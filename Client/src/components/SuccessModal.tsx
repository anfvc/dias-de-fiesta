import { motion } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

const SuccessModal = ({ isOpen, onClose, message }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose} // Close on backdrop click
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="relative bg-white p-10 md:p-16 rounded-3xl shadow-2xl max-w-lg w-full text-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X size={32} />
        </button>

        <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-500" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          ¡Mensaje Enviado!
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 font-medium">
          {message}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SuccessModal;
