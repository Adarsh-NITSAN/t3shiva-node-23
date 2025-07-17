import React from "react";
import { cta } from "../utils/constants";
import CTADefault from "../components/CTA/CTADefault";
import CTAGetStarted from "../components/CTA/CTAGetStarted";
import CTAStartShopping from "../components/CTA/CTAStartShopping";
import CTASecondary from "../components/CTA/CTASecondary";
import CTANewOffer from "../components/CTA/CTANewOffer";
// import CTA4 from "../components/CTA/CTA4";

const CTA = ({ data }) => {
  if (!data || !Object.values(data).length) {
    return <>No Data Found!</>;
  }

  switch (data.style) {
    case cta.defaultLight:
    case cta.defaultDark:
      return <CTADefault data={data} />;
    case cta.getStarted:
      return <CTAGetStarted data={data} />;
    case cta.newOffer:
      return <CTANewOffer data={data} />;
    case cta.startShopping:
      return <CTAStartShopping data={data} />;
    case cta.secondary:
      return <CTASecondary data={data} />;
    default:
      return <CTADefault data={data} />;
  }
};

export default CTA;
