import React from "react";
import GoogleMapReact from "google-map-react";
import { Row, Col, Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

const DefaultMap = ({ data }) => {
  const mapAPI = data.api;
  let locationLat = data.latitude;
  let locationLng = data.longitude;

  const location = {
    lat: parseFloat(locationLat),
    lng: parseFloat(locationLng),
  };
  return (
    <>
      <div className="pb-5 pb-md-25 pt-5 bg-default-2">
        <Container>
          <Row className="justify-content-center pt-5">
            <Col xs="12">
              <div className="map-wrap">
                <GoogleMapReact
                  bootstrapURLKeys={{ key: mapAPI }}
                  defaultCenter={location}
                  defaultZoom={17}
                  className="fluid-map-height w-100"
                >
                  <LocationPin lat={locationLat} lng={locationLng} />
                </GoogleMapReact>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DefaultMap;
