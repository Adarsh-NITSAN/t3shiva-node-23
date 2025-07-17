"use client";

import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TestimonialBanner = ({ data }) => {
  const images = (image) => {
    if (!image.length) {
      return "";
    }
    return `${image[0].url}`;
  };

  let slider = Object.values(data?.list);
  console.log(slider);
  return (
    <>
      <div className="testimonial-section-bg position-relative bg-blue dark-mode-texts bg-pattern pattern-4  pt-14 pt-lg-26 pb-14 pb-lg-26">
        {data.image && Object.values(data.image).length ? (
          <div
            className="bg-overlay"
            style={{
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_API_URL +
                process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                images(Object.values(data.image))
              })`,
            }}
          ></div>
        ) : (
          <></>
        )}
        <Container>
          <Row className="justify-content-center">
            <Col md="8" lg="7" xl="6">
              <div className="text-center mb-9">
                {data.headline && (
                  <h4 className="heading-text-12 text-uppercase mb-0">
                    {data.headline}
                  </h4>
                )}
                {data.subheadline && (
                  <p className="heading-text-8 mb-0 px-lg-7 px-xl-0">
                    {data.subheadline}
                  </p>
                )}
              </div>
            </Col>
          </Row>
          <div className="testimonial-slider">
            <Carousel
              controls={slider.length === 1 ? false : true}
              indicators={slider.length === 1 ? false : true}
            >
              {Object.values(data?.list).map((item, index) => {
                return (
                  <Carousel.Item key={index}>
                    <div className="text-center w-75 m-auto">
                      {item.text && (
                        <h3 className="heading-text-6 mb-lg-11 mb-5">
                          “{item.text}”
                        </h3>
                      )}

                      <div className="reviewer-img mb-7">
                        {item.file2 && item.file2.length ? (
                          <LazyLoadImage
                            effect="blur"
                            className="mx-auto"
                            src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${item.file2[0]}`}
                            alt={item.name}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      {item.designation && (
                        <h3 className="heading-text-9 mb-1">
                          {item.designation}
                        </h3>
                      )}
                      {item.name && (
                        <span className="heading-text-11">{item.name}</span>
                      )}
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>

            <Row className="justify-content-center testimonial-slider__link">
              <Col lg="7" className="text-center pt-lg-10 pt-5">
                <div className="more-btn testimonial-btn">
                  {data.link && data.linktext && (
                    <Link
                      href={`${data.link}`}
                      className="btn-link with-icon fw-bold"
                    >
                      <>
                        {data.linktext}
                        <i className="icon icon-tail-right fe-bold"></i>
                      </>
                    </Link>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TestimonialBanner;
