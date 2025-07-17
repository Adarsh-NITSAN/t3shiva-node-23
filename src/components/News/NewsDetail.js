"use client";

import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col, Container } from "react-bootstrap";
import React from "react";
import DOMPurify from "dompurify";
import shortid from "shortid";

const NewsDetail = ({ data }) => {
    const imageNews =
        data.detail && data.detail.media && data.detail.media.length
            ? data.detail.media[0].images.detailViewImage.publicUrl
            : "";

    const images = (image) => {
        if (!image.length) {
            // return <>No Data Found!</>;
            return <></>;
        }
        return image.map((img, id) => {
            return (
                <div key={id}>
                    {img.properties.link ? (
                        <Link href={`${img.properties.link}`} className="image-wrap">
                            <>
                                <span className="sr-only">{img.link}</span>
                                <LazyLoadImage
                                    effect="blur"
                                    src={img.images.defaultImage.publicUrl}
                                    alt={img.properties.alternative}
                                    title={img.properties.title}
                                    className="img-fluid w-100 rounded-8"
                                    key={id}
                                />
                            </>
                        </Link>
                    ) : (
                        <LazyLoadImage
                            effect="blur"
                            src={img.images.defaultImage.publicUrl}
                            alt={img.properties.alternative}
                            title={img.properties.title}
                            className="img-fluid w-100 rounded-8"
                            key={id}
                        />
                    )}

                    {img.properties.description && <p>{img.properties.description}</p>}
                </div>
            );
        });
    };

    return (
        <>
            <div className="inner-banner pt-15 pt-lg-30 pb-6 pb-lg-8 bg-default-6">
                <Container>
                    <Row className="justify-content-center pt-5">
                        <Col xl="8" lg="9">
                            <div className="px-md-15 text-center">
                                <h2 className="title heading-text-2 mb-8 mb-lg-10">
                                    {data.detail.title && (
                                        <React.Fragment>{data.detail.title}</React.Fragment>
                                    )}
                                </h2>
                                <ul className="d-inline-flex flex-wrap news-category-list justify-content-center heading-text-7 mb-8 mb-lg-13">
                                    {data.detail &&
                                        data.detail.categories &&
                                        data.detail.categories.length &&
                                        data.detail.categories[0].title ? (
                                        <React.Fragment>
                                            {/* {data.detail.categories[0].title} */}
                                            {data.detail.categories.map((category, id) => (
                                                <>
                                                    {category.title && (
                                                        <li className="mb-4 mr-5" key={shortid.generate()}>
                                                            {category.title}
                                                        </li>
                                                    )}
                                                </>
                                            ))}
                                        </React.Fragment>
                                    ) : (
                                        ""
                                    )}
                                </ul>
                            </div>
                            <div
                                className="hero-img single-news-hero-img"
                                data-aos="fade-left"
                                data-aos-duration="750"
                                data-aos-delay="500"
                            >
                                {data.detail.media && images(Object.values(data.detail.media))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="main-block single-news-block pb-6 pb-lg-17 bg-default-6">
                <Container>
                    <Row className="justify-content-center">
                        <Col xl="8" lg="9">
                            <div className="single-block mb-12 mb-lg-10">
                                <p className="heading-text-6 mb-0 mb-lg-13">
                                    {data.detail.teaser && (
                                        <React.Fragment>{data.detail.teaser}</React.Fragment>
                                    )}
                                </p>
                                {data.detail.bodytext && (
                                    <div
                                        dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(data.detail.bodytext)}}
                                        className="ce-bodytext"
                                    />
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};
export default NewsDetail;