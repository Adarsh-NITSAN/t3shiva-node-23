import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const Parallax = ({ data }) => {
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
      <LazyLoadComponent>
        {data.image && (
          <div
            className="cta-section parallax-section-750 bg-parallax-image"
            style={{
              backgroundImage: `url(${images(Object.values(data.image))})`,
            }}
          >
            testing
          </div>
        )}
      </LazyLoadComponent>
    </>
  );
};

export default Parallax;
