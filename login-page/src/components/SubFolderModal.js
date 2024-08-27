import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SubFolderModal = ({ show, onHide, subFolderName, setSubFolderName, createSubFolder }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Create Subfolder</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="subFolderName">
          <Form.Label>Subfolder Name</Form.Label>
          <Form.Control
            type="text"
            value={subFolderName}
            onChange={(e) => setSubFolderName(e.target.value)}
            placeholder="Enter subfolder name"
            required
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
      <Button variant="primary" onClick={createSubFolder}>
        Create
      </Button>
    </Modal.Footer>
  </Modal>
);

export default SubFolderModal;
