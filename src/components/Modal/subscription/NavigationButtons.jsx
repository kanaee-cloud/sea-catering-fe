/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const NavigationButtons = ({ currentStep, loading, canProceed, onNext, onPrev }) => {
  return (
    <div className="flex gap-3 pt-4">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 px-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl transition-all font-medium"
        >
          Previous
        </button>
      )}
      
      {currentStep < 3 ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 text-white rounded-xl transition-all font-medium disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      ) : (
        <button
          type="submit"
          disabled={loading || !canProceed}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-zinc-700 disabled:to-zinc-700 text-white rounded-xl transition-all font-medium disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Submitting...
            </span>
          ) : (
            "Complete Subscription"
          )}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;