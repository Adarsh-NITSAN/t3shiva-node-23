"use client";

import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TestimonialDefault = ({ data }) => {
  const renderTestimonial = (lists) => {
    let aosDuration = 700;
    let aosDelay = 0;
    return lists.map((list, id) => {
      aosDuration += 400;
      aosDelay += 500;
      return (
        <Col
          md="6"
          className="mb-13 mb-lg-10"
          data-aos="fade-right"
          data-aos-duration={`${aosDuration}`}
          key={list.text}
          data-aos-delay={`${aosDelay}`}
        >
          <>
            <div className="quote-icon pb-12">
              <LazyLoadImage
                effect="blur"
                src="/image/png/quote.png"
                width="26"
                height="25"
                alt="Quote"
              />
            </div>
            {list.text && (
              <p className="heading-text-6 fw-bold heading-color pr-xl-11 mb-0">
                “{list.text}”
              </p>
            )}
            <div className="d-flex pt-8">
              {list.name && (
                <span className="heading-text-9 fw-bold mb-0 heading-color">
                  {list.name}
                </span>
              )}
              {list.designation && (
                <p className="rank heading-text-9 pl-5 gr-text-color-opacity mb-0">
                  {list.designation}
                </p>
              )}
            </div>
          </>
        </Col>
      );
    });
  };

  if (!data) {
    return <>No data found</>;
  }

  return (
    <>
      <div className="testimonial-section pt-9 pt-lg-20 pb-lg-25 bg-default-5">
        <Container>
          {(data.headline || data.subheadline) && (
            <div className="section-title text-center mb-11 mb-lg-14">
              {data.headline && (
                <h2 className="title heading-text-4 mb-6">{data.headline}</h2>
              )}
              {data.subheadline && (
                <p className="heading-text-8 mb-0 px-lg-7 px-xl-0">
                  {data.subheadline}
                </p>
              )}
            </div>
          )}
          <Row className="justify-content-center">
            {data.list && Object.entries(data.list) ? (
              <>{renderTestimonial(Object.values(data.list))}</>
            ) : (
              ""
            )}
          </Row>
          <Row className="justify-content-center">
            <Col lg="7" className="text-center">
              <>
                {data.link && data.linktext && (
                  <Link
                    href={`${data.link}`}
                    className="btn-link with-icon fw-bold"
                  >
                    <>
                      {data.linktext}
                      <i className="icon icon-tail-right fw-bold"></i>
                    </>
                  </Link>
                )}
              </>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TestimonialDefault;
