import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageDefault from "../components/Core/ImageDefault";
import Link from "next/link";

const Brand = ({ data }) => {
  return (
    <>
      <div className="brand-section pt-11 pb-9 pt-lg-24 pb-lg-23 bg-default-7">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md="10" lg="9" xl="8">
              <div className="section-title text-center mb-7 mb-lg-11">
                <h2 className="title heading-text-4 mb-9">
                  {data["headline"] && (
                    <React.Fragment>{data.headline}</React.Fragment>
                  )}
                </h2>
                <p className="heading-text-8 px-lg-8 mb-0">
                  {data["text"] && <React.Fragment>{data.text}</React.Fragment>}
                </p>
              </div>
            </Col>
            <Col xs="12" md="11" lg="10" xl="9">
              <div className="brand-logos d-flex justify-content-center align-items-center mx-n9 flex-wrap">
                {data.image && (
                  <React.Fragment>
                    {Object.values(data.image).map((content, key) => (
                      <React.Fragment key={key}>
                        {(() => {
                          return (
                            <>
                              {data.image && (
                                <div
                                  className="single-brand mx-7 py-7 gr-opacity-8"
                                  data-aos="zoom-in-right"
                                  data-aos-duration="500"
                                >
                                  {content.link ? (
                                    <Link
                                      href={`${content.link}`}
                                      className="image-wrap"
                                    >
                                      <span className="sr-only">
                                        {content.link}
                                      </span>
                                      <ImageDefault
                                        src={
                                          process.env.NEXT_PUBLIC_API_URL +
                                          process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                                          content.url
                                        }
                                        alt="brand-icon"
                                        title="brand-title"
                                        key={content.url}
                                      />
                                    </Link>
                                  ) : (
                                    <ImageDefault
                                      src={
                                        process.env.NEXT_PUBLIC_API_URL +
                                        process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                                        content.url
                                      }
                                      alt="brand-icon"
                                      title="brand-title"
                                      key={content.url}
                                    />
                                  )}
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Brand;
