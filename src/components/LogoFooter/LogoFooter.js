import React, { useContext } from "react";
import Link from "next/link";
import GlobalContext from "../../context/GlobalContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Logo = ({ white, height, className = "", ...rest }) => {
  const gContext = useContext(GlobalContext);
  const footerLogo =
    process.env.NEXT_PUBLIC_API_URL +
    process.env.NEXT_PUBLIC_TYPO3_MEDIA +
    gContext.footerLogo;
  const footerLogoLight =
    process.env.NEXT_PUBLIC_API_URL +
    process.env.NEXT_PUBLIC_TYPO3_MEDIA +
    gContext.footerLogoLight;

  return (
    <Link href="/" className={`d-block ${className}`} {...rest}>
      {white ? (
        <LazyLoadImage
          src={footerLogo}
          alt="T3Shiva Footer dark"
          width="132"
          height="30"
          effect="blur"
        />
      ) : (
        <LazyLoadImage
          src={footerLogoLight}
          alt="T3Shiva Footer light"
          width="132"
          height="30"
          effect="blur"
        />
      )}
    </Link>
  );
};

export default Logo;
