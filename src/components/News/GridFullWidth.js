"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NewsItem from "./NewsItem";

const GridFullWidth = ({ data, layout }) => {
  const renderCols = (lists) => {
    return lists.map((list, id) => {
      return (
        <Col
          sm="6"
          md="4"
          lg="3"
          className={`${
            layout === "no_margin" || layout === "no_margin_full_width"
              ? "px-0"
              : ""
          }`}
          key={id}
        >
          <NewsItem data={list} layout={layout} />
        </Col>
      );
    });
  };

  return (
    <Container fluid data-aos="fade-left" data-aos-duration="1000">
      <Row
        className={`${
          layout === "no_margin" || layout === "no_margin_full_width"
            ? "mx-0"
            : ""
        }`}
      >
        {data.data.list && data.data.list.length
          ? renderCols(data.data.list)
          : ""}
      </Row>
    </Container>
  );
};

export default GridFullWidth;
