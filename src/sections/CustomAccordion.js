import DOMPurify from "dompurify";
import React from "react";
import { Accordion, Container } from "react-bootstrap";

const CustomAccordion   = ({ data }) => {
  return (
    <section className="bg-white pt-15 pt-lg-29 pb-9 pb-lg-22">
      <Container>
        <div className="px-md-12 text-center mb-9 mb-lg-18">
          {data.headline && (
            <h2 className="text-center gr-text-3 mb-9">{data.headline}</h2>
          )}
          {data.subheadline && (
            <p className="text-center gr-text-8 mb-0">{data.subheadline}</p>
          )}
        </div>
        {Object.values(data.accordionItem).length !== 0 && (
          <Accordion defaultActiveKey={0}>
            {Object.values(data.accordionItem).map((item, index) => {
              return (
                <Accordion.Item
                  key={index}
                  eventKey={index}
                  className="border rounded-10 mb-3 bg-white overflow-hidden"
                >
                  {item.title && (
                    <Accordion.Header className="mb-0 py-8 pl-9 pr-7 border-bottom-0 bg-white ">
                      {item.title}
                    </Accordion.Header>
                  )}
                  {item.content && (
                    <Accordion.Body
                      className="pt-0 pl-9 pr-15 heading-text-9 pb-9"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.content),
                      }}
                    />
                  )}
                </Accordion.Item>
              );
            })}
          </Accordion>
        )}
      </Container>
    </section>
  );
};

export default CustomAccordion;
