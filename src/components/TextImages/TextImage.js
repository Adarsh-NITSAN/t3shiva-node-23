"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import nl2br from "../../utils/nl2br";
import DOMPurify from "dompurify";

const TextImage = ({ data }) => {
  const source = nl2br(data.text);
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
              </>
            </Link>
          ) : (
            <LazyLoadImage
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
          )}
          {img.description && <p className="img-caption">{img.description}</p>}
        </>
      );
    });
  };
  return (
    <>
      <div className="inner-banner">
        <Container>
          <Row className="justify-content-center mt-md-6 pt-24 pt-lg-29">
            <Col lg="9" xl="8">
              <div className="px-md-12 text-center mb-11 mb-lg-14">
                <h2 className="title heading-text-2 mb-9 mb-lg-12">
                  {data["headline"] && (
                    <React.Fragment>{data.headline}</React.Fragment>
                  )}
                </h2>
                {source && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(source),
                    }}
                    className="line-break heading-text-8 mb-0"
                  />
                )}
              </div>
            </Col>
            <Col xs="12">
              <div className="banner-fluid-image pt-lg-9">
                {data.image && images(Object.values(data.image))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TextImage;
