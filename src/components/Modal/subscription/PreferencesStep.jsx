/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { daysList } from "./constants";

const PreferencesStep = ({ form, setForm }) => {
  const toggleField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          Delivery Days
        </label>
        <div className="grid grid-cols-4 gap-2">
          {daysList.map((day) => (
            <motion.label
              key={day.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                form.deliveryDays.includes(day.value)
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-zinc-700 bg-zinc-800/30 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <input
                type="checkbox"
                checked={form.deliveryDays.includes(day.value)}
                onChange={() => toggleField("deliveryDays", day.value)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{day.label}</span>
            </motion.label>
          ))}
        </div>
      </div>

      <div className="relative">
        <AlertCircle className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
        <textarea
          placeholder="Any allergies or dietary restrictions? (optional)"
          rows={4}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
          value={form.allergies}
          onChange={(e) => setForm({ ...form, allergies: e.target.value })}
        />
      </div>
    </motion.div>
  );
};

export default PreferencesStep;