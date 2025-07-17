"use client";

import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TestimonialSolo = ({ data }) => {
  const renderTestimonial = (lists) => {
    return lists.map((list, id) => {
      return (
        <Col
          lg="12"
          xl="11"
          className={`${id + 1 === lists.length ? "" : "mb-10 mb-lg-16"}`}
          key={id}
        >
          <div className="d-flex px-lg-7 flex-column flex-sm-row align-items-center">
            {list.file2 && list.file2.length ? (
              <>
                <div className="mr-12 mr-lg-19 mb-9 mb-md-0 testimonial-solo-image">
                  <LazyLoadImage
                    effect="blur"
                    src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${list.file2[0]}`}
                    alt={list.name}
                  />
                </div>
              </>
            ) : (
              ""
            )}
            <div className="widget-text">
              <LazyLoadImage
                className="rating mb-11 object-fit-cover"
                src="/image/l5/png/5-stars.png"
                alt="Ratings"
                effect="blur"
              />
              {list.text && (
                <h3 className="review-text heading-text-6 fw-bold mb-9">
                  “{list.text}”
                </h3>
              )}
              <div className="d-flex flex-wrap">
                {list.name && (
                  <h4 className="heading-text-9 mr-7 mb-md-0">{list.name}</h4>
                )}
                {list.designation && (
                  <span className="heading-text-9 mb-0">
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
      <div className="testimonial-section1 pt-9 pt-lg-20 bg-default-4">
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
          <div className="review-wrapper pt-9 pb-lg-25 pb-14 border-bottom">
            <Row className="justify-content-center align-items-center">
              {data.list && Object.values(data.list).length ? (
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
          </div>
        </Container>
      </div>
    </>
  );
};

export default TestimonialSolo;
