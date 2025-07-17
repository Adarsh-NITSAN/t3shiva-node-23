"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const CTAGetStarted = ({ data }) => {
  return (
    <>
      <div className="cta-section bg-green pt-12 pb-13 pt-md-15 pb-md-15 ">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col lg="10">
              <div
                className="cta-text d-flex flex-column flex-sm-row align-items-center justify-content-center"
                data-aos="fade-right"
                data-aos-duration="700"
              >
                {data.headline && (
                  <h2 className="text-white text-capitalize heading-text-5 mb-6 mb-sm-0 mr-sm-9 ">
                    {data.headline}
                  </h2>
                )}
                {data.buttontext && data.link && (
                  <div
                    data-aos="zoom-in"
                    data-aos-duration="700"
                    data-aos-delay="500"
                  >
                    <Link
                      href={`${data.link}`}
                      className="btn btn-white bg-white"
                    >
                      {data.buttontext}
                    </Link>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CTAGetStarted;
