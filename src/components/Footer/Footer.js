"use client";

import React, { useRef, useContext } from "react";
import FooterDefault from "./FooterDefault";
import FooterSecondary from "./FooterSecondary";
import FooterCurved from "./FooterCurved";

const Footer = ({ pageData }) => {

  let isDark;
  let addressText;
  let copyrightText;
  let footerLogo;
  let footerLogoLight;
  let emailId;
  let phoneNumber;
  let otherPhoneNumber;
  let twitterLink;
  let facebookLink;
  let linkedinLink;
  let instagramLink;
  let youtubeLink;
  let footerLayout;

  if (pageData && pageData.data) {
    isDark = parseInt(pageData.data.page.appearance.footer_is_dark);
    addressText = pageData.data.page.constants.ns_basetheme.address.value;
    copyrightText = pageData.data.page.constants.ns_basetheme.copyright.value;
    footerLogo =
      process.env.NEXT_PUBLIC_API_URL +
      process.env.NEXT_PUBLIC_TYPO3_MEDIA +
      pageData.data.page.constants.ns_basetheme.footerLogo.value;
    footerLogoLight =
      process.env.NEXT_PUBLIC_API_URL +
      process.env.NEXT_PUBLIC_TYPO3_MEDIA +
      pageData.data.page.constants.ns_basetheme.footerLogoLight.value;
    emailId = pageData.data.page.constants.ns_basetheme.emailId.value;
    phoneNumber = pageData.data.page.constants.ns_basetheme.phoneNumber.value;
    otherPhoneNumber =
      pageData.data.page.constants.ns_basetheme.otherPhoneNumber.value;
    twitterLink = pageData.data.page.constants.ns_seo.seo_twitter_link.value;
    facebookLink = pageData.data.page.constants.ns_seo.seo_facebook_link.value;
    linkedinLink = pageData.data.page.constants.ns_seo.seo_linkedin_link.value;
    instagramLink =
      pageData.data.page.constants.ns_seo.seo_instagram_link.value;
    youtubeLink = pageData.data.page.constants.ns_seo.seo_youtube_link.value;
    footerLayout =
      pageData.data.page.constants.ns_basetheme.footer_layout.value;
  }

  const footerData = {
    isDark,
    addressText,
    copyrightText,
    footerLogo,
    footerLogoLight,
    emailId,
    phoneNumber,
    otherPhoneNumber,
    twitterLink,
    facebookLink,
    linkedinLink,
    instagramLink,
    youtubeLink,
    footerLayout,
  };

  const renderFooter = (footerLayout) => {
    switch (footerLayout) {
      case "Footer_default":
        return <FooterDefault footerData={footerData} />;
      case "Footer_secondary":
        return <FooterSecondary footerData={footerData} />;
      case "Footer_curved":
        return <FooterCurved footerData={footerData} />;
      default:
        return <></>;
    }
  };

  return <>{renderFooter(footerLayout)}</>;
};

export default Footer;
