/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { User, Phone } from "lucide-react";

const PersonalInfoStep = ({ form, setForm }) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="relative">
        <User className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Your Full Name"
          required
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        />
      </div>
    </motion.div>
  );
};

export default PersonalInfoStep;