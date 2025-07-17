"use client";

import React from "react";
import { Modal, Button } from "react-bootstrap";

const ContactModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
    >
      <Modal.Body className="py-10">
        <h4>Form has been submitted successfully.</h4>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button className="modal-btn" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;
