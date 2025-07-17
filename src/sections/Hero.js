"use client";

import React, { useContext } from "react";
import Link from "next/link";
import ImageDefault from "../components/Core/ImageDefault";
import { Container, Row, Col } from "react-bootstrap";
import GlobalContext from "../context/GlobalContext";

const Hero = ({ data }) => {
  const gContext = useContext(GlobalContext);

  const images = (image) => {
    if (!image.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return image.map((img, id) => {
      return (
        <React.Fragment key={id}>
          {img.link ? (
            <Link href={`${img.link}`} className="image-wrap">
              <>
                <span className="sr-only">{img.link}</span>
                <ImageDefault
                  src={
                    process.env.NEXT_PUBLIC_API_URL +
                    process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                    img.url
                  }
                  alt={img.alternative}
                  title={img.title}
                  description={img.description}
                  key={id}
                />
                {img.link && (
                  <a
                    className="video-play-icon-large bg-white focus-reset hero-section__video"
                    href="#javascript"
                    onClick={(e) => {
                      e.preventDefault();
                      gContext.toggleVideoModal();
                      gContext.setVideoModalURL(`${img.link}`);
                    }}
                  >
                    <span className="sr-only">play</span>
                    <i className="icon icon-triangle-right-17-2"></i>
                  </a>
                )}
              </>
            </Link>
          ) : (
            <ImageDefault
              src={
                process.env.NEXT_PUBLIC_API_URL +
                process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                img.url
              }
              alt={img.alternative}
              title={img.title}
              description={img.description}
            />
          )}
        </React.Fragment>
      );
    });
  };
  return (
    <>
      <div className="hero-section bg-default-2 bg-pattern pattern-2 pt-24 pt-lg-32 pb-15 pb-lg-27">
        <Container>
          <Row className="hero-section__row">
            <Col xs={12} md={9} lg={6} className="order-lg-2">
              <div className="hero-img">
                {data.image && images(Object.values(data.image))}
              </div>
            </Col>
            <Col
              md={10}
              lg={6}
              className="order-lg-1 text-center text-lg-start"
            >
              <div className="hero-content mt-11 mt-lg-0">
                {data.headline && (
                  <h1 className="title heading-text-2 mb-8">{data.headline}</h1>
                )}
                {data.text && (
                  <p className="heading-text-8 mb-11">{data.text}</p>
                )}
                {data["buttontext"] && (
                  <div className="mt-10">
                    <Link
                      href={`${data.buttonlink}`}
                      className="btn btn-primary btn-icon text-white with-icon gr-hover-y"
                    >
                      <React.Fragment>{data.buttontext}</React.Fragment>
                      <i className="icon icon-tail-right"></i>
                    </Link>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Hero;
