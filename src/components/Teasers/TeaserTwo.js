"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";


const TeaserTwo = ({ data }) => {
  const renderCols = (lists) => {
    if (!lists.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return lists.map((list, id) => (
      <Col key={id} lg="4" md="6" className="mb-8 mb-md-13 mb-lg-10">
        <div className="d-flex" data-aos="fade-up" data-aos-duration="1100">
          <div className="mr-8">
            {list.image && list.image.length ? (
              <LazyLoadImage
                effect="blur"
                src={
                  process.env.NEXT_PUBLIC_API_URL +
                  process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                  list.image[0]
                }
                alt={list.headline}
                title={list.headline}
              />
            ) : (
              ""
            )}
          </div>
          <div className="widget-texts">
            {list.headline && (
              <h3 className="title heading-text-7 fw-bold mb-6">
                {list.headline}
              </h3>
            )}
            {list.subheadline && (
              <p className="heading-text-9 mb-0">{list.subheadline}</p>
            )}
            {list.buttonlink && list.buttontext && (
              <Link
                href={`${list.buttonlink}`}
                className="btn btn-primary mt-8 py-4"
              >
                {list.buttontext}
              </Link>
            )}
          </div>
        </div>
      </Col>
    ));
  };

  return (
    <>
      <div className="feature-section bg-default-2 pt-15 pt-lg-22 pb-9 pb-md-0 pb-lg-17">
        <Container>
          <div className="bg-default-2 pt-15 pt-lg-1">
            <Row className="justify-content-center pt-5">
              <Col lg="9" xl="8">
                <div className="px-md-15 text-center mb-5 mb-lg-13">
                  <h2 className="title heading-text-2 mb-9 mb-lg-12">
                    {data["headline"] && (
                      <React.Fragment>{data.headline}</React.Fragment>
                    )}
                  </h2>
                  <p className="heading-text-8 mb-0">
                    {data["subheadline"] && (
                      <React.Fragment>{data.subheadline}</React.Fragment>
                    )}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <Row className="justify-content-center">
            {data.list && renderCols(Object.values(data.list))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TeaserTwo;
