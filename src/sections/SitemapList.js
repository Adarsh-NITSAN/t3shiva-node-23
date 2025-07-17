import React from "react";
import { Table, Container } from "react-bootstrap";
import convert from "xml-js";
import Link from "next/link";
import shortid from "shortid";

const SitemapList = ({ xml }) => {
  let options = { ignoreComment: true, alwaysChildren: true };
  let result = JSON.parse(convert.xml2json(xml.data, options));

  const renderXML = (data) => {
    if (!data.elements || !data.elements.length) return <>No data found!</>;

    return data.elements.map((element, id) => {
      if (element.type !== "element") return;

      return (
        <React.Fragment key={shortid.generate()}>
          {element.elements && element.elements.length ? (
            <>
              {element.elements.map((xmlOuterEl, xmlOuterId) => {
                return (
                  <>
                    {xmlOuterEl && xmlOuterEl.elements.length ? (
                      <>
                        {xmlOuterEl.elements.map((xmlEl, xmlElId) => {
                          if (xmlEl.name !== "loc") {
                            return (
                              <React.Fragment
                                key={shortid.generate()}
                              ></React.Fragment>
                            );
                          }

                          return (
                            <tr key={shortid.generate()}>
                              <td>
                                <Link href={`${xmlEl.elements[0].text}`}>
                                  {xmlEl.elements[0].text}
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <>in element elements length</>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <main>
      <Container>
        <div className="py-25">
          <div className="list-wrapper">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Page</th>
                </tr>
              </thead>
              <tbody>{renderXML(result)}</tbody>
            </Table>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default SitemapList;
