"use client";

import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import shortid from "shortid";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import GlobalContext from "../../context/GlobalContext";

const NewsList = ({ data }) => {
  const { windowWidth } = useContext(GlobalContext);

  return (
    <Container data-aos="fade-left" data-aos-duration="1000">
      <ul
        className={`news-wrapper news-list-view ${
          windowWidth > 768 ? "list-view" : ""
        }`}
      >
        {data.data.list && (
          <React.Fragment>
            {Object.entries(data.data.list).map((content, key) => (
              <React.Fragment key={key}>
                {(() => {
                  let imageURL =
                    content[1].media && content[1].media.length
                      ? content[1].media[0].images.defaultImage.publicUrl
                      : "";
                  return (
                    <li>
                      <div className="location-card mb-9">
                        {imageURL && (
                          <Link
                            href={`${content[1].slug}`}
                            className="card-img"
                          >
                            <>
                              <span className="sr-only">
                                {content[1].teaser}
                              </span>

                              <LazyLoadImage
                                effect="blur"
                                src={imageURL}
                                alt="Image"
                                className="news-list__image"
                              />
                            </>
                          </Link>
                        )}
                        <div className="card-content px-9 py-8 bg-default-2">
                          <Link
                            href={`${content[1].slug}`}
                            className="news-list-link"
                            title={"news link"}
                          >
                            <>
                              <h3 className="title text-blackish-blue heading-text-7 mb-0">
                                {content[1].teaser && (
                                  <React.Fragment>
                                    {content[1].teaser}
                                  </React.Fragment>
                                )}
                              </h3>
                            </>
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })()}
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </ul>
    </Container>
  );
};

export default NewsList;
