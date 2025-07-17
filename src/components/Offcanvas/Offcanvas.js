"use client";

import React from "react";
import { Container, Button } from "react-bootstrap";
import Logo from "../Logo";

const Offcanvas = ({ show, onHideOffcanvas, children, ...rest }) => {
  if (typeof document !== "undefined") {
    if (show) {
      document.querySelector("html").classList.add("has-offcanvas");
      document.body.classList.add("has-offcanvas");
    } else {
      document.querySelector("html").classList.remove("has-offcanvas");
      document.body.classList.remove("has-offcanvas");
    }
  }

  return (
    <div {...rest}>
      <div
        className={`${show ? "" : "hidden"} offcanvas-overlay`}
        onClick={onHideOffcanvas}
      />
      <div className={`${show ? "" : "hidden"} offcanvas-overlay__drawer`}>
        <Container>
          <div className="p-3">
            <div className="my-3 offcanvas-overlay__drawer-log">
              <Logo onClick={onHideOffcanvas} />
              <Button onClick={onHideOffcanvas}>&#10006;</Button>
            </div>
            <div className="pt-4">{children}</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Offcanvas;
