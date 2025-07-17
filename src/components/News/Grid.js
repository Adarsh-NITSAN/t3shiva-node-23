"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NewsItem from "./NewsItem";

const Grid = ({ data, layout }) => {
  const getLgCols = (layout) => {
    if (layout === "four_column") {
      return "3";
    } else {
      return "4";
    }
  };

  const renderCols = (lists) => {
    return lists.map((list, id) => {
      return (
        <Col
          sm="6"
          md="4"
          lg={`${getLgCols(layout)}`}
          key={id}
          className={`${
            layout === "no_margin" || layout === "no_margin_full_width"
              ? "px-0"
              : ""
          }`}
        >
          <NewsItem data={list} layout={layout} />
        </Col>
      );
    });
  };

  return (
    <Container>
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

export default Grid;
