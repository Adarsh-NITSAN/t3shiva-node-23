import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GlobalContext from "../context/GlobalContext";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const Video = ({ data }) => {
  const gContext = useContext(GlobalContext);
  const images = (image) => {
    if (!image.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return image.map((img, id) => {
      return (
        process.env.NEXT_PUBLIC_API_URL +
        process.env.NEXT_PUBLIC_TYPO3_MEDIA +
        img.url
      );
    });
  };
  return (
    <>
      {/* <!-- Video Area --> */}
      <LazyLoadComponent>
        <div
          className="video-section py-23 py-lg-31 dark-mode-texts "
          style={{
            backgroundImage: `url(${
              data.image && images(Object.values(data.image))
            })`,
          }}
        >
          <Container>
            <Row className="align-items-center justify-content-center">
              <Col xl="6" lg="8" md="10">
                <div className="text-center video-content">
                  <a
                    href="#javascript"
                    className="video-play-icon mx-auto circle-md bg-white mb-9 gr-hover-y focus-reset"
                    onClick={(e) => {
                      e.preventDefault();
                      gContext.toggleVideoModal();
                      gContext.setVideoModalURL(`${data.video}`);
                    }}
                  >
                    <span className="sr-only">play</span>
                    <i className="icon icon-triangle-right-17-2 pl-1"></i>
                  </a>
                  <div className="section-title">
                    <h2 className="title heading-text-4 mb-5">
                      {data["headline"] && (
                        <React.Fragment>{data.headline}</React.Fragment>
                      )}
                    </h2>
                    <p className="heading-text-8 mb-0 px-lg-7 px-xl-0">
                      {data["text"] && (
                        <React.Fragment>{data.text}</React.Fragment>
                      )}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </LazyLoadComponent>
    </>
  );
};
export default Video;
