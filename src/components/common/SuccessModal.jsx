/* eslint-disable no-unused-vars */
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

const SuccessModal = ({ isOpen, onClose, data }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative z-50 bg-zinc-900 text-light rounded-xl p-6 w-[90%] max-w-lg shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-light hover:text-red-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold">Subscription Successful</h3>
            </div>

            <p className="text-sm text-zinc-400 mb-4">{data?.message || "Success!"}</p>

            <div className="text-sm space-y-1 max-h-60 overflow-y-auto pr-2">
              <p><strong>Name:</strong> {data.data?.name}</p>
              <p><strong>Phone:</strong> {data.data?.phoneNumber}</p>
              <p><strong>Plan Type:</strong> {data.data?.planType}</p>
              <p><strong>Meal Types:</strong> {data.data?.mealTypes}</p>
              <p><strong>Delivery Days:</strong> {data.data?.deliveryDays}</p>
              <p><strong>Allergies:</strong> {data.data?.allergies || "-"}</p>
              <p><strong>Total Price:</strong> Rp {Number(data.data?.totalPrice).toLocaleString()}</p>
              <p><strong>Status:</strong> {data.data?.status}</p>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 py-2 rounded-full transition"
            >
              Close
            </button>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
