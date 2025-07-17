"use client";

import { useState } from "react";
import { Container, Fade } from "react-bootstrap";
import DOMPurify from "dompurify";


const CustomTab = ({ data }) => {
  let activeTab =
    data.accordions && Object.values(data.accordions).length
      ? Object.values(data.accordions)[0].question
      : "";
  const [active, setActive] = useState(activeTab);

  const renderLinks = (links) => {
    return links.map((link, id) => {
      return (
        <a
          href="/"
          className={`nav-item nav-link heading-text-7 fw-bold ${
            active === link.question ? "active" : ""
          }`}
          role="tab"
          aria-selected={active === link.question}
          onClick={(e) => {
            e.preventDefault();
            setActive(link.question);
          }}
          key={link.question}
        >
          {link.question}
        </a>
      );
    });
  };

  const renderTabs = (tabs) => {
    return tabs.map((tab, id) => {
      return (
        <Fade
          in={active === tab.question}
          role="tabpanel"
          className={`tab-pane ${active === tab.question ? "active" : ""}`}
          key={tab.answer}
        >
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(tab.answer),
              }}
            />
          </div>
        </Fade>
      );
    });
  };

  if (!data) return <>No data found!</>;

  return (
    <div className="pt-20">
      <Container>
        <nav className="pb-12">
          <div className="nav custom-nav-tabs " id="nav-tab" role="tablist">
            {data.accordions && Object.values(data.accordions).length
              ? renderLinks(Object.values(data.accordions))
              : ""}
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          {data.accordions && Object.values(data.accordions).length
            ? renderTabs(Object.values(data.accordions))
            : ""}
        </div>
      </Container>
    </div>
  );
};

export default CustomTab;
