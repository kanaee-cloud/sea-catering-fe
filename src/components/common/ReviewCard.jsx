import React from 'react'
import { getStarsArray } from '../../utils/getStarsArray'
import { Star } from 'lucide-react'

const ReviewCard = ({ testimonial }) => {
  return (
    <div
              key={testimonial.id}
              className="bg-primary max-w-sm p-4 rounded-lg shadow-md"
            >
              <p className="text-light font-semibold">{testimonial.name}</p>
              <h3 className="mt-2 text-light opacity-70">{testimonial.message}</h3>
              <div className="flex items-center mt-2 gap-1">
                {getStarsArray(testimonial.rating).map((type, index) => (
                  <Star
                    key={index}
                    size={18}
                    className={
                      type === "full"
                        ? "text-yellow-500 fill-yellow-500"
                        : type === "half"
                        ? "text-yellow-500 fill-yellow-500 opacity-50"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
  )
}

export default ReviewCard