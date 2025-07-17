"use client";

import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Image = ({ data }) => {
  const publicUrl = data.gallery.rows["1"].columns["1"].publicUrl;
  const properties = data.gallery.rows["1"].columns["1"].properties;
  return (
    <>
      <div className="inner-banner">
        <Container>
          <Row className="mt-md-6 pt-20">
            <Col md="12" sm="12">
              <div className="banner-fluid-image">
                {properties.link ? (
                  <>
                    {publicUrl && (
                      <Link href={`${properties.link}`} className="image-wrap">
                        <>
                          <span className="sr-only">{properties.link}</span>
                          <LazyLoadImage
                            effect="blur"
                            src={publicUrl}
                            alt={properties.alternative}
                            title={properties.title}
                            className="w-100 rounded-8"
                          />
                        </>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    {publicUrl && (
                      <LazyLoadImage
                        effect="blur"
                        src={publicUrl}
                        alt={properties.alternative}
                        title={properties.title}
                        className="w-100 rounded-8"
                      />
                    )}
                  </>
                )}
                {properties.description && (
                  <p className="img-caption">{properties.description}</p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Image;
