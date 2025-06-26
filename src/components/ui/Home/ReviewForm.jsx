import React, { useState } from "react";
import { Star } from "lucide-react";
import { useTestimonials } from "../../../hooks/useTestimonials";

const ReviewForm = () => {
  const { postTestimonial } = useTestimonials();

  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStarClick = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccess(false);
    const result = await postTestimonial(formData);
    if (result.success) {
      setSuccess(true);
      setFormData({ name: "", message: "", rating: 0 });
    } else {
      setErrorMsg(result.message || "Failed to submit testimonial");
    }
    setSubmitting(false);
  };

  return (
    <section className="py-12 px-14 h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full  p-6 rounded-xl shadow space-y-4"
      >
        <div className=" font-bold text-center mb-8">
          <h2 className="text-2xl">Share Your Experience</h2>
          <p className="text-center opacity-70 mt-6">
            We value your feedback! Please share your experience with us
          </p>
        </div>
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md glassmorphism bg-transparent"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md glassmorphism bg-transparent"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer ${
                  star <= formData.rating
                    ? "text-accent fill-accent"
                    : "text-gray-400"
                }`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 mt-2 text-white font-semibold rounded-md transition"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>

        {success && (
          <p className="text-green-600 mt-2 text-sm text-center">
            Thanks for your testimonial!
          </p>
        )}
        {errorMsg && (
          <p className="text-red-600 mt-2 text-sm text-center">{errorMsg}</p>
        )}
      </form>
    </section>
  );
};

export default ReviewForm;
