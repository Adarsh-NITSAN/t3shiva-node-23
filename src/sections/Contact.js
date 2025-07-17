import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import DOMPurify from "dompurify";

const Contact = ({ data }) => {
  return (
    <>
      <div className="pb-2 pt-15 pt-lg-30 bg-default-2 contact-section">
        <Container>
          <Row className="justify-content-center pt-5">
            <Col xl="8" lg="9">
              <div className="px-md-15 text-center">
                <h2 className="title heading-text-2 mb-9">
                  {data["headline"] && (
                    <React.Fragment>{data.headline}</React.Fragment>
                  )}
                </h2>
                <p className="heading-text-8 mb-13 mb-lg-22">
                  {data["subheadline"] && (
                    <React.Fragment>{data.subheadline}</React.Fragment>
                  )}
                </p>
              </div>
            </Col>
            <Col xs="12" className="mb-9">
              <Row>
                <Col md="5" lg="4" className="mb-13">
                  <div className="single-contact-widget">
                    {parseInt(data.callicon) !== 0 ? (
                      <div className="widget-icon heading-text-6 mr-7">
                        <i className={data.callicon}></i>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="widget-text">
                      <h3 className="heading-text-6 mb-5 mt-5">
                        {data["callheadline"] && (
                          <React.Fragment>{data.callheadline}</React.Fragment>
                        )}
                      </h3>
                      <p className="heading-text-7 mb-0">
                        {data["phone1"] && (
                          <React.Fragment>{data.phone1}</React.Fragment>
                        )}{" "}
                        <br />
                        {data["phone2"] && (
                          <React.Fragment>{data.phone2}</React.Fragment>
                        )}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md="5" lg="4" className="mb-13">
                  <div className="single-contact-widget">
                    {parseInt(data.emailicon) !== 0 ? (
                      <div className="widget-icon heading-text-6 mr-7">
                        <i className={data.emailicon}></i>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="widget-text">
                      <h3 className="heading-text-6 mb-5 mt-5">
                        {data["emailheadline"] && (
                          <React.Fragment>{data.emailheadline}</React.Fragment>
                        )}
                      </h3>
                      <p className="heading-text-7 mb-0">
                        {data.email1 && (
                          <a href={`mailto:${data.email1}`}>{data.email1}</a>
                        )}
                        <br />
                        {data.email2 && (
                          <a href={`mailto:${data.email2}`}>{data.email2}</a>
                        )}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md="5" lg="4" className="mb-13">
                  <div className="single-contact-widget d-flex">
                    {parseInt(data.addressicon) !== 0 ? (
                      <div className="widget-icon heading-text-6 mr-7">
                        <i className={data.addressicon}></i>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="widget-text">
                      <h3 className="heading-text-6 mb-5 mt-5">
                        {data["addressheadline"] && (
                          <React.Fragment>
                            {data.addressheadline}
                          </React.Fragment>
                        )}
                      </h3>
                      {data["addresscontent"] && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.addresscontent),
                          }}
                          className="address-text heading-text-7 mb-0"
                        />
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Contact;
