"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import nl2br from "../../utils/nl2br";
import DOMPurify from "dompurify";

const TextPic = ({ data }) => {
  const bodytext = nl2br(data.bodytext);
  const images = (image) => {
    if (!image.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return image.map((img, id) => {
      return (
        <div key={id}>
          {img.properties.link ? (
            <>
              {img.publicUrl && (
                <Link href={`${img.properties.link}`} className="image-wrap">
                  <LazyLoadImage
                    effect="blur"
                    src={img.publicUrl}
                    alt={img.properties.alternative}
                    title={img.properties.title}
                    className="w-100 rounded-8"
                  />
                </Link>
              )}
            </>
          ) : (
            <>
              {img.publicUrl && (
                <LazyLoadImage
                  effect="blur"
                  src={img.publicUrl}
                  alt={img.properties.alternative}
                  title={img.properties.title}
                  className="w-100 rounded-8"
                />
              )}
            </>
          )}
          {img.properties.description && <p>{img.properties.description}</p>}
        </div>
      );
    });
  };
  const headlineText = ({ headerLayout, header, headerPosition }) => {
    switch (headerLayout) {
      case 1:
        return (
          <h1 className={`title heading-text-1  mb-5 mb-lg-8 text-${headerPosition}`}>
            {header}
          </h1>
        );
      case 2:
        return (
          <h2 className={`title heading-text-2 mb-5 mb-lg-8 text-${headerPosition}`}>
            {header}
          </h2>
        );
      case 3:
        return (
          <h3 className={`title heading-text-3 mb-5 mb-lg-8 text-${headerPosition}`}>
            {header}
          </h3>
        );
      case 4:
        return (
          <h4 className={`title heading-text-4 mb-5 mb-lg-8 text-${headerPosition}`}>
            {header}
          </h4>
        );
      case 5:
        return (
          <h5 className={`title heading-text-5 mb-5 mb-lg-8 text-${headerPosition}`}>
            {header}
          </h5>
        );
      case 6:
        return (
          <h6 className={`title heading-text-6 mb-5 mb-lg-8 text-${headerPosition}`}>
            {header}
          </h6>
        );
      default:
        return (
          <h1 className={`title heading-text-1 mb-5 mb-lg-8 text-${headerPosition}`}>
            {header}
          </h1>
        );
    }
  };
  const renderImageComponent = (data, gallery) => {
    const { position } = gallery;
    if (
      position.horizontal === "left" &&
      position.vertical === "intext" &&
      position.noWrap
    ) {
      return (
        <Row className="align-items-center justify-content-center">
          <Col xl="6" lg="6" md="9" sm="12" className="mb-10 mb-md-8 mb-lg-0">
            <div className="banner-fluid-image text-pic-comp">
              {data.gallery &&
                data.gallery.rows[1]?.columns &&
                images(Object.values(data.gallery.rows[1].columns))}
            </div>
          </Col>
          <Col xl="6" lg="6" md="9" sm="12" className="mb-6 mb-lg-0">
            {data.header && headlineText(data)}
            {bodytext && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(bodytext),
                }}
                className="line-span"
              />
            )}
          </Col>
        </Row>
      );
    } else if (
      position.horizontal === "right" &&
      position.vertical === "intext" &&
      position.noWrap
    ) {
      return (
        <>
          <Row className="align-items-center justify-content-center">
            <Col
              xl="6"
              lg="6"
              md="9"
              sm="12"
              className="order-md-1 order-1 mb-6 mb-lg-0"
            >
              <div className="pr-8 mb-10 mb-lg-0">
                {data.header && headlineText(data)}
                {bodytext && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(bodytext),
                    }}
                    className="line-span"
                  />
                )}
              </div>
            </Col>
            <Col
              xl="6"
              lg="6"
              md="9"
              sm="12"
              className="order-lg-1 mb-10 mb-md-8 mb-lg-0"
            >
              <div className="banner-fluid-image text-pic-comp">
                {data.gallery &&
                  data.gallery.rows[1]?.columns &&
                  images(Object.values(data.gallery.rows[1].columns))}
              </div>
            </Col>
          </Row>
        </>
      );
    } else if (
      position.horizontal === "left" &&
      position.vertical === "intext" &&
      !position.noWrap
    ) {
      return (
        <>
          <div className="mr-md-8 mb-10 mb-md-8 float-md-left">
            <div className="banner-fluid-image">
              {data.gallery &&
                data.gallery.rows[1]?.columns &&
                images(Object.values(data.gallery.rows[1].columns))}
            </div>
          </div>
          <div className="pr-8 mb-10">
            {data.header && headlineText(data)}
            {bodytext && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(bodytext),
                }}
                className="line-span"
              />
            )}
          </div>
        </>
      );
    } else if (
      position.horizontal === "right" &&
      position.vertical === "intext" &&
      !position.noWrap
    ) {
      return (
        <>
          <div className="ml-md-8 mb-10 mb-md-8 float-md-right">
            <div className="banner-fluid-image">
              {data.gallery &&
                data.gallery.rows[1]?.columns &&
                images(Object.values(data.gallery.rows[1].columns))}
            </div>
          </div>
          <div className="pr-8 mb-10">
            {data.header && headlineText(data)}
            {bodytext && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(bodytext),
                }}
                className="line-span"
              />
            )}
          </div>
        </>
      );
    } else if (position.vertical === "above" && !position.noWrap) {
      const verticalPosition = () => {
        if (position.horizontal === "center") {
          return "justify-content-center";
        } else if (position.horizontal === "left") {
          return "justify-content-start";
        } else {
          return "justify-content-end";
        }
      };
      return (
        <>
          <Row>
            <Col lg="12" md="12" sm="12">
              <div
                className={`mb-8 banner-fluid-image d-flex ${verticalPosition()}`}
              >
                {data.gallery &&
                  data.gallery.rows[1]?.columns &&
                  images(Object.values(data.gallery.rows[1].columns))}
              </div>
            </Col>
            <Col lg="12" md="12" sm="12">
              <div>
                {data.header && headlineText(data)}
                {bodytext && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(bodytext),
                    }}
                    className="line-span"
                  />
                )}
              </div>
            </Col>
          </Row>
        </>
      );
    } else if (position.vertical === "below" && !position.noWrap) {
      const verticalPosition = () => {
        if (position.horizontal === "center") {
          return "justify-content-center";
        } else if (position.horizontal === "left") {
          return "justify-content-start";
        } else {
          return "justify-content-end";
        }
      };
      return (
        <>
          <Row>
            <Col lg="12" md="12" sm="12">
              <div className="mb-10">
                {data.header && headlineText(data)}
                {bodytext && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(bodytext),
                    }}
                    className="line-span"
                  />
                )}
              </div>
            </Col>
            <Col lg="12" md="12" sm="12">
              <div
                className={`mT-8 banner-fluid-image d-flex ${verticalPosition()}`}
              >
                {data.gallery &&
                  data.gallery.rows[1]?.columns &&
                  images(Object.values(data.gallery.rows[1].columns))}
              </div>
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Row className="mt-md-6 pt-24">
            <Col md="6" sm="12">
              <div className="pr-8 mb-10">
                {data.header && headlineText(data)}
                {bodytext && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(bodytext),
                    }}
                    className="line-span"
                  />
                )}
              </div>
            </Col>
            <Col md="6" sm="12">
              <div className="banner-fluid-image">
                {data.gallery &&
                  data.gallery.rows[1]?.columns &&
                  images(Object.values(data.gallery.rows[1].columns))}
              </div>
            </Col>
          </Row>
        </>
      );
    }
  };

  if (!data) return <div className="pt-15 pt-lg-20">No Data Found</div>;

  return (
    <>
      <div className="inner-banner">
        <Container>{renderImageComponent(data, data.gallery)}</Container>
      </div>
    </>
  );
};

export default TextPic;
