import { Calendar, CircleDollarSign, Notebook, Utensils } from "lucide-react";
import { useMealPlans } from "../../../hooks/useMealPlans";

const SubscriptionInfo = () => {
  const { mealPlans } = useMealPlans();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Notebook className="opacity-70" />
          Choose Your Meal Plan
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {mealPlans.map((plan, i) => (
            <div
              key={i}
              className="glassmorphism p-6 rounded-xl shadow hover:shadow-lg transition ease-in-out transform hover:scale-105 flex flex-col items-center"
            >
              <h4 className="text-xl font-bold">{plan.name}</h4>
              <p className="text-indigo-600 text-lg font-semibold">
                Rp {Number(plan.price).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>


      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Utensils className="opacity-70"/>
          Choose The Type of Food
        </h3>
        <ul className="list-disc list-inside text-light opacity-70 space-y-2">
          <li>Breakfast</li>
          <li>Lunch</li>
          <li>Dinner</li>
        </ul>
        <p className="mt-2 text-sm text-red-500">
          *Minimum choose 1 type of food
        </p>
      </section>


      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="opacity-70"/>
            Choose Your Delivery Days
        </h3>
        <p className="text-light opacity-70">
         You are free to choose the delivery day of the week, starting from Monday to Sunday.
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CircleDollarSign className="opacity-70" />
            How to Calculate Prices
        </h3>
        <p className="text-light opacity-70 mb-2">
          <strong>
            Price Total = (Meal Plan Price) × (Food Type Total) × (Day Total) ×
            4.3
          </strong>
        </p>
        <p className="text-gray-600 italic">
          Example: Rp40.000 × 2 × 5 × 4.3 = Rp1.720.000
        </p>
      </section>

      <div className="text-center">
        <button className="bg-indigo-600 text-light px-6 py-3 rounded-full hover:bg-indigo-700 hover:scale-110 transition duration-300">
            Start Subscription
        </button>
      </div>
    </div>
  );
};

export default SubscriptionInfo;
