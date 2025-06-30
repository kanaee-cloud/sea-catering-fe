import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const TestimonialTable = ({ testimonials, onDelete, isLoading }) => {
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    setLoadingId(id);
    await onDelete(id);
    setLoadingId(null);
  };

  if (isLoading) {
    return (
      <div className="overflow-x-auto bg-dark/50 rounded-lg mt-4 animate-pulse">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-dark">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Message</th>
              <th className="px-4 py-3 text-left font-semibold">Rating</th>
              <th className="px-4 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!testimonials?.length) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        No testimonials found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-dark/50 rounded-lg mt-4">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-dark">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Name</th>
            <th className="px-4 py-3 text-left font-semibold">Message</th>
            <th className="px-4 py-3 text-left font-semibold">Rating</th>
            <th className="px-4 py-3 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{t.name}</td>
              <td className="px-4 py-3">{t.message}</td>
              <td className="px-4 py-3">{t.rating} ⭐</td>
              <td className="px-4 py-3">
                <button
                  className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition text-red-600"
                  onClick={() => handleDelete(t.id)}
                  disabled={loadingId === t.id}
                >
                  {loadingId === t.id ? (
                    <span className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin inline-block" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialTable;
