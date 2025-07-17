import React, { useContext } from "react";
import Link from "next/link";
import GlobalContext from "../../context/GlobalContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Image from "next/image";

const Logo = ({ white, height, className = "", ...rest }) => {
  const gContext = useContext(GlobalContext);
  const headerLogo = gContext.headerLogo
    ? process.env.NEXT_PUBLIC_API_URL +
      process.env.NEXT_PUBLIC_TYPO3_MEDIA +
      gContext.headerLogo
    : "/image/logo-main-black.png";
  const headerLogoDark = gContext.headerLogoDark
    ? process.env.NEXT_PUBLIC_API_URL +
      process.env.NEXT_PUBLIC_TYPO3_MEDIA +
      gContext.headerLogoDark
    : "/image/logo-main-white.png";

  return (
    <Link href="/" className={`d-block ${className}`} {...rest}>
      {white ? (
        <Image
          src={headerLogoDark}
          alt="T3Shiva"
          width="132"
          height="30"
          effect="blur"
        />
      ) : (
        <Image
          src={headerLogo}
          alt="T3Shiva"
          width="132"
          height="30"
          effect="blur"
        />
      )}
    </Link>
  );
};

export default Logo;
