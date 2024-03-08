import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmDeleteModal = ({
  show,
  onClose,
  itemType,
  itemId,
  onConfirmDelete,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this {itemType}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onConfirmDelete(itemId)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
