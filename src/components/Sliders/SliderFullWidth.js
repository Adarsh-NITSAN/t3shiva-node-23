"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container, Carousel } from "react-bootstrap";
import DOMPurify from "dompurify";


const SliderFullWidth = ({ data }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const renderSlides = (slides) => {
    return slides.map((slide, id) => {
      return (
        <Carousel.Item
          key={id}
          className={`${
            slide.titletext || slide.subText || slide.buttonlabel
              ? "with-text "
              : ""
          } py-12 py-md-20 py-lg-25`}
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${slide.image[0]})`,
          }}
        >
          <div className="carousel-item-inner d-flex justify-content-center align-items-center">
            <Container>
              <Carousel.Caption>
                {slide.titletext && (
                  <div className="text-white mb-5 mb-lg-8 slide-heading">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(slide.titletext),
                      }}
                      className="title heading-text-1 mb-8 text-white"
                    />
                  </div>
                )}
                {slide.subText && (
                  <p className="text-white slide-text">{slide.subText}</p>
                )}
                {slide.buttonlabel && slide.buttonlink && (
                  <Link
                    href={`${slide.buttonlink}`}
                    className="btn bg-primary text-white gr-hover-y mt-5"
                  >
                    {slide.buttonlabel}
                  </Link>
                )}
              </Carousel.Caption>
            </Container>
          </div>
        </Carousel.Item>
      );
    });
  };

  return (
    <div className="slider-full-width-section slider-section">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={
          data.pi_flexform_content.slides &&
          Object.values(data.pi_flexform_content.slides).length &&
          Object.values(data.pi_flexform_content.slides).length > 1
            ? true
            : false
        }
        indicators={
          data.pi_flexform_content.slides &&
          Object.values(data.pi_flexform_content.slides).length &&
          Object.values(data.pi_flexform_content.slides).length > 1
            ? true
            : false
        }
      >
        {data.pi_flexform_content.slides &&
        Object.values(data.pi_flexform_content.slides).length ? (
          renderSlides(Object.values(data.pi_flexform_content.slides))
        ) : (
          <>No slides found</>
        )}
      </Carousel>
      {(data.headline || data.text) && (
        <div className="content-section pt-14 pt-lg-20 pb-7 pb-lg-15">
          <Container>
            <div className="section-title mb-13">
              {data.headline && (
                <h2 className="title heading-text-4">{data.headline}</h2>
              )}
              {data.text && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data.text),
                  }}
                />
              )}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default SliderFullWidth;
