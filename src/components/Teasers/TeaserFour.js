"use client";

import React from "react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Container, Row, Col } from "react-bootstrap";

const TeaserFour = ({ data }) => {
  let imageURL =
    process.env.NEXT_PUBLIC_API_URL +
    process.env.NEXT_PUBLIC_TYPO3_MEDIA +
    data["image"];
  const images = (image) => {
    if (!image.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return image.map((img, id) => {
      return (
        <>
          {img.link ? (
            <Link href={`${img.link}`} className="image-wrap">
              <>
                <span className="sr-only">{img.link}</span>
                <LazyLoadImage
                  effect="blur"
                  src={
                    process.env.NEXT_PUBLIC_API_URL +
                    process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                    img.url
                  }
                  alt={img.alternative}
                  title={img.title}
                  key={id}
                  className="w-100 rounded-8"
                />
              </>
            </Link>
          ) : (
            <LazyLoadImage
              effect="blur"
              src={
                process.env.NEXT_PUBLIC_API_URL +
                process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                img.url
              }
              alt={img.alternative}
              title={img.title}
              key={id}
              className="w-100 rounded-8"
            />
          )}
        </>
      );
    });
  };
  return (
    <>
      <div className="content-section2 pt-12 pb-9 pt-lg-21 pb-lg-25 bg-default-2 teaser-with-image">
        <Container>
          <Row className="justify-content-center">
            <Col xl="6" lg="8" sm="10">
              <div className="section-title text-center mb-12 mb-lg-17">
                {data["headline"] && (
                  <h2 className="title heading-text-4 mb-7">
                    {data.headline}{" "}
                  </h2>
                )}
                {data["subheadline"] && (
                  <p className="heading-text-8 px-lg-7 px-xl-0">
                    {data.subheadline}
                  </p>
                )}
              </div>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg="6">
              {data["image"] && (
                <div className="teaser-image">
                  {data.image && images(Object.values(data.image))}
                </div>
              )}
            </Col>
            <Col lg="5">
              <div className="mt-7 mt-lg-0 pl-xl-13">
                <Row className="align-items-center">
                  {data.list && (
                    <React.Fragment>
                      {Object.entries(data.list).map((content, key) => (
                        <React.Fragment key={content[1].headline}>
                          {(() => {
                            return (
                              <Col
                                md="6"
                                lg="12"
                                data-aos="fade-left"
                                data-aos-duration="750"
                              >
                                <div className="my-7 d-flex ">
                                  <div className="teaser__steps bg-blue-opacity mr-8">
                                    <span className="heading-text-9">
                                      {key + 1}
                                    </span>
                                  </div>
                                  <div className="media-body">
                                    {content[1].headline && (
                                      <h3 className="w-title mb-5 heading-text-7">
                                        {content[1].headline}
                                      </h3>
                                    )}
                                    {content[1].subheadline && (
                                      <p className="heading-text-9 mb-0">
                                        {content[1].subheadline}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Col>
                            );
                          })()}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TeaserFour;
