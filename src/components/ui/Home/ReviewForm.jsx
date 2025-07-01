import React, { useState } from "react";
import { Star, Send, MessageCircle, User, Award } from "lucide-react";
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
  const [hoveredRating, setHoveredRating] = useState(0);

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

  const getRatingText = (rating) => {
    const texts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };
    return texts[rating] || "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-ping"></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-indigo-400 rounded-full opacity-30 animate-bounce"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-[1.02]"
        >
          <div className="text-center mb-8 relative">
            <h2 className="text-4xl font-bold  bg-clip-text text-accent mb-2">
              Share Your Experience
            </h2>
          </div>

          <div className="mb-6 group">
            <label className="flex items-center gap-2 text-white font-medium mb-3 group-focus-within:text-purple-300 transition-colors">
              <User className="w-4 h-4" />
              Your Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-sm focus:bg-white/10 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
                placeholder="Enter your name"
                required
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
          <div className="mb-6 group">
            <label className="flex items-center gap-2 text-white font-medium mb-3 group-focus-within:text-purple-300 transition-colors">
              <MessageCircle className="w-4 h-4" />
              Your Message
            </label>
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-sm focus:bg-white/10 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 resize-none"
                rows={4}
                placeholder="Tell us about your amazing experience..."
                required
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
          <div className="mb-8">
            <label className="flex items-center gap-2 text-white font-medium mb-4">
              <Star className="w-4 h-4" />
              Rate Your Experience
            </label>
            <div className="flex items-center justify-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-125 ${
                    star <= (hoveredRating || formData.rating)
                      ? "text-yellow-400 fill-yellow-400 drop-shadow-lg"
                      : "text-white/30 hover:text-white/60"
                  }`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
              {(hoveredRating || formData.rating) > 0 && (
                <p className="text-center text-purple-300 font-medium animate-fade-in">
                  {getRatingText(hoveredRating || formData.rating)}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 bg-accent rounded-lg flex items-center justify-center gap-2 group"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Share Your Story
              </>
            )}
          </button>

          {success && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl backdrop-blur-sm animate-fade-in">
              <p className="text-green-300 text-center font-medium flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Thank you for sharing your wonderful experience! 🎉
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-sm animate-fade-in">
              <p className="text-red-300 text-center font-medium">{errorMsg}</p>
            </div>
          )}
        </form>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReviewForm;
