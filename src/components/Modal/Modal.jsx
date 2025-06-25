/* eslint-disable no-unused-vars */
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  image,
  price,
  children,
  showCloseIcon = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className="fixed z-50 inset-0 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-50 bg-zinc-900 rounded-xl p-6 w-[90%] max-w-md shadow-xl"
          >
            {showCloseIcon && (
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5 bg-red-500 text-light" />
              </button>
            )}

            {image && (
              <img
                src={image}
                alt="modal"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            {title && (
              <h3 className="text-xl font-semibold mb-2 text-light">{title}</h3>
            )}

            {description && (
              <p className="text-sm text-light opacity-70 mb-4">
                {description}
              </p>
            )}
            {price && (
              <p className="text-lg font-bold text-accent mb-4">
                {price}
              </p>
            )}
            

            {children}
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
