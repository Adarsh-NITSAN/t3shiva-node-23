"use client";
import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";

const Process3 = ({ data }) => {
  const gContext = useContext(GlobalContext);

  const images = (image) => {
    if (!image.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return image.map((img, id) => {
      return (
        <div key={id} className="process-steps-image">
          {img.link ? (
            <Link href={`${img.link}`}>
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
              className="w-100"
            />
          )}
          {img.description && <p>{img.description}</p>}
        </div>
      );
    });
  };

  return (
    <>
      <div className="pt-12 pb-9 pt-lg-21 pb-lg-25 bg-default-2">
        <Container>
          <Row className="justify-content-center">
            <Col xl="6" lg="8" sm="10">
              <div className="text-center mb-12 mb-lg-17">
                {data["headline"] && (
                  <h2 className="heading-text-4 mb-7">{data.headline} </h2>
                )}
                {data["subheadline"] && (
                  <p className="heading-text-8 px-lg-7 px-xl-0">
                    {data.subheadline}
                  </p>
                )}
                {data["text"] && (
                  <p className="heading-text-8 px-lg-7 px-xl-0">{data.text}</p>
                )}
              </div>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg="6">
              {data["image"] && (
                <div className="process-stapes-with-video">
                  {data.image && images(Object.values(data.image))}
                  {data.video && (
                    <a
                      className="video-play-icon-large bg-white process-steps-video"
                      href="#javascript"
                      onClick={(e) => {
                        e.preventDefault();
                        gContext.toggleVideoModal();
                        gContext.setVideoModalURL(`${data.video}`);
                      }}
                    >
                      <span className="sr-only">play</span>
                      <i className="icon icon-triangle-right-17-2"></i>
                    </a>
                  )}
                </div>
              )}
            </Col>
            <Col lg="5">
              <div className="process-stapes-with-video__steps mt-7 mt-lg-0 pl-xl-13">
                <Row className="align-items-center">
                  {data.process && (
                    <React.Fragment>
                      {Object.entries(data.process).map((content, key) => (
                        <React.Fragment key={key}>
                          {(() => {
                            return (
                              <Col
                                md="6"
                                lg="12"
                                data-aos="fade-left"
                                data-aos-duration="750"
                              >
                                <div className="steps__count my-7">
                                  <div className="count bg-blue-opacity mr-8">
                                    <span className="heading-text-9">
                                      {key + 1}
                                    </span>
                                  </div>
                                  <div className="media-body">
                                    {content[1].title && (
                                      <h3 className="w-title mb-5 heading-text-7">
                                        {content[1].title}
                                      </h3>
                                    )}
                                    {content[1].content && (
                                      <p className="heading-text-9 mb-0">
                                        {content[1].content}
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

export default Process3;
