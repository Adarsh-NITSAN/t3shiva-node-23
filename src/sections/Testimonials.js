import React from "react";
import TestimonialSolo from "../components/Testimonials/TestimonialSolo";
import TestimonialBanner from "../components/Testimonials/TestimonialBanner";
import TestimonialDefault from "../components/Testimonials/TestimonialDefault";
import TestimonialLists from "../components/Testimonials/TestimonialLists";
import TestimonialWithCompany from "../components/Testimonials/TestimonialWithCompany";
import TestimonialGrid from "../components/Testimonials/TestimonialGrid";

const Testimonials = ({ data }) => {
  const renderTestimonials = (data) => {
    switch (data.style) {
      case "testimonial-1":
        return <TestimonialDefault data={data} />;
      case "testimonial-2":
        return <TestimonialSolo data={data} />;
      case "testimonial-3":
        return <TestimonialBanner data={data} />;
      case "testimonial-4":
        return <TestimonialLists data={data} />;
      case "testimonial-5":
        return <TestimonialGrid data={data} />;
      case "testimonial-6":
        return <TestimonialWithCompany data={data} />;
      default:
        return <></>;
    }
  };

  return <>{renderTestimonials(data)}</>;
};

export default Testimonials;
