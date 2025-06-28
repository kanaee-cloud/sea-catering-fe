/* eslint-disable no-unused-vars */
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useState } from "react";
import { useSubscription } from "../../../hooks/useSubscription";
import SuccessModal from "../../common/SuccessModal";
import ProgressBar from "./ProgressBar";
import PersonalInfoStep from "./PersonalInfoStep";
import PlanSelectionStep from "./PlanSelectionStep";
import PreferencesStep from "./PreferencesStep";
import NavigationButtons from "./NavigationButtons";
import ErrorMessage from "./ErrorMessage";

const SubscriptionModal = ({ isOpen, onClose }) => {
  const { submitSubscription, loading, error } = useSubscription();
  const [successData, setSuccessData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    planType: "",
    mealTypes: [],
    deliveryDays: [],
    allergies: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitSubscription(form);
    if (result.success) {
      setSuccessData(result);
      setShowSuccess(true);
      onClose();
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    if (currentStep === 1) return form.name && form.phoneNumber;
    if (currentStep === 2) return form.planType && form.mealTypes.length > 0;
    return form.deliveryDays.length > 0;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-50 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-zinc-700/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Subscribe Now</h3>
                    <p className="text-sm text-zinc-400">Step {currentStep} of 3</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProgressBar currentStep={currentStep} />

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <PersonalInfoStep form={form} setForm={setForm} />
                  )}
                  {currentStep === 2 && (
                    <PlanSelectionStep form={form} setForm={setForm} />
                  )}
                  {currentStep === 3 && (
                    <PreferencesStep form={form} setForm={setForm} />
                  )}
                </AnimatePresence>

                <ErrorMessage error={error} />

                <NavigationButtons
                  currentStep={currentStep}
                  loading={loading}
                  canProceed={canProceed()}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
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