import { Col, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ContentSection({ data }) {
  const array = Object.entries(data.image);
  return (
    <div className="container">
      <Row>
        <Col xl="6" lg="7" md="8">
          <div className="section-title mb-13">
            {data.headline && (
              <h4 className="pre-title heading-text-12 primary text-uppercase mb-9">
                {data.headline}
              </h4>
            )}
            {data.texttop && (
              <h2 className="title heading-text-4">{data.texttop}</h2>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="5">
          {array.length >= 1 && (
            <div className="about-image img-bit pt-lg-13 aos-init aos-animate">
              <LazyLoadImage
                className="w-100 rounded-10"
                src={
                  process.env.NEXT_PUBLIC_API_URL +
                  process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                  array[0][1].url
                }
                alt="content section image"
                effect="blur"
              />
            </div>
          )}
        </Col>
        <Col lg="7">
          <div className="justify-content-between align-items-center pl-lg-13 row">
            <Col md={`${array.length}` === "2" ? "10" : "6"}>
              {array.length >= 2 && (
                <div className="about-image img-mid mt-9 mt-lg-0 aos-init aos-animate">
                  <img
                    className="w-100 rounded-10"
                    src={
                      process.env.NEXT_PUBLIC_API_URL +
                      process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                      array[1][1].url
                    }
                    alt=""
                  />
                </div>
              )}
              <div className="abs-pattern gr-abs-tr-custom aos-init aos-animate">
                {/* <img src={process.env.NEXT_PUBLIC_API_URL +
                            process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                            data.image[384].url} alt="" /> */}
              </div>
            </Col>
            <Col md="5">
              {array.length >= 3 && (
                <div className="about-image img-sm mt-9 mt-lg-0 aos-init aos-animate">
                  <LazyLoadImage
                    className="rounded-10"
                    src={
                      process.env.NEXT_PUBLIC_API_URL +
                      process.env.NEXT_PUBLIC_TYPO3_MEDIA +
                      array[2][1].url
                    }
                    alt="content Section"
                    effect="blur"
                  />
                </div>
              )}
            </Col>
            <Col xl="10">
              <div className="about-content mt-12 mt-lg-23">
                {data.textbottom && (
                  <p className="heading-text-9">{data.textbottom}</p>
                )}
              </div>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default ContentSection;
