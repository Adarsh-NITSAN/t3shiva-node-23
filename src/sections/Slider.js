import React from "react";
import SliderFullWidth from "../components/Sliders/SliderFullWidth";
import SliderContained from "../components/Sliders/SliderContained";

const Slider = ({ data }) => {
  if (!data) {
    return <>No Data Found!</>;
  }

  const check = parseInt(data.pi_flexform_content.check);

  switch (check) {
    case 1:
      return <SliderFullWidth data={data} />;
    default:
      return <SliderContained data={data} />;
  }
};

export default Slider;
