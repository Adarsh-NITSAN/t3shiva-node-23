"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const FactDefault = ({ data }) => {
  return (
    <>
      <div className="fact-section bg-default-4 pt-lg-24 pt-15 pb-5 pb-lg-20">
        <Container>
          <Row className="justify-content-center">
            {data.list && (
              <React.Fragment>
                {Object.entries(data.list).map((content, key) => (
                  <React.Fragment key={key}>
                    {(() => {
                      let countduraction = content[1].countduraction
                        ? parseInt(content[1].countduraction)
                        : 2;
                      let countend = parseInt(content[1].countend);
                      return (
                        <Col lg="4" md="6" sm="6" className="mb-9 mb-lg-0">
                          <div className="single-fact text-center px-xl-6">
                            <h4 className="mb-7 heading-text-3 fw-bold">
                              <LazyLoadComponent>
                                <span className="counter">
                                  <CountUp
                                    duration={countduraction}
                                    end={countend}
                                    enableScrollSpy={true}
                                    scrollSpyOnce={true}
                                  />
                                </span>
                                {content[1].postfix}
                              </LazyLoadComponent>
                            </h4>
                            <p className="heading-text-8 mb-0">
                              {content[1].headline && (
                                <React.Fragment>
                                  {content[1].headline}
                                </React.Fragment>
                              )}
                            </p>
                          </div>
                        </Col>
                      );
                    })()}
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FactDefault;
