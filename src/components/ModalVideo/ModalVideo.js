"use client";

import React, { useState, useContext } from "react";
import ReactPlayer from "react-player";
import { Modal, Spinner } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { device } from "../../utils";

const CloseButton = (props) => (
  <div {...props} className="modal-video__close-wrapper">
    <svg
      role="img"
      viewBox="0 0 24 24"
      width="1rem"
      height="1rem"
      css={`
        fill: currentcolor;
        vertical-align: middle;
      `}
    >
      <path
        d="M9.82 12L0 2.18 2.18 0 12 9.82 21.82 0 24 2.18 14.18 12 24 21.82 21.82 24 12 14.18 2.18 24 0 21.82z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
);

const ModalVideo = (props) => {
  const [loading, setLoading] = useState(true);
  const gContext = useContext(GlobalContext);

  const handleClose = () => {
    setLoading(true);
    gContext.toggleVideoModal();
  };

  return (
    <Modal
      {...props}
      size="lg"
      centered
      show={gContext.videoModalVisible}
      onHide={gContext.toggleVideoModal}
      className="modal-video"
    >
      <Modal.Body className="text-center position-relative">
        <CloseButton onClick={handleClose} />

        <div className={`h-100 d-flex align-items-center w-100`}>
          <div
            className={`modal-video__video ${loading ? "loading" : "loaded"}`}
          >
            {loading && (
              <div className="spinner-wrapper">
                <Spinner animation="grow" variant="light" />
              </div>
            )}
            <ReactPlayer
              url={`${gContext.videoModalURL}`}
              width="100%"
              height="100%"
              controls
              onReady={() => {
                setLoading(false);
              }}
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
                facebook: {
                  appId: "12345",
                },
              }}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalVideo;
