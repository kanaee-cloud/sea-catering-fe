/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { planOptions, mealOptions } from "./constants";

const PlanSelectionStep = ({ form, setForm }) => {
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
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          Choose Your Plan
        </label>
        <div className="grid gap-3">
          {planOptions.map((plan) => (
            <motion.label
              key={plan.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                form.planType === plan.value
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-zinc-700 bg-zinc-800/30 hover:border-zinc-600'
              }`}
            >
              <input
                type="radio"
                name="planType"
                value={plan.value}
                checked={form.planType === plan.value}
                onChange={(e) => setForm({ ...form, planType: e.target.value })}
                className="sr-only"
              />
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{plan.icon}</span>
                <div>
                  <div className="font-medium text-white">{plan.label}</div>
                  <div className="text-sm text-zinc-400">{plan.description}</div>
                </div>
              </div>
            </motion.label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          Meal Types
        </label>
        <div className="grid grid-cols-3 gap-3">
          {mealOptions.map((meal) => (
            <motion.label
              key={meal.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                form.mealTypes.includes(meal.value)
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-zinc-700 bg-zinc-800/30 hover:border-zinc-600'
              }`}
            >
              <input
                type="checkbox"
                checked={form.mealTypes.includes(meal.value)}
                onChange={() => toggleField("mealTypes", meal.value)}
                className="sr-only"
              />
              <span className="text-2xl mb-1">{meal.icon}</span>
              <span className="text-xs text-zinc-300">{meal.label}</span>
            </motion.label>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PlanSelectionStep;