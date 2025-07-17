"use client";

import React from "react";
import shortid from "shortid";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NewsItem = ({ data, layout }) => {
  const images = (image) => {
    if (!image.length) {
      // return <>No Data Found!</>;
      return <></>;
    }
    return image
      .map((img, id) => {
        return (
          <div key={id} className="news-image">
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
  return (
    <div
      className={`location-card ${
        layout === "no_margin" || layout === "no_margin_full_width"
          ? ""
          : "mb-9"
      }`}
    >
      {data.media && (
        <Link href={`${data.slug}`} className="card-img">
          <>
            {data.slug && <span className="sr-only">{data.slug}</span>}
            {data.media && images(Object.values(data.media))}
          </>
        </Link>
      )}
      <div className="card-content px-9 py-8 bg-default-2">
        <Link href={`${data.slug}`} title={data.title}>
          {data && data.categories && data.categories.length ? (
            <ul className="heading-text-11 d-inline-flex flex-wrap news-category-list">
              {data.categories.map((category, id) => (
                <React.Fragment key={shortid.generate()}>
                  {category.title && (
                    <li className="mb-4 mr-5">{category.title}</li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          ) : (
            ""
          )}
        </Link>
        <Link href={`${data.slug}`} title={data.title}>
          {data.teaser && (
            <h3 className="title heading-text-7 mb-0">{data.teaser}</h3>
          )}
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
