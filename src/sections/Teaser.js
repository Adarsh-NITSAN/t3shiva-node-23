import React from "react";
import TeaserOne from "../components/Teasers/TeaserOne";
import TeaserTwo from "../components/Teasers/TeaserTwo";
import TeaserThree from "../components/Teasers/TeaserThree";
import TeaserFour from "../components/Teasers/TeaserFour";

const Teaser = ({ data }) => {
  if (!data || !Object.values(data).length) {
    return <>No Data Found!</>;
  }

  const style = data.style;

  switch (style) {
    case "teaser-1":
      return <TeaserOne data={data} />;
    case "teaser-2":
      return <TeaserTwo data={data} />;
    case "teaser-3":
      return <TeaserThree data={data} />;
    case "teaser-4":
      return <TeaserFour data={data} />;
    default:
      return <></>;
  }
};

export default Teaser;
