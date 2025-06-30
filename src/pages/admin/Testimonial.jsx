import React from 'react'
import { useTestimonials } from '../../hooks/useTestimonials';
import TestimonialTable from '../../components/ui/admin/TestimonialTable';

const Testimonial = () => {

    const { testimonials, loading, deleteTestimonial } = useTestimonials();

  return (
     <section>
      <h1 className="text-2xl font-bold">User Testimonials</h1>
      <p className="text-sm opacity-70 mt-2">
        List of all user-submitted testimonials
      </p>

      <TestimonialTable
        testimonials={testimonials}
        onDelete={deleteTestimonial}
        isLoading={loading}
      />
    </section>
  )
}

export default Testimonial