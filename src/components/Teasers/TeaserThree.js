"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TeaserThree = ({ data }) => {
  const colors = ["primary", "tertiary", "secondary", "blackish-blue"];

  const renderCols = (lists) => {
    if (!lists.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return lists.map((list, id) => {
      let imageURL =
        list.image && list.image.length
          ? process.env.NEXT_PUBLIC_API_URL +
            process.env.NEXT_PUBLIC_TYPO3_MEDIA +
            list.image
          : "";

      let bgColor;
      if (id % 4 === 0) {
        bgColor = colors[0];
      } else if (id % 4 === 1) {
        bgColor = colors[1];
      } else if (id % 4 === 2) {
        bgColor = colors[2];
      } else {
        bgColor = colors[3];
      }
      return (
        <Col
          lg="6"
          md="10"
          key={list.headline}
          className="mb-11 mb-lg-19"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          <div className="d-flex align-items-start">
            {imageURL && (
              <div
                className={`widget-icon p-7 mr-9 bg-${bgColor}-opacity`} // bg-${colors[id]}
              >
                <LazyLoadImage
                  effect="blur"
                  src={imageURL}
                  alt={list.headline}
                  title={list.headline}
                />
              </div>
            )}
            <div className="widget-text">
              {list.headline && (
                <h3 className="title heading-text-7 mb-6">{list.headline}</h3>
              )}
              {list.subheadline && (
                <p className="heading-text-9 mb-0 pr-11">{list.subheadline}</p>
              )}
              {list.buttontext && list.buttonlink && (
                <Link
                  href={`${list.buttonlink}`}
                  className="btn btn-link with-icon fw-bold"
                >
                  <>
                    {list.buttontext}
                    <i className="icon icon-tail-right fw-bold"></i>
                  </>
                </Link>
              )}
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <>
      <div className="feature-section pt-14 pt-lg-25 pb-7 pb-lg-11 bg-default-2">
        <Container>
          <Row className="justify-content-center">
            <Col xl="6" lg="7" md="8">
              <div className="section-title text-center mb-13 mb-lg-23">
                {data["headline"] && (
                  <p className="pre-title heading-text-12 primary text-uppercase mb-7 fw-bold">
                    {data.headline}
                  </p>
                )}
                {data["subheadline"] && (
                  <h2 className="title heading-text-4">{data.subheadline}</h2>
                )}
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="10">
              <Row className="align-items-center justify-content-center">
                {data.list && renderCols(Object.values(data.list))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TeaserThree;
