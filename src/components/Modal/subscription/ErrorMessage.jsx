/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
    >
      <p className="text-red-400 text-sm flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    </motion.div>
  );
};

export default ErrorMessage;
