import React from "react";
import { useMealPlans } from "../../../hooks/useMealPlans";
import MealPlanCard from "../../common/MealPlanCard";

const MealPlanList = () => {
  const { mealPlans } = useMealPlans();

  return (
    <section className="h-screen">
      <h1 className="text-2xl font-bold mb-4">Meal Plans</h1>
      <p className="mb-8 text-justify text-md opacity-70">
        Our Meal Plans are thoughtfully curated to offer balanced, nutritious,
        and delicious meals tailored to a variety of lifestyle needs. Whether
        you're aiming to maintain a healthy diet, build muscle, or simply enjoy
        premium dining at home, each plan is crafted with fresh ingredients,
        precise portions, and culinary care — making mealtime simple,
        convenient, and satisfying.
      </p>
      <div className="mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {mealPlans.map((plan) => (
            <MealPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MealPlanList;
