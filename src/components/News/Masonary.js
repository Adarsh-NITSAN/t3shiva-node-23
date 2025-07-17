"use client";

import React from "react";
import { Container } from "react-bootstrap";
import shortid from "shortid";
import Link from "next/link";
import Masonry from "react-masonry-css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Masonary = ({ data }) => {
  const breakpointColumnsObj = {
    default: 3,
    1200: 3,
    992: 2,
    500: 1,
  };

  const images = (image) => {
    if (!image.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return image
      .map((img, id) => {
        return (
          <div key={img.properties.alternative} className="news-image">
            <LazyLoadImage
              effect="blur"
              src={img.images.defaultImage.publicUrl}
              alt={img.properties.alternative}
              title={img.properties.title}
              className="w-100"
            />
            {img.properties.description && <p>{img.properties.description}</p>}
          </div>
        );
      })
      .slice(0, 1);
  };

  const renderCols = (lists) => {
    return lists.map((list, id) => {
      return (
        <div className="location-card mb-9" key={list.slug}>
          {list.media && (
            <Link href={`${list.slug}`} className="card-img">
              <>
                <span className="sr-only">{list.teaser}</span>
                {list.media && images(Object.values(list.media))}
              </>
            </Link>
          )}
          <div className="card-content px-9 py-8 bg-default-2">
            <Link href={`${list.slug}`} title={data.title}>
              <ul className="news-category-list heading-text-11 mb-4 d-inline-flex flex-wrap">
                {list && list.categories && list.categories.length ? (
                  <React.Fragment>
                    {list.categories.map((category, id) => (
                      <div key={shortid.generate()}>
                        {category.title && (
                          <li className="mb-4 mr-5" key={shortid.generate()}>
                            {category.title}
                          </li>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </ul>
            </Link>
            <Link href={`${list.slug}`} title={data.title}>
              <h3 className="title heading-text-7 mb-0">
                {list.teaser && <React.Fragment>{list.teaser}</React.Fragment>}
              </h3>
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <Container data-aos="fade-left" data-aos-duration="1000">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid__column news-wrapper"
      >
        {data.data.list && renderCols(Object.values(data.data.list))}
      </Masonry>
    </Container>
  );
};

export default Masonary;
