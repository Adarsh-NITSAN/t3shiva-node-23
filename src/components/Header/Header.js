"use client";

import React, { useRef, useEffect, useState, useContext } from "react";
import { useLocale } from "next-intl";
import { Container } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import Link from "next/link";
import GlobalContext from "../../context/GlobalContext";
import Offcanvas from "../Offcanvas";
import NestedMenu from "../NestedMenu";
import { device } from "../../utils";
import { getRoute } from "../../utils/Routes";
import Logo from "../Logo";
import SearchForm from "../Search/SearchForm";
import Select from "../Core/Select";
import { usePathname, useRouter } from "next/navigation";

const Header = ({ pageData }) => {
  const [showScrolling, setShowScrolling] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const gContext = useContext(GlobalContext);
  const headerEl = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  useEffect(() => {
    if (typeof document !== undefined) {
      document.addEventListener("click", function (e) {
        // setShowSearchForm(false);
      });
    }

    gContext.setHeader({
      ...gContext.header,
      height: headerEl.current.getBoundingClientRect().height,
    });
  }, []);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < 0) {
      setShowScrolling(true);
    } else {
      setShowScrolling(false);
    }
    if (currPos.y < -111) {
      setShowReveal(true);
    } else {
      setShowReveal(false);
    }
  });

  const handleLanguageChange = (value) => {
    localStorage.setItem("locale", value);
    router.refresh();
    router.push(value, pathname);
  };

  const checkIsActive = (children) => {
    let isActive = false;

    children.some((child, id) => {
      if (child.children && child.children.length) {
        child.children.some((subChild, subId) => {
          if (
            subChild.link === pathname ||
            subChild.link === `/de${pathname}`
          ) {
            isActive = true;
          }
        });
      }

      if (child.link === pathname || child.link === `/de${pathname}`) {
        isActive = true;
      }
    });

    return isActive;
  };

  const checkIsDisable = (children) => {
    return children.every((child) => {
      return parseInt(child.is_disable);
    });
  };

  return (
    <>
      <header
        className={`header site-header  site-header--absolute py-0 sticky-header ${
          gContext.header.align === "left"
            ? "site-header--menu-left "
            : gContext.header.align === "right"
            ? "site-header--menu-right "
            : "site-header--menu-center "
        }
        ${gContext.header.theme === "dark" ? "dark-mode-texts" : " "} ${
          showScrolling ? "scrolling" : ""
        } ${
          showReveal && gContext.header.theme === "dark"
            ? "reveal-header header-dark"
            : showReveal
            ? "reveal-header"
            : ""
        } ${gContext.header.button ? "side-header-w-button" : ""}`}
        ref={headerEl}
      >
        <Container
          fluid={gContext.header.isFluid}
          className={gContext.header.isFluid ? "pr-lg-9 pl-lg-9" : ""}
        >
          <nav className="navbar site-navbar offcanvas-active navbar-expand-lg px-0">
            <div className="brand-logo">
              <Logo white={gContext.header.theme === "dark"} />
            </div>
            <div className="collapse navbar-collapse">
              <div className="navbar-nav-wrapper">
                <ul className="navbar-nav main-menu d-none d-lg-inline-flex position-relative">
                  {gContext.menuItems &&
                    gContext.menuItems["data"]["navigation"][0]["children"].map(
                      (
                        {
                          link,
                          isExternal = false,
                          title,
                          children,
                          items,
                          is_disable,
                          // ...rest
                        },
                        index
                      ) => {
                        const hasSubItems =
                          children && children.length ? true : false;
                        return (
                          <React.Fragment key={title + index}>
                            {hasSubItems ? (
                              <li
                                className={`nav-item dropdown ${
                                  checkIsDisable(children) ? "no-submenu" : ""
                                }`}
                                // {...rest}
                              >
                                <Link
                                  href={`${link}`}
                                  className={`nav-link dropdown-toggle gr-toggle-arrow display-item-${is_disable} 
                                   ${checkIsActive(children) ? "text-blue" : ""}
                                  `}
                                  role="button"
                                  // data-toggle="dropdown"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  {title}
                                  <i className="icon icon-small-down"></i>
                                </Link>
                                <ul className="gr-menu-dropdown dropdown-menu">
                                  {children.map((subItem, indexSub) => {
                                    const hasInnerSubItems = Array.isArray(
                                      subItem.children
                                    );
                                    return (
                                      <React.Fragment
                                        key={subItem.title + indexSub}
                                      >
                                        {hasInnerSubItems ? (
                                          <li
                                            className={`drop-menu-item dropdown display-item-${
                                              subItem.is_disable
                                            } ${
                                              checkIsDisable(subItem.children)
                                                ? "no-submenu"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              href={`${subItem.link}`}
                                              className={`dropdown-toggle gr-toggle-arrow  ${
                                                checkIsActive(subItem.children)
                                                  ? "text-blue"
                                                  : ""
                                              }`}
                                              role="button"
                                              // data-toggle="dropdown"
                                              aria-current="page"
                                              data-bs-toggle="dropdown"
                                              // aria-haspopup="true"
                                              aria-expanded="false"
                                            >
                                              {subItem.title}
                                              <i className="icon icon-small-down"></i>
                                            </Link>
                                            <ul className="gr-menu-dropdown dropdown-menu dropdown-right third-level-menu">
                                              {subItem.children.map(
                                                (itemInner, indexInnerMost) => (
                                                  <li
                                                    className={`drop-menu-item 3rd display-item-${itemInner.is_disable}`}
                                                    key={
                                                      itemInner.link +
                                                      indexInnerMost
                                                    }
                                                  >
                                                    {itemInner.isExternal ? (
                                                      <a
                                                        href={`${itemInner.link}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                      >
                                                        {itemInner.title}
                                                      </a>
                                                    ) : (
                                                      <Link
                                                        href={`${itemInner.link}`}
                                                        className={`${
                                                          itemInner.link ===
                                                            pathname ||
                                                          itemInner.link ===
                                                            `/de${pathname}`
                                                            ? "text-blue"
                                                            : ""
                                                        }`}
                                                      >
                                                        {itemInner.title}
                                                      </Link>
                                                    )}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </li>
                                        ) : (
                                          <li
                                            className={`drop-menu-item item-2 display-item-${subItem.is_disable}`}
                                          >
                                            {subItem.isExternal ? (
                                              <Link
                                                href={`${subItem.link}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={subItem.title}
                                              >
                                                {subItem.title}
                                              </Link>
                                            ) : (
                                              <Link
                                                href={`${subItem.link}`}
                                                aria-label={subItem.title}
                                                className={`${
                                                  subItem.link === pathname ||
                                                  subItem.link ===
                                                    `/de${pathname}`
                                                    ? "text-blue"
                                                    : ""
                                                }`}
                                              >
                                                {subItem.title}
                                              </Link>
                                            )}
                                          </li>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                                </ul>
                              </li>
                            ) : (
                              <li
                                className="nav-item"
                                // {...rest}
                              >
                                {isExternal ? (
                                  <Link
                                    className="nav-link"
                                    href={`${link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {title}
                                  </Link>
                                ) : (
                                  <Link
                                    href={`${link}`}
                                    className={`nav-link ${
                                      link === pathname ? "text-blue" : ""
                                    }`}
                                    role="button"
                                    aria-expanded="false"
                                  >
                                    {title}
                                    {link === pathname}
                                  </Link>
                                )}
                              </li>
                            )}
                          </React.Fragment>
                        );
                      }
                    )}
                  <li
                    className="search"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSearchForm(!showSearchForm);
                    }}
                  >
                    <span className="nav-link">
                      <BsSearch></BsSearch>
                    </span>
                    {showSearchForm && (
                      <div className="search-form-wrapper">
                        <SearchForm setShowSearchForm={setShowSearchForm} />
                      </div>
                    )}
                  </li>
                  {gContext.languages &&
                    gContext.languages.length > 1 &&
                    pageData.data.i18n[1].available === 1 && (
                      <li className="nav-item d-none d-lg-flex align-items-center px-4">
                        {gContext.languages && (
                          <Select
                            className="header-select"
                            isSearchable={false}
                            tabIndex="-1"
                            onChange={(e) => handleLanguageChange(e.value)}
                            options={[
                              { value: "en", label: "EN" },
                              { value: "de", label: "DE " },
                            ]}
                            name="lang1"
                          />
                        )}
                      </li>
                    )}
                </ul>
              </div>
            </div>

            {gContext.header.button ? (
              <div className="header-btn ml-auto ml-lg-0 mr-6 mr-lg-0 d-none d-xl-block">
                <Link
                  href="/pages/contacts/contact-01"
                  className={`btn btn-${gContext.header.variant} btn-contact`}
                >
                  {gContext.header.buttonText}
                </Link>
              </div>
            ) : (
              ""
            )}

            <div className="d-flex align-items-center">
              {gContext.languages && pageData.data.i18n[1].available === 1 && (
                <Select
                  className="d-flex d-lg-none header-select"
                  isSearchable={false}
                  onChange={(e) => handleLanguageChange(e.value)}
                  options={[
                    { value: "en", label: "EN" },
                    { value: "de", label: "DE " },
                  ]}
                  instanceId="sel2345"
                  tabIndex="-1"
                  name="lang0"
                />
              )}
              <button
                className={`toggle-button navbar-toggler btn-close-off-canvas ml-5 ${
                  gContext.visibleOffCanvas ? "collapsed" : ""
                } ${gContext.header.theme === "dark" ? "is-dark" : "is-light"}`}
                type="button"
                data-toggle="collapse"
                data-target="#mobile-menu"
                aria-controls="mobile-menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={gContext.toggleOffCanvas}
              >
                <i className="icon icon-menu-34 icon-burger d-block"></i>
              </button>
            </div>
          </nav>
        </Container>
      </header>
      <Offcanvas
        className="site-offcanvas-menu d-lg-none"
        show={gContext.visibleOffCanvas}
        onHideOffcanvas={gContext.toggleOffCanvas}
      >
        <NestedMenu
          setShowSearchForm={setShowSearchForm}
          menuItems={gContext.menuItems}
        />
        {gContext.header.button ? (
          <div className="header-btn ml-auto ml-lg-0 mr-6 mr-lg-0 d-block">
            <Link
              href="/pages/contacts/contact-01"
              className={`btn btn-${gContext.header.variant} btn-contact`}
            >
              {gContext.header.buttonText}
            </Link>
          </div>
        ) : (
          ""
        )}
      </Offcanvas>
    </>
  );
};

export default Header;
