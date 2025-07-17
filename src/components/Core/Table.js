"use client";

import { Table, Container } from "react-bootstrap";
import shortid from "shortid";

const CustomTable = ({ data }) => {
  const renderHeader = (header) => <th key={header}>{header}</th>;

  const renderData = (d) => {
    const filterData = [...d];
    filterData.splice(0, 1);

    return filterData.map((row, id) => {
      return (
        <tr key={shortid.generate()}>
          {row.map((cell, id) => (
            <td key={shortid.generate()}>{cell}</td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div className="table-section">
      <Container>
        <div className="section-title mb-10">
          <h2 className="title heading-text-4">{data.header}</h2>
        </div>
        <Table responsive="sm">
          <thead>
            <tr>
              {data.bodytext &&
                data.bodytext.length &&
                data.bodytext[0].map((header, id) => renderHeader(header))}
            </tr>
          </thead>
          <tbody>
            {data.bodytext && data.bodytext.length && renderData(data.bodytext)}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default CustomTable;
