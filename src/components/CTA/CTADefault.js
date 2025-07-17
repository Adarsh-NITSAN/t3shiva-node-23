"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { cta } from "../../utils/constants";
import nl2br from "../../utils/nl2br";
import DOMPurify from "dompurify";

const CTADefault = ({ data }) => {
  const source = nl2br(data.text);

  if (!data) {
    // return <>No Data Found!</>;
    return <></>;
  }

  return (
    <>
      <div className={`cta-section ${data.style}`}>
        <Container>
          <div className="pt-14 pb-14 py-lg-19 border-bottom">
            <Row className="align-items-center justify-content-center">
              <Col lg="6" md="10">
                <>
                  <h2
                    className={`title heading-text-5 mb-7 ${
                      data.style === cta.defaultDark ? "text-white" : ""
                    }`}
                  >
                    {data["headline"] && (
                      <React.Fragment>{data.headline}</React.Fragment>
                    )}
                  </h2>
                  {data["text"] && (
                    <div
                      className={`heading-text-8 mb-8 mb-lg-0 ${
                        data.style === cta.defaultDark ? "text-white" : ""
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(source),
                        }}
                        className="line-break"
                      />
                    </div>
                  )}
                </>
              </Col>
              <Col lg="4" md="10" className="offset-lg-2">
                {data.link && data.buttontext && (
                  <div
                    className="cta-btn text-lg-end text-right"
                    data-aos="zoom-in"
                    data-aos-duration="500"
                    data-aos-delay="250"
                  >
                    <Link href={`${data.link}`} className="btn btn-primary">
                      {data["buttontext"] && (
                        <React.Fragment>{data.buttontext}</React.Fragment>
                      )}
                    </Link>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CTADefault;
