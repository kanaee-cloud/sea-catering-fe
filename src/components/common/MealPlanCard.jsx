import { Heart } from "lucide-react"; // atau bisa ganti dengan icon library lain

const MealPlanCard = ({ plan }) => {
  return (
    <div className="w-full max-w-xs glassmorphism rounded-3xl shadow-md overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105">
      <div className="p-4 flex flex-col flex-grow space-y-4">
        <img
          src="https://i.pinimg.com/736x/34/d9/cb/34d9cb52666f373e3533a4359c659d4e.jpg"
          alt={plan.name}
          className="w-full h-44 object-cover rounded-xl"
        />
        <h2 className="text-lg font-semibold text-light">{plan.name}</h2>
        <p className="text-sm opacity-70 line-clamp-2">{plan.description}</p>

        <div className="flex items-center justify-between text-sm mt-3 text-accent">
          <span>
            <span className="font-bold">
              Rp {Number(plan.price).toLocaleString()}
            </span>
          </span>
          <span className="uppercase">MPN</span>{" "}
        </div>
      </div>

      <div className="px-4 pb-4 flex items-center justify-between gap-2">
        <button className="w-full bg-primary text-white py-2 rounded-full font-medium">
          See More Details
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Heart className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default MealPlanCard;
