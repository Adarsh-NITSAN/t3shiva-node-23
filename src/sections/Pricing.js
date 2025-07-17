"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Row, Col, Container } from "react-bootstrap";
import DOMPurify from "dompurify";

const Pricing = ({ data }) => {
  const [isMonthly, setIsMonthly] = useState(false);

  const renderToggleButton = () => {
    return (
      <div className="text-center pt-9">
        <div
          className="mb-13 d-inline-flex position-relative"
          id="pricing-dynamic-deck--head"
        >
          <span className="period heading-text-8">Monthly</span>
          <a
            href="/#"
            className={`btn-toggle mx-3 price-deck-trigger ${
              isMonthly ? "active" : " "
            }`}
            onClick={(e) => {
              e.preventDefault();
              setIsMonthly(!isMonthly);
            }}
          >
            <span className="round"></span>
          </a>
          <span className="period heading-text-8">Yearly</span>
          <span className="badge  heading-text-12 rounded-pill ms-5 mx-3">
            Save 25%
          </span>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="inner-banner bg-default-2 pt-15 pt-lg-29">
        <Container>
          <Row className="justify-content-center pt-5">
            <Col lg="9" xl="8">
              <div className="px-md-15 text-center mb-5 mb-lg-13">
                <h2 className="title heading-text-2 mb-9 mb-lg-12">
                  {data["headline"] && (
                    <React.Fragment>{data.headline}</React.Fragment>
                  )}
                </h2>
                <p className="heading-text-8 mb-0">
                  {data["subheadline"] && (
                    <React.Fragment>{data.subheadline}</React.Fragment>
                  )}
                </p>
                {Object.entries(data.pricetable)[0][1].period === "/mo" &&
                  renderToggleButton()}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="pricing-section bg-default-2 pt-lg-9 pb-5 pb-md-11">
        <Container>
          <Row className="justify-content-center">
            {data.pricetable && (
              <React.Fragment>
                {isMonthly
                  ? Object.entries(data.pricetable)
                      .map((content, key) => (
                        <React.Fragment key={key}>
                          {(() => {
                            let bgColor = content[1].option;
                            let btnBg = content[1].buttoncolor;
                            const isChecked = content[1].onlytext;
                            return (
                              <Col
                                lg="4"
                                md="6"
                                sm="8"
                                className="mb-9"
                              >
                                <div
                                  className={
                                    "pricing-card full-height gr-hover-shadow-1 text-center pt-9 pb-9 pr-9 pr-xl-9 pl-9 pl-xl-9 bg-" +
                                    bgColor +
                                    " rounded-10"
                                  }
                                >
                                  <div className="price-content light-mode-texts">
                                    <span className="small-title heading-text-12 text-uppercase fw-bold">
                                      {content[1].title && (
                                        <React.Fragment>
                                          {content[1].title}
                                        </React.Fragment>
                                      )}
                                    </span>
                                    {isChecked == "1" ? (
                                      <div className="d-flex align-items-end justify-content-center mt-9 ">
                                        <span className="per heading-text-9 text-blackish-blue">
                                          {content[1].price && (
                                            <React.Fragment>
                                              {content[1].price}
                                            </React.Fragment>
                                          )}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="d-flex align-items-end justify-content-center mt-9 ">
                                        <span className="currency mr-2 heading-text-6 text-blackish-blue fw-bold line-spacing-none">
                                          {content[1].currency && (
                                            <React.Fragment>
                                              {content[1].currency}
                                            </React.Fragment>
                                          )}
                                        </span>
                                        <h2 className="price-value heading-text-2 text-blackish-blue fw-bold line-spacing-none mb-0">
                                          {content[1].price && (
                                            <React.Fragment>
                                              {content[1].price}
                                            </React.Fragment>
                                          )}
                                        </h2>
                                        <span className="per heading-text-9 text-blackish-blue">
                                          {content[1].period && (
                                            <React.Fragment>
                                              {content[1].period}
                                            </React.Fragment>
                                          )}
                                        </span>
                                      </div>
                                    )}
                                    {content[1].content && (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: DOMPurify.sanitize(
                                            content[1].content
                                          ),
                                        }}
                                        className="rte-block"
                                      />
                                    )}
                                  </div>
                                  {content[1].link && content[1].buttontext && (
                                    <Link
                                      href={`${content[1].link}`}
                                      variant={btnBg}
                                      className={
                                        "mx-auto btn btn-dark btn-" + btnBg
                                      }
                                    >
                                      <React.Fragment>
                                        {content[1].buttontext}
                                      </React.Fragment>
                                    </Link>
                                  )}
                                </div>
                              </Col>
                            );
                          })()}
                        </React.Fragment>
                      ))
                      .slice(3, 6)
                  : Object.entries(data.pricetable)
                      .map((content, key) => (
                        <React.Fragment key={key}>
                          {(() => {
                            let bgColor = content[1].option;
                            let btnBg = content[1].buttoncolor;
                            const isChecked = content[1].onlytext;
                            return (
                              <Col
                                lg="4"
                                md="6"
                                sm="8"
                                className="mb-9"
                              >
                                <div
                                  className={
                                    "pricing-card full-height gr-hover-shadow-1 text-center pt-9 pb-9 pr-9 pr-xl-9 pl-9 pl-xl-9 bg-" +
                                    bgColor +
                                    " rounded-10"
                                  }
                                >
                                  <div className="price-content light-mode-texts">
                                    <span className="small-title heading-text-12 text-uppercase tertiary fw-bold">
                                      {content[1].title && (
                                        <React.Fragment>
                                          {content[1].title}
                                        </React.Fragment>
                                      )}
                                    </span>
                                    {isChecked == "1" ? (
                                      <div className="d-flex align-items-end justify-content-center mt-9 ">
                                        <span className="per heading-text-9 text-blackish-blue">
                                          {content[1].price && (
                                            <React.Fragment>
                                              {content[1].price}
                                            </React.Fragment>
                                          )}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="d-flex align-items-end justify-content-center mt-9 pricing-hading">
                                        <span className="currency mr-2 heading-text-6 text-blackish-blue fw-bold line-spacing-none">
                                          {content[1].currency && (
                                            <React.Fragment>
                                              {content[1].currency}
                                            </React.Fragment>
                                          )}
                                        </span>
                                        <h2 className="price-value heading-text-2 text-blackish-blue fw-bold line-spacing-none mb-0">
                                          {content[1].price && (
                                            <React.Fragment>
                                              {content[1].price}
                                            </React.Fragment>
                                          )}
                                        </h2>
                                        <span className="per heading-text-9 text-blackish-blue">
                                          {content[1].period && (
                                            <React.Fragment>
                                              {content[1].period}
                                            </React.Fragment>
                                          )}
                                        </span>
                                      </div>
                                    )}
                                    {content[1].content && (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: DOMPurify.sanitize(
                                            content[1].content
                                          ),
                                        }}
                                        className="rte-block"
                                      />
                                    )}
                                  </div>
                                  {content[1].link && content[1].buttontext && (
                                    <Link
                                      href={`${content[1].link}`}
                                      variant={btnBg}
                                      className={
                                        "gr-hover-y gr-min-width-219 mx-auto btn btn-dark btn-" +
                                        btnBg
                                      }
                                    >
                                      <React.Fragment>
                                        {content[1].buttontext}
                                      </React.Fragment>
                                    </Link>
                                  )}
                                </div>
                              </Col>
                            );
                          })()}
                        </React.Fragment>
                      ))
                      .slice(0, 3)}
              </React.Fragment>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Pricing;
