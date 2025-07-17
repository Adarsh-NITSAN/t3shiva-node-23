"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import DOMPurify from "dompurify";
import nl2br from "../../utils/nl2br";

const CTASecondary = ({ data }) => {
  const source = nl2br(data.text);
  return (
    <>
      <div className="cta-section pt-13 pt-lg-25 pb-13 pb-lg-25 bg-blue bg-pattern pattern-7">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <div className="text-center dark-mode-texts">
                {data.headline && (
                  <h2 className="heading-text-4 mb-7">{data.headline}</h2>
                )}
                {data.text && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(source),
                    }}
                    className="line-break heading-text-9 mb-11 px-xl-7 text-white"
                  />
                )}
                {data.link && data.buttontext && (
                  <Link
                    href={`${data.link}`}
                    className="btn btn-dark text-white px-lg-9"
                  >
                    {data.buttontext}
                  </Link>
                )}
                {data.message && (
                  <p className="heading-text-11 mb-0 mt-6 text-white">
                    {data.message}
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CTASecondary;
