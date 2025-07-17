"use client";

import React from "react";
import shortid from "shortid";
import { Container } from "react-bootstrap";

const List = ({ data }) => {
  const renderLists = (lists) => {
    if (!lists || !lists.length) {
      return <></>;
    }

    return lists.map((list, id) => <li key={shortid.generate()}>{list}</li>);
  };

  return (
    <Container>
      {data.header && (
        <div className="section-title mb-8">
          <h2 className="title heading-text-4">{data.header}</h2>
        </div>
      )}
      <div className="ce-bodytext">
        <ul>{renderLists(data.bodytext)}</ul>
      </div>
    </Container>
  );
};

export default List;
