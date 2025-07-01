import React, { useState } from "react";
import { Heart } from "lucide-react";
import Modal from "../Modal/Modal";

const MealPlanCard = ({ plan, isLoading }) => {
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full max-w-xs glassmorphism rounded-3xl shadow-md overflow-hidden flex flex-col animate-pulse">
        <div className="p-4 flex flex-col flex-grow space-y-4">
          <div className="w-full h-44 bg-gray-300 dark:bg-gray-700 rounded-xl" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
          <div className="flex justify-between mt-2">
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4" />
          </div>
        </div>
        <div className="px-4 pb-4 flex items-center justify-between gap-2">
          <div className="h-9 bg-gray-300 dark:bg-gray-600 rounded-full w-full" />
          <div className="h-9 w-9 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-xs glassmorphism rounded-3xl shadow-md overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105">
        <div className="p-4 flex flex-col flex-grow space-y-4">
          <img
            src={plan.imageUrl}
            alt={plan.name}
            className="w-full h-44 object-cover rounded-xl"
          />
          <h2 className="text-lg font-semibold text-light">{plan.name}</h2>
          <div className="flex items-center justify-between text-sm mt-3 text-accent">
            <span className="font-bold">
              Rp {Number(plan.price).toLocaleString()}
            </span>
            <span className="uppercase">MPN</span>
          </div>
        </div>
        <div className="px-4 pb-4 flex items-center justify-between gap-2">
          <button
            onClick={() => setOpen(true)}
            className="w-full bg-primary text-white py-2 rounded-full font-medium"
          >
            See More Details
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Heart className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={plan.name}
        image={plan.imageUrl}
        price={`Rp ${Number(plan.price).toLocaleString()}`}
        description={plan.description || "Tidak ada deskripsi tersedia"}
      />
    </>
  );
};

export default MealPlanCard;
