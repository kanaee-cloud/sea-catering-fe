/* eslint-disable no-unused-vars */
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

const SuccessModal = ({ isOpen, onClose, data }) => {
  const tableData = [
    { label: "Name", value: data?.data?.name },
    { label: "Phone", value: data?.data?.phoneNumber },
    { label: "Plan Type", value: data?.data?.planType },
    { label: "Meal Types", value: data?.data?.mealTypes },
    { label: "Delivery Days", value: data?.data?.deliveryDays },
    { label: "Allergies", value: data?.data?.allergies || "-" },
    { 
      label: "Total Price", 
      value: data?.data?.totalPrice ? `Rp ${Number(data.data.totalPrice).toLocaleString()}` : "-"
    },
    { label: "Status", value: data?.data?.status }
  ];

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
            className="relative z-50 bg-zinc-900 text-white rounded-xl p-6 w-[90%] max-w-lg shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold">Subscription Successful</h3>
            </div>

            <p className="text-sm text-zinc-400 mb-6">
              {data?.message || "Your subscription has been created successfully!"}
            </p>

            <div className="max-h-60 overflow-y-auto">
              <table className="w-full text-sm">
                <tbody>
                  {tableData.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-zinc-700 ${index === tableData.length - 1 ? 'border-b-0' : ''}`}
                    >
                      <td className="py-2 pr-4 text-zinc-400 font-medium whitespace-nowrap align-top">
                        {item.label}:
                      </td>
                      <td className="py-2 text-white break-words">
                        {item.value || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-medium"
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