"use client";

import React, { useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import ContentType from "@/utils/ContentType";
import { Container, Row } from "react-bootstrap";
import SitemapList from "@/sections/SitemapList";

const headerConfigDefault = {
  theme: "light",
  variant: "primary",
  align: "right",
  isFluid: false,
  button: null, // trial, cart, cta, account, null
  buttonText: "Get In Touch", // trial, cart, cta, account, null
};

const footerConfigDefault = {
  theme: "dark",
  style: "style2", //style1, style2, style3
};

const PageWrapper = ({
  children,
  headerConfig = null,
  footerConfig = null,
  pageData,
  xmlData,
  menuItems,
}) => {
  return (
    <>
      {xmlData
        ? xmlData && <SitemapList xml={xmlData} />
        : (pageData && pageData.error && (
            <div
              className="content-section border-bottom pt-11 pb-7 pt-lg-30 pb-lg-28 bg-default-6"
              id="notfound"
            >
              <Container>
                <Row className="justify-content-center notfound">
                  <div className="col-xl-6 col-lg-8 col-sm-10">
                    <div className="section-title text-center mt-12 mt-lg-20 mb-12 mb-lg-23">
                      <div className="notfound-404"></div>
                      {/* <div></div> */}
                      <h1 className="title mb-6">500</h1>
                      <h2>Oops! Server Not Connected</h2>
                      <p className="heading-text-8 px-lg-7 px-xl-0">
                        Error: Not able to connect your TYPO3 CMS!
                      </p>
                      <a
                        href="https://docs.t3terminal.com/en/latest/"
                        target="_blank"
                      >
                        Get Help From Documentation
                      </a>
                    </div>
                  </div>
                </Row>
              </Container>
            </div>
          ),
          !pageData && <div>Loading...</div>,
          pageData && (
            <main>
              <ContentType pageContentProps={pageData} />
            </main>
          ))}
    </>
  );
};

export default PageWrapper;
