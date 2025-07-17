import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DOMPurify from "dompurify";

const TwoColumnText = ({ data }) => {
  return (
    <>
      <div className="about-content pt-lg-28 pt-13 pb-13 pb-lg-25">
        <Container>
          <Row>
            <Col lg="6" className="mb-7 mb-lg-0">
              <div className="pr-xl-13">
                {data.lefttext && (
                  <div
                    dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(data.lefttext)}}
                    className="rte-block"
                  />
                )}
              </div>
            </Col>
            <Col lg="6">
              <div className="pr-xl-13">
                {data.righttext && (
                  <div
                    dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(data.righttext)}}
                    className="rte-block"
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TwoColumnText;
