"use client";

import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Process2 = ({ data }) => {
  let backgroundColor = ["primary", "tertiary", "secondary"];

  const renderCols = (processes) => {
    if (!processes.length) {
      return <>No Data Found!</>;
    }
    return processes.map((p, id) => {
      let bgColor;
      if (id % 3 === 0) {
        bgColor = backgroundColor[0];
      } else if (id % 3 === 1) {
        bgColor = backgroundColor[1];
      } else {
        bgColor = backgroundColor[2];
      }
      return (
        <Col
          lg="4"
          md="6"
          className="mb-11 mb-lg-19 px-xs-6 px-md-6 px-lg-0 px-xl-8"
          data-aos="fade-right"
          data-aos-duration="800"
          key={p.title}
        >
          <div className="process-steps-icon text-center">
            <div className={`icon-square mx-auto mb-9 mb-lg-12 bg-${bgColor}`}>
              {p.media && p.media.length ? (
                <LazyLoadImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${p.media[0]}`}
                  alt={p.title}
                  effect="blur"
                />
              ) : (
                ""
              )}
            </div>
            <div className="widget-text">
              {p.title && (
                <h3 className="title heading-text-6 mb-7">{p.title}</h3>
              )}
              {p.content && <p className="heading-text-11 mb-0">{p.content}</p>}
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <>
      <div className="feature-section pt-14 pt-lg-21 pb-7 bg-default-6">
        <Container>
          <Row className="justify-content-center">
            <Col xl="5" lg="6" md="8">
              <div className="section-title text-center mb-13 mb-lg-21">
                {data.headline && (
                  <h2 className="title heading-text-4 mb-6">{data.headline}</h2>
                )}
                {data.text && (
                  <p className="heading-text-9 mb-0">{data.text}</p>
                )}
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            {data.process && renderCols(Object.values(data.process))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Process2;
