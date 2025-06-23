import { motion } from "framer-motion";
import { ChefHat, Salad, UtensilsCrossed, Apple, Leaf } from "lucide-react";

const specialists = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1556911220-e15b29be8c3f?w=80&h=80&fit=crop",
    style: "top-0 left-1/2 -translate-x-1/2",
  },
  {
    type: "icon",
    icon: ChefHat,
    style: "top-[20%] left-[70%]",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1613145993481-59bc2597e263?w=80&h=80&fit=crop",
    style: "top-[35%] left-[90%]",
  },
  {
    type: "icon",
    icon: Salad,
    style: "top-[60%] left-[85%]",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=80&h=80&fit=crop",
    style: "bottom-[20%] left-[80%]",
  },
  {
    type: "icon",
    icon: UtensilsCrossed,
    style: "bottom-[10%] left-[50%] -translate-x-1/2",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=80&h=80&fit=crop",
    style: "bottom-[25%] left-[15%]",
  },
  {
    type: "icon",
    icon: Leaf,
    style: "top-[45%] left-[5%]",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=80&h=80&fit=crop",
    style: "top-[15%] left-[20%]",
  },
];


const OrbitSpecialists = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center bg-gradient-to-br rounded-xl overflow-hidden">
      {/* Orbit Lingkaran */}
      <div className="absolute w-[400px] h-[400px] border border-white/10 rounded-full" />
      <div className="absolute w-[300px] h-[300px] border border-white/10 rounded-full" />
      <div className="absolute w-[200px] h-[200px] border border-white/10 rounded-full" />

      {/* Teks Tengah */}
      <div className="text-center text-white z-10">
        <h2 className="text-4xl font-semibold">5k+</h2>
        <p className="text-sm opacity-70">Customers Approved</p>
      </div>

      <div className="absolute w-full h-full animate-[spin_20s_linear_infinite]">
        {specialists.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.style} w-12 h-12 rounded-full flex items-center justify-center`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="rotate-reverse w-full h-full flex items-center justify-center">
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt=""
                  className="w-full h-full rounded-full border-2 border-white/30 shadow-lg object-cover"
                />
              ) : (
                <div className="w-full h-full glassmorphism rounded-full flex items-center justify-center shadow-lg">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrbitSpecialists;
