"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import CookieConsent from "react-cookie-consent";
import AOS from "aos";
import Header from "../Header";
import ModalVideo from "../ModalVideo";
import GlobalContext from "../../context/GlobalContext";
import { get, merge } from "lodash";
import { theme as baseTheme } from "../../utils";
import ThemeSwitcher from "../ThemeSwitcher";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Footer from "../Footer/Footer";

// options for different color modes
const modes = { light: "light", dark: "dark" };

// merge the color mode with the base theme
// to create a new theme object
const getTheme = (mode) =>
  merge({}, baseTheme, {
    colors: get(baseTheme.colors.modes, mode, baseTheme.colors),
  });

function getThemeVariable(themeVar) {
  const theme = JSON.parse(localStorage.getItem("theme"));

  if (theme && theme[themeVar]) {
    return theme[themeVar];
  } else {
    return false;
  }
}
const Layout = ({ children, pageContext, pageData, menuItems }) => {
  const {
    cookie,
    setCookie,
    setMenuItems,
    setLanguages,
    header,
    themeDark,
    headerDark,
    setHeader,
    setHeaderLogo,
    headerLogoDark,
    setHeaderLogoDark,
    footerLogo,
    boxedLayout,
    setFooterLogo,
    footerLogoLight,
    setFooterLogoLight,
    themeSwitcher,
    setThemeSwitcher,
    setBoxedLayout,
  } = useContext(GlobalContext);

  const [visibleLoader, setVisibleLoader] = useState(false);

  useEffect(() => {
    if (pageData && !pageData.error) {
      const { menu_align, is_fluid, is_dark, is_button } =
        pageData.data.page.appearance;
      const { boxedLayout } = pageData.data.page.constants.ns_style;

      const themeLS = JSON.parse(localStorage.getItem("theme"));
      if (
        themeLS &&
        (themeLS["boxedLayout"] === 0 || themeLS["boxedLayout"] === 1)
      ) {
        setBoxedLayout(getThemeVariable("boxedLayout"));
      } else {
        setBoxedLayout(parseInt(boxedLayout.value));
      }

      setHeader({
        ...header,
        theme: parseInt(is_dark) ? "dark" : "light",
        isFluid: parseInt(is_fluid),
        button: parseInt(is_button),
        align: menu_align,
      });

      setHeaderLogo(pageData.data.page.constants.ns_basetheme.logo.value);
      setHeaderLogoDark(
        pageData.data.page.constants.ns_basetheme.headerLogoDark.value
      );
      setFooterLogo(pageData.data.page.constants.ns_basetheme.footerLogo.value);
      setFooterLogoLight(
        pageData.data.page.constants.ns_basetheme.footerLogoLight.value
      );
    }
  }, [pageData]);

  useEffect(() => {
    if (pageData && !pageData.error) {
      const languages = pageData.data.i18n.map((language) => ({
        value: language.twoLetterIsoCode,
        label: language.twoLetterIsoCode.toUpperCase(),
      }));
      setLanguages(languages);

      setCookie(pageData.data.page.cookie);

      const {
        primaryColor,
        secondaryColor,
        tertiaryColor,
        textColor,
        fontSize,
        lineHeight,
        site_fonts_link,
        boxedLayout,
      } = pageData.data.page.constants.ns_style;

      const fontFamily =
        pageData.data.page.constants.ns_style["site_font_family_name"];

      const themeLS = JSON.parse(localStorage.getItem("theme"));
      if (
        themeLS &&
        (themeLS["boxedLayout"] === 0 || themeLS["boxedLayout"] === 1)
      ) {
        setBoxedLayout(getThemeVariable("boxedLayout"));
      } else {
        setBoxedLayout(parseInt(boxedLayout.value));
      }

      setThemeSwitcher({
        ...themeSwitcher,
        fontFamilyLink: getThemeVariable("fontFamilyLink")
          ? getThemeVariable("fontFamilyLink")
          : site_fonts_link.value,
        fontFamilyName: getThemeVariable("fontFamilyName")
          ? getThemeVariable("fontFamilyName")
          : fontFamily.value,
      });

      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty(
          "--primary",
          `${primaryColor.value}`
        );
        document.documentElement.style.setProperty(
          "--secondary",
          `${secondaryColor.value}`
        );
        document.documentElement.style.setProperty(
          "--red", //tertiary
          `${tertiaryColor.value}`
        );
        document.body.style.setProperty(
          "--color-headings",
          `${textColor.value}`
        );
        document.documentElement.style.setProperty(
          "--font-size",
          `${fontSize.value}px`
        );
        document.documentElement.style.setProperty(
          "--line-height",
          `${lineHeight.value}px`
        );
      }
    }
  }, []);

  useEffect(() => {
    if (document !== "undefined") {
      document.documentElement.style.setProperty(
        "--cookieBtnBgColor",
        `${cookie?.settings.palette.button.background}`
      );
      document.documentElement.style.setProperty(
        "--cookieBtnTextColor",
        `${cookie?.settings.palette.button.text}`
      );
    }
  }, [cookie]);

  useEffect(() => {
    setMenuItems(menuItems);
  }, [menuItems]);

  useEffect(() => {
    AOS.init({ once: true });
    // setVisibleLoader(false);
    const timeoutId = setTimeout(() => {
      setVisibleLoader(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Navbar style based on scroll
  const eleRef = useRef();

  const getClassName = (pageData) => {
    if (
      pageData &&
      pageData.data &&
      pageData.data.page &&
      pageData.data.meta.title &&
      pageData.data.page.navigation &&
      pageData.data.page.navigation.slug
    ) {
      const title = pageData.data.meta.title.toLowerCase();
      const navTitle = pageData.data.page.navigation.slug.slice(1)
        ? `${pageData.data.page.navigation.slug.slice(1)}-page`
        : "";
      if (title.split(" ").join("-") == "404") {
        return `not-found-page ${navTitle}`;
      } else {
        return `${title.split(" ").join("-")}-page ${navTitle}`;
      }
    } else {
      return "";
    }
  };

  if (pageContext.layout === "bare") {
    return (
      <div>
        <div data-theme-mode-panel-active data-theme="light">
          <div
            id="loading"
            // className={`loader ${visibleLoader ? "" : "inActive"}`}
          >
            <div className="load-circle">
              <span className="one"></span>
            </div>
          </div>
          <div className="site-wrapper overflow-hidden" ref={eleRef}>
            {children}
          </div>
          <ModalVideo />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        id="_layout"
        // theme={themeDark ? getTheme(modes.dark) : getTheme(modes.light)}
      >
        <div data-theme-mode-panel-active data-theme="light" className="test">
          <div
            className={`site-wrapper overflow-hidden ${
              boxedLayout ? " boxed" : ""
            } ${getClassName(pageData)}`}
            ref={eleRef}
          >
            <div className="site-inner">
              <Header pageData={pageData} isDark={headerDark} />
              {pageData && pageData.data && (
                <div
                  className={`title-section pb-14 pb-lg-20 pt-24 pt-lg-28 bg-default-2 display-item-${
                    pageData.data.page.appearance.page_header
                  } ${header.theme === "dark" ? "dark-title-section" : ""}`}
                >
                  <Container>
                    {pageData.data.page.appearance.page_header == 0 && (
                      <h1 className="title text-center heading-text-3 mb-7">
                        {pageData.data.meta.title}
                      </h1>
                    )}
                    {pageData.data.meta.subtitle && (
                      <p className="text-center mb-7">
                        {pageData.data.meta.subtitle}
                      </p>
                    )}
                  </Container>
                </div>
              )}
              {children}
              {pageData === null || visibleLoader === false ? null : (
                <LazyLoadComponent>
                  <Footer pageData={pageData} />
                </LazyLoadComponent>
              )}
              <ModalVideo />
              {pageData && pageData.data && (
                <ThemeSwitcher pageData={pageData} />
              )}
            </div>
          </div>
          {cookie && cookie.message && (
            <CookieConsent
              location="bottom"
              buttonText={cookie ? cookie.dismiss : ""}
              enableDeclineButton
              declineButtonText={cookie ? cookie.deny : ""}
              className="cookie-section"
              style={{
                background:
                  pageData && pageData.data
                    ? cookie.settings.palette.popup.background
                    : "#473bf0",
              }}
            >
              {cookie && (
                <p
                  className="mb-0"
                  style={{ color: `${cookie.settings.palette.popup.text}` }}
                >
                  {cookie.message}
                  {cookie && cookie.settings.url && (
                    <Link
                      href={`${cookie.settings.url}`}
                      className="mb-0 ml-5 text-white text-decoration-underline"
                    >
                      &nbsp;{("fjdhfs", cookie.link)}
                    </Link>
                  )}
                </p>
              )}
            </CookieConsent>
          )}
        </div>
      </div>
    </>
  );
};

export default Layout;
