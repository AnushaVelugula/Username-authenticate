import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import {Button} from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';


const FileUploaderquill = () => {
  const [folderId, setFolderId] = useState(219);
  const [typeId, setTypeId] = useState(1);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [title, setTitle] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [tagData, setTagData] = useState('');
  const handleFileChange = (e) => {
    setUploadedDocument(e.target.files[0]);
  };

  const handleContentChange = (value) => {
    setFileContent(value);

  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('FolderId', folderId);
    formData.append('TypeId', typeId);
    formData.append('Title', title);
    formData.append('TagData', tagData);

    if (uploadedDocument) {
      formData.append('UploadedDocument', uploadedDocument);
      setFileContent('');
    } else if (fileContent) {
      formData.append('FileContent', fileContent);
    }

    try {
      const response = await axios.post('https://43.254.41.144:9090/api/Files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:`Bearer ${localStorage.getItem('token')}`
        },
      });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='mt-5'>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={!!fileContent}
        varient = 'primary'
      />
      <br></br>
      <hr/>
      <ReactQuill
        value={fileContent}
        onChange={handleContentChange}
        placeholder="Enter content here..."
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['image'],
            [{ 'align': [] }],
          ],
        }}
        formats={['header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'image', 'align']}
        readOnly={!!uploadedDocument}
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <br></br>
      <Button className = 'mb-3'onClick={handleSubmit}>Submit</Button>
      {/* <button onClick={()=>navigate('/file')}>Navigate</button> */}
    </div>
  );
};

export default FileUploaderquill;
