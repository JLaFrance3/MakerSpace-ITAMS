/**
 * EditItemModal.tsx
 * A modal that will pop up with a form field used
 * to adjust item quantities
 */

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

type ModalProps = {
  show: boolean;
  onCancel: () => void;
  onSave: (newQuantity: number) => void;
  itemName: string;
  currentQuantity: number;
};

function EditItemModal({
  show,
  onCancel,
  onSave,
  itemName,
  currentQuantity,
}: ModalProps) {
  const [quantity, setQuantity] = useState('');

  // Update modal on open with current quantity of item
  useEffect(() => {
    if (show) setQuantity(String(currentQuantity));
  }, [show, currentQuantity]);

  // handle saving
  const handleSave = () => {
    const numQuantity = parseInt(quantity, 10); // Convert string to int

    // Validation
    if (isNaN(numQuantity) || numQuantity < 0) {
      //TODO: Red outline? Error message?
      return;
    }

    onSave(numQuantity);
  };

  return (
    <Modal show={show} onHide={onCancel} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Edit {itemName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formItemQuantity">
            <Form.Label>New Quantity</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="warning" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditItemModal;
