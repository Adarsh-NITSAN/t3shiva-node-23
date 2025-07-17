"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import LogoFooter from "../LogoFooter/LogoFooter";
import { LazyLoadImage } from "react-lazy-load-image-component";

const FooterCurved = ({ footerData }) => {
  const {
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
  } = footerData;

  const linkClassName = isDark
    ? "gr-text-color gr-hover-text-green"
    : "gr-text-color gr-hover-text-blue";

  const iconClassName = isDark
    ? "text-storm gr-hover-text-green"
    : "gr-text-color gr-hover-text-blue";

  return (
    <footer
      className={`footer-section ${
        isDark ? "dark-mode-texts bg-blackish-blue" : ""
      }`}
    >
      <Container>
        <div className="footer-top pt-20 pt-lg-25 pb-lg-12">
          <Row>
            <Col xs="12" md="4" className="pr-lg-15">
              <div className="footer-info">
                {footerLogo && (
                  <p className="mb-11">
                    <LogoFooter white={isDark} className="footer-logo mb-11" />
                  </p>
                )}
                {addressText && (
                  <p className="heading-text-11">{addressText}</p>
                )}
              </div>
            </Col>
            <Col sm="6" md="4" className="pl-lg-15">
              <div className="single-footer mb-13 mb-lg-9">
                <p className="footer-title heading-text-11 mb-7">Contact us</p>
                <ul className="footer-list list-unstyled">
                  {emailId && (
                    <li className="py-2">
                      <a
                        className={`heading-text-9 fw-bold hover-underline active gr-text-color ${linkClassName}`}
                        href={`mailto:${emailId}`}
                      >
                        {emailId}
                      </a>
                    </li>
                  )}
                  {phoneNumber && (
                    <li className="py-2">
                      <a
                        className={`heading-text-9 fw-bold hover-underline active gr-text-color ${linkClassName}`}
                        href={`tel:${phoneNumber}`}
                      >
                        {phoneNumber}
                      </a>
                    </li>
                  )}
                  {otherPhoneNumber && (
                    <li className="py-2">
                      <a
                        className={`heading-text-9 fw-bold hover-underline active gr-text-color ${linkClassName}`}
                        href={`tel:${otherPhoneNumber}`}
                      >
                        {otherPhoneNumber}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </Col>
            <Col xs="6" md="4">
              <div className="single-footer mb-13 mb-lg-9">
                <p className="footer-title heading-text-11 mb-7">Follow Us</p>
                <ul className="social-icons list-unstyled mb-0">
                  {twitterLink && (
                    <li className="mr-5">
                      <a
                        href={`${twitterLink}`}
                        className={`gr-text-color ${iconClassName}`}
                        target="_blank"
                      >
                        <span className="sr-only">twitter</span>
                        <i className="icon icon-logo-twitter"></i>
                      </a>
                    </li>
                  )}
                  {facebookLink && (
                    <li className="mr-5">
                      <a
                        href={`${facebookLink}`}
                        className={`gr-text-color ${iconClassName}`}
                        target="_blank"
                      >
                        <span className="sr-only">facebook</span>
                        <i className="icon icon-logo-facebook"></i>
                      </a>
                    </li>
                  )}
                  {linkedinLink && (
                    <li className="mr-5">
                      <a
                        href={`${linkedinLink}`}
                        className={`gr-text-color ${iconClassName}`}
                        target="_blank"
                      >
                        <span className="sr-only">linkedin</span>
                        <i className="icon icon-logo-linkedin"></i>
                      </a>
                    </li>
                  )}
                  {youtubeLink && (
                    <li className="mr-5">
                      <a
                        href={`${youtubeLink}`}
                        className={`gr-text-color ${iconClassName}`}
                        target="_blank"
                      >
                        <span className="sr-only">youtube</span>
                        <i className="icon icon-triangle-right-17-2"></i>
                      </a>
                    </li>
                  )}
                  {instagramLink && (
                    <li className="mr-5">
                      <a
                        href={`${instagramLink}`}
                        className={`gr-text-color ${iconClassName}`}
                        target="_blank"
                      >
                        <span className="sr-only">instagram</span>
                        <i className="icon icon-instant-camera-2"></i>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </Col>
          </Row>
        </div>
        <div className="copyright-area border-top py-9">
          <Row className="align-items-center">
            <Col lg="12">
              {copyrightText && (
                <p className="copyright-text heading-text-11 mb-6 mb-lg-0 text-center gr-text-color-opacity">
                  <React.Fragment>{copyrightText}</React.Fragment>
                </p>
              )}
            </Col>
          </Row>
        </div>
      </Container>
      <div className="footer-curve wave-shape gr-abs-br">
        <>
          {isDark ? (
            <LazyLoadImage
              src="/image/svg/l6-footer-wave-dark.svg"
              alt="Dark curve"
              effect="blur"
            />
          ) : (
            <LazyLoadImage
              src="/image/svg/l6-footer-wave.svg"
              alt="Light curve"
              effect="blur"
            />
          )}
        </>
      </div>
    </footer>
  );
};

export default FooterCurved;
