"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TeaserOne = ({ data }) => {
  let backgroundColor = ["green", "blue", "red"];

  const renderCols = (lists) => {
    if (!lists.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return lists.map((list, id) => {
      let imageURL = list
        ? process.env.NEXT_PUBLIC_API_URL +
          process.env.NEXT_PUBLIC_TYPO3_MEDIA +
          list.image
        : "";
      let bgColor;
      if (id % 3 === 0) {
        bgColor = backgroundColor[0];
      } else if (id % 3 === 1) {
        bgColor = backgroundColor[1];
      } else {
        bgColor = backgroundColor[2];
      }
      return (
        <Col
          md="6"
          lg="4"
          className="mb-9"
          data-aos="fade-up"
          data-aos-duration="750"
          key={id}
        >
          <div className="service-card-section  dark-mode-texts h-100 mb-11 ">
            <LazyLoadImage
              effect="blur"
              src={imageURL}
              alt={"teaser image"}
              title={list.headline}
              width={"354"}
              height={"214"}
              className="w-100 card-image"
            />
            <div className="service-card">
              {list.headline && (
                <h3 className="text-black heading-text-6 mb-6">
                  {list.headline}
                </h3>
              )}
              {list.subheadline && (
                <p className="heading-text-9 text-black mb-11">
                  {list.subheadline}
                </p>
              )}
              {list.buttonlink && (
                <Link
                  href={`${list.buttonlink}`}
                  className={`heading-text-9 bg-${bgColor} btn text-white fw-normal`}
                >
                  {list.buttontext}
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
      <div className="service-section bg-default-4 pt-20 pt-lg-30 pb-13 py-lg-22">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <div className="section-title text-center mb-11 mb-lg-19 px-lg-3">
                {data.headline && (
                  <p className="pre-title primary heading-text-12 text-uppercase mb-7 fw-bold">
                    {data.headline}
                  </p>
                )}
                {data.subheadline && (
                  <h2 className="title heading-text-4">{data.subheadline} </h2>
                )}
              </div>
            </Col>
          </Row>
          <Row className="position-relative gr-z-index-1 justify-content-center">
            {data.list && renderCols(Object.values(data.list))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TeaserOne;
