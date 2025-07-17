"use client";

import Image from "next/image";
import React from "react";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";

const ImageDefault = (props) => {
  const { src, alt, title, description, className } = props;

  return (
    <>
      <LazyLoadComponent>
        <Image
          src={src}
          alt={alt}
          title={title}
          width={"546"}
          height={"390"}
          className={className}
        />
        {description && <p>{description}</p>}
      </LazyLoadComponent>
    </>
  );
};

export default ImageDefault;
