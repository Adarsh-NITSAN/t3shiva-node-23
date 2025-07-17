import Link from "next/link";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const HeaderOnly = ({ data }) => {
  let textAlign = data.headerPosition;
  const CustomComponent = `${
    data.headerLayout === 0 ? "p" : `h${data.headerLayout}`
  }`;
  return (
    <>
      <div className="main-block">
        <Container>
          {/* <Row>
            <Col lg="10" xl="8">
              <div className="px-lg-8 px-xl-3"> */}
          <div className={"single-block text-" + textAlign}>
            {/* <h2 className="heading-text-3 mb-7 mb-lg-8">
                    {data["header"] && (
                      <React.Fragment>{data.header}</React.Fragment>
                    )}
                  </h2>  */}
            <CustomComponent>
              {data?.headerLink ? (
                <Link
                  href={data?.headerLink?.href}
                  className="heading-with-link"
                >
                  {data.header}
                </Link>
              ) : (
                <>{data.header}</>
              )}
            </CustomComponent>
            {data["subheader"] && <p>{data.subheader}</p>}
          </div>
          {/*
              </div>
             </Col>
          </Row> */}
        </Container>
      </div>
    </>
  );
};

export default HeaderOnly;
