import React from "react";
import { Container } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Upload = ({ data }) => {
  const renderFilelists = (displayInformation) => {
    const type = parseInt(displayInformation);

    if (type === 1) {
      return data.media.map((m, id) => {
        return (
          <div key={m.publicUrl + id} className="py-2">
            {
              <LazyLoadImage
                src={`/image/FileIcons/${String(m.properties.filename).slice(
                  String(m.properties.filename).indexOf(".") + 1
                )}.gif`}
                alt="Type"
                className="mr-5"
                effect="blur"
              />
            }
            {m.properties.title && (
              <a href={`${m.publicUrl}`} target="_blank">
                {m.properties.title}
              </a>
            )}
          </div>
        );
      });
    } else {
      return data.media.map((m, id) => {
        return (
          <div key={m.publicUrl + id} className="py-4">
            {m.properties.title && (
              <a href={`${m.publicUrl}`} target="_blank">
                {m.properties.title}
              </a>
            )}
          </div>
        );
      });
    }
  };

  return (
    <Container>
      {data.header && (
        <h2 className="title heading-text-4 mb-9">{data.header}</h2>
      )}
      {data.media && data.media.length
        ? renderFilelists(data.displayInformation)
        : ""}
    </Container>
  );
};

export default Upload;
