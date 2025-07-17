import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Masonary from "../components/News/Masonary";
import Grid from "../components/News/Grid";
import GridFullWidth from "../components/News/GridFullWidth";
import NewsList from "../components/News/NewsList";

const News = ({ data, dataHeader }) => {
  return <NewsListing data={(data, dataHeader)} />;
};

const layouts = {
  0: "masonary",
  1: "list",
  2: "three_column",
  3: "four_column",
  4: "full_width",
  5: "no_margin",
  6: "no_margin_full_width",
};

const NewsListing = ({ data }) => {
  const layout = parseInt(data.data.settings.templateLayout);

  const renderLayout = (layoutNum) => {
    switch (layoutNum) {
      case 0:
        return <Masonary data={data} />;
      case 1:
        return <NewsList data={data} />;
      case 2:
      case 3:
      case 5:
        return <Grid data={data} layout={layouts[layoutNum]} />;
      case 4:
      case 6:
        return <GridFullWidth data={data} layout={layouts[layoutNum]} />;
      case 7:
        return <NewsList data={data} />;
      default:
        return <NewsList data={data} />;
    }
  };

  return (
    <>
      <div className="news-section pt-25 pb-8 py-lg-30 bg-white">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <div className="section-title text-center mb-11 mb-lg-19 px-lg-3">
                <p className="pre-title heading-text-12 primary text-uppercase mb-7 fw-bold">
                  {data["header"] && (
                    <React.Fragment>{data.header}</React.Fragment>
                  )}
                </p>
                <h2 className="title heading-text-4">
                  {data["subheader"] && (
                    <React.Fragment>{data.subheader}</React.Fragment>
                  )}
                </h2>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={`${layouts[layout]}-layout`}>
          {renderLayout(layout)}
        </div>
      </div>
    </>
  );
};

export default News;
