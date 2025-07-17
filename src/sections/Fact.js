import React from "react";
import FactDefault from "../components/Facts/FactDefault";
import FactSecondary from "../components/Facts/FactSecondary";
import FactDetailed from "../components/Facts/FactDetailed";

const Fact = ({ data }) => {
  if (!data) {
    return <>No data found!</>;
  }

  switch (data.style) {
    case "counter-1":
      return <FactDefault data={data} />;
    case "counter-2":
      return <FactSecondary data={data} />;
    case "counter-3":
      return <FactDetailed data={data} />;
    default:
      return <></>;
  }
};

export default Fact;
