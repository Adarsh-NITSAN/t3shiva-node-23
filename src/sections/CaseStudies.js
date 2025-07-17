import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CaseStudies = ({ data }) => {
  const renderCase = (lists) => {
    if (!lists.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return lists.map((list, id) => {
      let imageURL = list
        ? process.env.NEXT_PUBLIC_API_URL +
          process.env.NEXT_PUBLIC_TYPO3_MEDIA +
          list.media
        : "";
      return (
        <div className="single-case px-md-6 mb-3 mb-lg-9" key={id}>
          <div className="single-case__image">
            <LazyLoadImage
              src={imageURL}
              alt="case"
              className="w-100"
              effect="blur"
            />
          </div>
          <div className="case-content px-5 px-md-9 py-9">
            {list.category && (
              <span className="case-category heading-text-11 mb-2 d-inline-block gr-text-color-opacity">
                {list.category}
              </span>
            )}
            {list.title && (
              <h3 className="case-title heading-text-6 mb-0">{list.title}</h3>
            )}
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div className="case-section pt-15 pb-14 py-lg-25">
        <Container>
          <Row className="justify-content-center">
            <Col xl="6" lg="7" md="8">
              <div className="section-title text-center mb-11 mb-lg-21">
                {data.headline && (
                  <h3 className="sub-badge heading-text-12 text-uppercase text-red mb-7">
                    {data.headline}
                  </h3>
                )}
                {data.subheadline && (
                  <h2 className="title heading-text-4 mb-0">
                    {data.subheadline}
                  </h2>
                )}
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="12">
              <div className="card-columns mb-lg-9">
                {data.list && renderCase(Object.values(data.list))}
              </div>
            </Col>
            <Col lg="7">
              <div className="more-btn case-btn text-center">
                <Link
                  href="/"
                  className="btn-link with-icon mb-0 heading-text-7 fw-bold"
                >
                  {data.linktext && (
                    <>
                      {data.linktext}
                      <i className="icon icon-tail-right fw-bold"></i>
                    </>
                  )}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CaseStudies;
