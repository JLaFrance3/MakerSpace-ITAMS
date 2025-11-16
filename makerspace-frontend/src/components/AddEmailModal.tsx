/**
 * AddEmailModal.tsx
 * A modal that will pop up with an input field to allow
 * users to enter a new email into the mailing list.
 */

import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

type ModalProps = {
  show: boolean;
  onCancel: () => void;
  onSave: (newEmail: string) => void;
};

function AddEmailModal({ show, onCancel, onSave }: ModalProps) {
  const [email, setEmail] = useState('');

  // Clear text on modal open
  useEffect(() => {
    if (show) setEmail('');
  }, [show]);

  // Handle saving email
  const handleSave = () => {
    //TODO: email validation
    onSave(email);
  };

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="emailForm">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEmailModal;
