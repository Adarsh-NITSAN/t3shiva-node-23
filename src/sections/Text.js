"use client";

import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { atelierCaveDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Row, Col, Container } from "react-bootstrap";
import DOMPurify from "dompurify";
import Link from "next/link";

const Code = ({ mdText }) => {
  const [text, setText] = useState("");
  const reg = /(\<pre.*?\>)/gi;
  let decodeEntities = () => "lorem ipsum";
  var lang;

  useEffect(() => {
    lang = mdText.split("language-")[1].split(">")[0].slice(0, -1);

    decodeEntities = (function () {
      var element = document.createElement("div");

      function decodeHTMLEntities(str) {
        if (str && typeof str === "string") {
          // strip script/html tags
          str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
          str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
          element.innerHTML = str;
          str = element.textContent;
          element.textContent = "";
        }

        return str;
      }

      return decodeHTMLEntities;
    })();

    if (lang === "html") {
      setText(mdText.replace(reg, "").replace("</pre>", ""));
    } else {
      setText(decodeEntities(mdText.replace(reg, "").replace("</pre>", "")));
    }
  }, []);

  if (mdText.includes("code-dark")) {
    return (
      <SyntaxHighlighter style={atelierCaveDark} language={`${lang}`}>
        {text}
      </SyntaxHighlighter>
    );
  } else if (mdText.includes("code-light")) {
    return (
      <SyntaxHighlighter style={docco} language={`${lang}`}>
        {text}
      </SyntaxHighlighter>
    );
  }
};

const renderText = (mdText) => {
  if (mdText.includes("code-dark") || mdText.includes("code-light")) {
    return <Code mdText={mdText} />;
  } else {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mdText) }}
        className="ce-bodytext"
      />
    );
  }
};

const Text = ({ data }) => {
  const CustomComponent = `${
    data.headerLayout === 0 ? "p" : `h${data.headerLayout}`
  }`;

  return (
    <>
      <Container>
        <Row>
          <Col lg="12" xl="12">
            <div className="px-lg-8 px-xl-3">
              <div className="single-block mb-11">
                {(data.header || data.subheader) && (
                  <div className={`header-wrapper text-${data.headerPosition}`}>
                    <CustomComponent className="heading-text-3 mb-5">
                      {data?.headerLink ? (
                        <Link
                          href={data?.headerLink?.href}
                          className="heading-with-link"
                        >
                          {data.header}
                        </Link>
                      ) : (
                        <>{data.header}</>
                      )}
                    </CustomComponent>
                    {data.subheader && (
                      <p className="heading-text-8 mb-0">{data.subheader}</p>
                    )}
                  </div>
                )}
                {data.bodytext && renderText(data.bodytext)}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Text;
