import React from "react";
import { Container } from "react-bootstrap";

const IframeMap = ({ data }) => {
  return (
    <div className="pb-5 pb-md-25 pt-5 bg-default-2">
      <Container>
        <div className="map-section">
          <div
            className="embed-responsive embed-responsive-21by9"
            data-aos={data.selectAnimation && data.selectAnimation}
          >
            <iframe
              src={`${data?.iframeUrl}`}
              className="embed-responsive-item"
              width={"100%"}
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default IframeMap;
