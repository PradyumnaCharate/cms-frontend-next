import CreateMarkup from "@/utils/createMarkup";
import React from "react";
import { Container, Modal } from "react-bootstrap";

function ViewModal({ size = "lg", show, onHide, title, content, plugins }) {
  return (
    <Modal show={show} onHide={onHide} centered size={size} scrollable>
      <Modal.Header closeButton className="py-1">
        <h5 className="pt-2">{title}</h5>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <h6 className="d-inline ">Title:</h6>
          <p className="d-inline">{title}</p>
          <br />
          <br />
          <h6 className="">Content:</h6>
          <CreateMarkup content={content} plugins={plugins} />
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ViewModal;
