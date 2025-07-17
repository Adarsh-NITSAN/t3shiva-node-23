"use client";
import React from "react";
import GoogleMapReact from "google-map-react";
import { Row, Col, Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DefaultMap from "@/components/Map/DefaultMap";
import IframeMap from "@/components/Map/IframeMap";

const LocationPin = () => {
  return (
    <div className="pin">
      <LazyLoadImage
        alt="Pin"
        src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png"
        className="pin-icon"
      />
    </div>
  );
};

const Map = ({ data }) => {
  if (!data || !Object.values(data).length) {
    return <>No Data Found!</>;
  }

  const style = data.style;

  switch (style) {
    case "default":
      return <DefaultMap data={data} />;
    case "map-iframe":
      return <IframeMap data={data} />;
    default:
      return <></>;
  }
};

export default Map;
