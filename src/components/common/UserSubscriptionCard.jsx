import React from "react";

const UserSubscriptionCard = ({ subscription }) => {
  const {
    planType,
    totalPrice,
    status,
    mealTypes,
    deliveryDays,
    createdAt,
  } = subscription;

  const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md text-white space-y-2">
      <h3 className="text-lg font-bold text-blue-100">
        Subscription Summary
      </h3>
      <div className="flex flex-col gap-1 text-sm">
        <p>
          <span className="font-semibold">Plan:</span> {planType}
        </p>
        <p>
          <span className="font-semibold">Total:</span>{" "}
          Rp {totalPrice.toLocaleString("id-ID")}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
              status === "ACTIVE"
                ? "bg-green-500/20 text-green-300"
                : "bg-yellow-500/20 text-yellow-300"
            }`}
          >
            {status}
          </span>
        </p>
        <p>
          <span className="font-semibold">Meals:</span>{" "}
          {mealTypes.split(",").length} types
        </p>
        <p>
          <span className="font-semibold">Deliveries:</span>{" "}
          {deliveryDays.split(",").length} days/week
        </p>
        <p>
          <span className="font-semibold">Subscribed at:</span> {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default UserSubscriptionCard;
