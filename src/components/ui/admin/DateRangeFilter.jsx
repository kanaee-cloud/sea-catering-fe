import { Filter } from "lucide-react";
import React from "react";

const DateRangeFilter = ({ startDate, endDate, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex items-center sm:flex-row items-start sm:items-end gap-4"
    >
      <div className="flex flex-col">
        <label htmlFor="startDate" className="text-sm font-medium mb-1">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => onChange("startDate", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm glassmorphism bg-transparent"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="endDate" className="text-sm font-medium mb-1">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => onChange("endDate", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm glassmorphism bg-transparent"
        />
      </div>

      <button
        type="submit"
        className=" text-white bg-accent mt-6 rounded-lg px-4 py-2 text-sm hover:bg-gray-800 transition"
      >
        <Filter />
      </button>
    </form>
  );
};

export default DateRangeFilter;
