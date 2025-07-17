import React from "react";
import Process1 from "../components/Process/Process1";
import Process2 from "../components/Process/Process2";
import Process3 from "../components/Process/Process3";
import TeaserFour from "../components/Teasers/TeaserFour";

const Process = ({ data }) => {
  if (!data || !Object.values(data).length) {
    return <>No Data Found!</>;
  }

  const style = data.style;

  switch (style) {
    case "process-1":
      return <Process1 data={data} />;
    case "process-2":
      return <Process2 data={data} />;
    case "process-3":
      return <Process3 data={data} />;
    default:
      return <></>;
  }
};

export default Process;
