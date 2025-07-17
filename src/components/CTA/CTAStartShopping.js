"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const CTAStartShopping = ({ data }) => {
  const images = (image) => {
    if (!image.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return image.map((img, id) => {
      return (
        process.env.NEXT_PUBLIC_API_URL +
        process.env.NEXT_PUBLIC_TYPO3_MEDIA +
        img.url
      );
    });
  };

  return (
    <>
      <div
        className="pt-13 pt-md-35 pb-13 pb-md-35 bg-image mx-md-6 rounded-10 shopping-cta"
        style={{
          backgroundImage: `url(${images(Object.values(data.image))})`,
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs="10" sm="10" md="9" lg="8" xl="7">
              <div className="text-center dark-mode-texts">
                {data.headline && (
                  <h2 className="heading-text-2 fw-bold pb-8 pb-md-12">
                    {data.headline}
                  </h2>
                )}
                {data.link && data.buttontext && (
                  <Link
                    href={`${data.link}`}
                    className="btn btn-green gr-hover-y"
                  >
                    {data.buttontext}
                  </Link>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CTAStartShopping;
