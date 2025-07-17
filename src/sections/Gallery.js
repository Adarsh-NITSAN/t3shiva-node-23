import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import FancyBox from "@/components/Core/FanyBox";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Gallery = ({ data }) => {
  const renderCols = (row, images) => {
    if (row == "gallery-1") {
      return images.map((image, id) => {
        return (
          <Col key={id} lg="6" md="6" sm="6" xs="12" className="mb-8">
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${image.url}`}
              data-fancybox="gallery"
              title=""
              target="_self"
            >
              <LazyLoadImage
                src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${image.url}`}
                alt={image.title}
                title={image.title}
                key={image + row + id}
                className="img-fluid"
                effect="blur"
              />
              {image.title && <h5 className="mt-4">{image.title}</h5>}
            </Link>
          </Col>
        );
      });
    } else if (row === "gallery-2") {
      return images.map((image, id) => {
        return (
          <Col key={id} lg="4" md="6" sm="6" xs="12" className="mb-8">
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${image.url}`}
              data-fancybox="gallery"
              title=""
              target="_self"
            >
              <LazyLoadImage
                src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${image.url}`}
                alt={image.title}
                title={image.title}
                key={image + row + id}
                className="img-fluid"
                effect="blur"
              />
              {image.title && <h5 className="mt-4">{image.title}</h5>}
            </Link>
          </Col>
        );
      });
    } else {
      return images.map((image, id) => {
        return (
          <Col key={id} lg="3" md="6" sm="6" xs="12" className="mb-8">
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${image.url}`}
              data-fancybox="gallery"
              title=""
              target="_self"
            >
              <LazyLoadImage
                src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${image.url}`}
                alt={image.title}
                title={image.title}
                key={image + row + id}
                className="img-fluid"
                effect="blur"
              />
              {image.title && <h5 className="mt-4">{image.title}</h5>}
            </Link>
          </Col>
        );
      });
    }
  };

  return (
    <FancyBox
      options={{
        Carousel: {
          infinite: false,
        },
        hideScrollbar: false,
      }}
    >
      <div className="lightbox-section pt-20">
        <Container>
          <h2 className="title heading-text-4 mb-9 mb-lg-12">
            {data.headline}
          </h2>
          <Row>
            {data.image && Object.values(data.image).length
              ? renderCols(data.imagePerRow, Object.values(data.image))
              : ""}
          </Row>
        </Container>
      </div>
    </FancyBox>
  );
};

export default Gallery;
