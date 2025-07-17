"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import nl2br from "../../utils/nl2br";
import GlobalContext from "../../context/GlobalContext";
import DOMPurify from "dompurify";

const CTANewOffer = ({ data }) => {
  const gContext = useContext(GlobalContext);
  const source = nl2br(data.text);
  return (
    <>
      <div className="alert-section py-9 bg-primary dark-mode-texts ">
        <Container>
          <Row className="justify-content-center">
            <Col xl="10" lg="12" md="9">
              <div className="alert-content d-flex flex-column flex-lg-row align-items-center text-center justify-content-lg-center">
                {data.badge &&
                  (data.badge === "Play" ? (
                    <i
                      className="fa fa-play"
                      style={{ color: "white", paddingRight: "10px" }}
                    ></i>
                  ) : (
                    <div className="badge-wrapper">
                      <span className="btn-badge rounded-pill bg-white heading-text-12 text-uppercase fw-bold text-blue py-1 px-6 mr-5 mb-6 mb-lg-0 d-inline-flex align-items-center">
                        {data.badge}
                      </span>
                    </div>
                  ))}
                {data.text && (
                  <span className="alert-section__link">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(source),
                      }}
                      className="line-break mb-0 alert-text heading-text-9 text-white"
                    />
                    {data.link && String(data.link).startsWith("http") ? (
                      <Link
                        href="#javascript"
                        className="action-link text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          gContext.toggleVideoModal();
                          gContext.setVideoModalURL(`${data.link}`);
                        }}
                      >
                        {data.buttontext}
                      </Link>
                    ) : (
                      <Link
                        href={`${data.link}`}
                        className="action-link text-white"
                      >
                        {data.buttontext}
                      </Link>
                    )}
                  </span>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CTANewOffer;
