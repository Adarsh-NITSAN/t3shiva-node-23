"use client";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TestimonialWithCompany = ({ data }) => {
  const renderTestimonial = (lists) => {
    return lists.map((list, id) => {
      return (
        <Col lg="4" md="6" sm="9" className="mb-16" key={id}>
          <div className="single-testimonial text-center h-100 d-flex flex-column px-5">
            {list.file2 && list.file2.length ? (
              <div className="brand-logo mb-9 mb-lg-13">
                <LazyLoadImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${list.file2[0]}`}
                  alt={list.text}
                  effect="blur"
                />
              </div>
            ) : (
              ""
            )}
            {list.text && (
              <p className="review-text mb-0 heading-text-6 fw-bold gr-text-color">
                “{list.text}”
              </p>
            )}
            <div className="user-block media pt-9 pt-lg-12 d-flex justify-content-center mt-auto">
              {list.media && list.media.length ? (
                <div className="user-image circle-md mr-7 circle-md overflow-hidden">
                  <LazyLoadImage
                    className="w-100"
                    src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${list.media[0]}`}
                    alt={list.name}
                    effect="blur"
                  />
                </div>
              ) : (
                ""
              )}
              <div className="user-text text-start align-self-center">
                {list.name && (
                  <h4 className="user-title heading-text-9 mb-0">
                    {list.name}
                  </h4>
                )}
                {list.designation && (
                  <span className="user-rank heading-text-11 gr-text-color-opacity">
                    {list.designation}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <>
      <div className="testimonial-section pt-15 pt-lg-9 pb-lg-12 bg-default-1">
        <Container>
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
          <Row className="align-items-center justify-content-around">
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
                    className="btn-link with-icon fw-bold"
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

export default TestimonialWithCompany;
