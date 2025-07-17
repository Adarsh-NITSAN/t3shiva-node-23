"use client";

import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TestimonialLists = ({ data }) => {
  const renderTestimonial = (lists) => {
    return lists.map((list, id) => {
      return (
        <Col
          xs="10"
          lg="8"
          className="mb-7"
          data-aos="fade-right"
          data-aos-duration="800"
          key={list.text}
        >
          <div className="testimonial-card d-flex flex-column flex-md-row align-items-md-center border rounded-12 bg-white pt-9 pb-8 px-9 gr-hover-opacity-full">
            <div className="card-image mr-9 mb-7 mb-md-0">
              {list?.file2 && (
                <LazyLoadImage
                  className="w-100"
                  src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${list?.file2[0]}`}
                  alt={list.name}
                  effect="blur"
                />
              )}
            </div>
            <div className="testimonial-content">
              {list.text && (
                <p className="review-text heading-text-7 heading-color mb-6">
                  “{list.text}”
                </p>
              )}
              {list.name && (
                <span className="name heading-text-9 text-blackish-blue gr-opacity-7 fw-bold mb-0">
                  {list.name}
                </span>
              )}
              {list.designation && (
                <p className="name heading-text-10 text-blackish-blue mb-0">
                  {list.designation}
                </p>
              )}
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <>
      <div className="testimonial-section pt-15 pt-lg-22 pb-15 pb-lg-25 bg-gradient-1">
        <Container>
          <Row className="justify-content-center dark-mode-texts">
            <Col md="8" lg="7" xl="6">
              <div className="section-title text-center mb-11 mb-lg-15">
                {data.headline && (
                  <h2 className="title-sm heading-text-5 mb-0 text-white">
                    {data.headline}
                  </h2>
                )}
                {data.subheadline && (
                  <p className="heading-text-8 mb-0 px-lg-7 px-xl-0">
                    {data.subheadline}
                  </p>
                )}
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {data.list && Object.entries(data.list) ? (
              <>{renderTestimonial(Object.values(data.list))}</>
            ) : (
              ""
            )}
          </Row>
          <Row className="justify-content-center">
            <Col lg="7" className="text-center pt-10">
              <div className="more-btn testimonial-btn">
                {data.link && data.linktext && (
                  <Link
                    href={`${data.link}`}
                    className="btn-link with-icon fw-bold text-white"
                  >
                    <>
                      {data.linktext}
                      <i className="icon icon-tail-right fw-bold"></i>
                    </>
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

export default TestimonialLists;
