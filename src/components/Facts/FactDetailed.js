"use client";
import React from "react";
import Link from "next/link";
import CountUp from "react-countup";
import ImageDefault from "../Core/ImageDefault";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Container, Row, Col } from "react-bootstrap";

const FactDetailed = ({ data }) => {
  const renderStats = (lists) => {
    let aosDuration = 500;
    return lists.map((list, id) => {
      aosDuration += 500;
      return (
        <div
          className="single-stat py-6"
          data-aos="fade-left"
          data-aos-duration={`${aosDuration}`}
          key={list.headline}
        >
          <h3 className="title heading-text-5 mb-5">
            <LazyLoadComponent>
              <span className="counter">
                <CountUp
                  duration={list.countduraction ? list.countduraction : 2}
                  end={list.countend}
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
              </span>
              {list.postfix}
            </LazyLoadComponent>
          </h3>
          <p className="heading-text-8 mb-0">{list.headline}</p>
        </div>
      );
    });
  };

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
                <ImageDefault
                  src={
                    process.env.NEXT_PUBLIC_API_URL +
                    process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                    img.url
                  }
                  alt={img.alternative}
                  title={img.title}
                  description={img.description}
                  className="rounded-10"
                  key={id}
                />
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
              className="rounded-10"
              key={id}
            />
          )}
        </>
      );
    });
  };

  return (
    <>
      <div className="content-section pt-12 pb-10 bg-default-6 py-xl-25 ">
        <Container>
          <Row className="align-items-center justify-content-md-center">
            <Col lg="4" md="10">
              <div className="content-text text-center text-lg-start mb-9 mb-lg-0 pr-xl-11">
                {data.headline && (
                  <h2 className="title heading-text-5 mb-8">{data.headline}</h2>
                )}
                {data.text && (
                  <p className="heading-text-8 mb-9">{data.text}</p>
                )}
                {data.buttontext && data.link && (
                  <Link
                    href={`${data.link}`}
                    className="btn btn-primary text-white"
                  >
                    {data.buttontext}
                  </Link>
                )}
              </div>
            </Col>
            <Col lg="4" md="6">
              <div className="content-img rounded-8 text-center">
                {data.image
                  ? data.image && images(Object.values(data.image))
                  : ""}
              </div>
            </Col>
            <Col lg="4" md="6">
              <div className="stats-wrapper mt-6 mt-md-0 pl-xl-9">
                {data.list && Object.values(data.list).length
                  ? renderStats(Object.values(data.list))
                  : ""}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FactDetailed;
