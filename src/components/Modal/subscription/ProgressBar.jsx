/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-xs text-zinc-400">Personal Info</span>
        <span className="text-xs text-zinc-400">Plan Selection</span>
        <span className="text-xs text-zinc-400">Preferences</span>
      </div>
      <div className="w-full bg-zinc-700 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
          initial={{ width: "33%" }}
          animate={{ width: `${(currentStep / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;