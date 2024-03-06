import React from "react";
import { Modal, Button } from "react-bootstrap";

const EditModal = ({ show, handleClose, product }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form for editing product */}
        <p style={{ fontStyle: "italic" }}>Edit form will go here...</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleUpdate(product)}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
