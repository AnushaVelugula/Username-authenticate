import React, { useState } from 'react';
import { Container, Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React Quill styles

const FileModal = ({ show, onHide, fileName, setFileName, handleFileChange, createFile }) => {
  const [isRichText, setIsRichText] = useState(false); // Toggle between file upload and rich text
  const [richTextContent, setRichTextContent] = useState(''); // State for rich text content

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Upload File or Enter Text</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Form.Group controlId="fileName">
              <Form.Label>File Name</Form.Label>
              <Form.Control
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
              />
            </Form.Group>
            
            {/* Toggle button to switch between file upload and rich text */}
            <Form.Group controlId="toggleInput" className="mt-3">
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Use Rich Text"
                checked={isRichText}
                onChange={(e) => setIsRichText(e.target.checked)}
              />
            </Form.Group>

            {isRichText ? (
              <Form.Group controlId="richTextEditor" className="mt-3">
                <Form.Label>Rich Text Content</Form.Label>
                <ReactQuill
                  value={richTextContent}
                  onChange={setRichTextContent}
                  placeholder='Enter content here...'
                  modules={{
                    toolbar: [
                      [{'header':'1'},{'header':'2'},{'font':[]}],
                      [{'list':'ordered'},{'list':'bullet'}],
                      ['bold','italic','underline'],

                      ]
                    
                  }}
                />
              </Form.Group>
            ) : (
              <Form.Group controlId="fileUpload" className="mt-3">
                <Form.Label>Choose File</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
            )}
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={() => createFile(fileName,isRichText ? richTextContent : null)} // Pass the rich text content if available
        >
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileModal;
