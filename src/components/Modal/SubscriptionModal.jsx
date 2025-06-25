/* eslint-disable no-unused-vars */
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useSubscription } from "../../hooks/useSubscription";
import SuccessModal from "../common/SuccessModal";

const SubscriptionModal = ({ isOpen, onClose }) => {
  const { submitSubscription, loading, error } = useSubscription();
  const [successData, setSuccessData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    planType: "",
    mealTypes: [],
    deliveryDays: [],
    allergies: "",
  });

  const daysList = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
  const mealOptions = ["BREAKFAST", "LUNCH", "DINNER"];

  const toggleField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitSubscription(form);
    if (result.success) {
      setSuccessData(result);
      setShowSuccess(true);
      onClose();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative z-50 bg-zinc-900 rounded-xl p-6 w-[90%] max-w-md shadow-xl text-light"
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-light hover:text-red-400"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-semibold mb-4">Subscription Form</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-light"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-light"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, phoneNumber: e.target.value })
                  }
                />

                <select
                  required
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-light"
                  value={form.planType}
                  onChange={(e) =>
                    setForm({ ...form, planType: e.target.value })
                  }
                >
                  <option value="">Select Plan</option>
                  <option value="DIET">Diet</option>
                  <option value="ROYALE">Royale</option>
                  <option value="PROTEIN">Protein</option>
                </select>

                <div>
                  <label className="block mb-1 text-sm">Meal Types</label>
                  <div className="grid grid-cols-3 gap-2">
                    {mealOptions.map((type) => (
                      <label key={type} className="text-sm">
                        <input
                          type="checkbox"
                          checked={form.mealTypes.includes(type)}
                          onChange={() => toggleField("mealTypes", type)}
                        />{" "}
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm">Delivery Days</label>
                  <div className="grid grid-cols-3 gap-2">
                    {daysList.map((day) => (
                      <label key={day} className="text-sm">
                        <input
                          type="checkbox"
                          checked={form.deliveryDays.includes(day)}
                          onChange={() => toggleField("deliveryDays", day)}
                        />{" "}
                        {day}
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Allergies (optional)"
                  rows={3}
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-light"
                  value={form.allergies}
                  onChange={(e) =>
                    setForm({ ...form, allergies: e.target.value })
                  }
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-full text-light"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        data={successData}
      />
    </>
  );
};

export default SubscriptionModal;
