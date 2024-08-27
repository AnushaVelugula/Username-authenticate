import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import FolderList from './FolderList';
import SubFolderModal from './SubFolderModal';
import FileModal from './FileModal';
import { fetchFolders, createFolder, createSubFolder, createFile, deleteFolder} from './FolderService';
import { useNavigate } from 'react-router-dom';

const FolderTree = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState({});
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [parentFolderId, setParentFolderId] = useState(null);
  const [showSubFolderModal, setShowSubFolderModal] = useState(false);
  const [subFolderName, setSubFolderName] = useState('');
  const [fileName, setFileName] = useState('');
  const [showFileModal, setShowFileModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [title,setTitle] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchFolders();
  }, []);

  const handleFetchFolders = async () => {
    setLoading(true);
    setNoData(false);
    const data = await fetchFolders();
    setFolders(data);
    console.log(data);
    setLoading(false);
    if (data.length === 0) setNoData(true);
  };

  const handleCreateFolder = async (e) => {
    // e.preventDefault;
    await createFolder(newFolderName);
    setNewFolderName('');
    handleFetchFolders();
  };

  const handleCreateSubFolder = async () => {
    await createSubFolder(subFolderName, parentFolderId);
    setSubFolderName('');
    setParentFolderId(null);
    setShowSubFolderModal(false); 
    handleFetchFolders();
  };

  const handleCreateFile = async () => {
    await createFile(fileName, parentFolderId, uploadedFile);
    setFileName('');
    setUploadedFile(null);
    setParentFolderId(null);
    setShowFileModal(false);
    handleFetchFolders();
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prevExpandedFolders) => ({
      ...prevExpandedFolders,
      [folderId]: !prevExpandedFolders[folderId],
    }));
  };

  const handleAddSubFolder = (folderId) => {
    setParentFolderId(folderId);
    setShowSubFolderModal(true);
  };

  const handleAddFile = (folderId) => {
    setParentFolderId(folderId);
    setShowFileModal(true);
  };


  const handleDeleteFolder = async (folderId) => {
    await deleteFolder(folderId);
    handleFetchFolders(); // Refresh the folder list after deletion
    console.log('deleted folder name')
  };
  
  return (
    <Container>
      <h1>Folder Management</h1>
      <Form>
        <Form.Group controlId="newFolderName" className='mb-3'>
          <Form.Label>New Folder Name</Form.Label>
          <Form.Control
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Enter folder name"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCreateFolder}>
          Create Folder
        </Button>
      </Form>
      <Button variant = 'primary' onClick={()=>navigate('/quill')}>Navigate for Rich Text</Button>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : noData ? (
        <p>No data to display</p>
      ) : (
        <FolderList
            folders={folders}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
            handleAddSubFolder={handleAddSubFolder}
            handleAddFile={handleAddFile}
            handleDeleteFolder={handleDeleteFolder} // Pass the delete handler
        />
      )}

      <SubFolderModal
        show={showSubFolderModal}
        onHide={() => setShowSubFolderModal(false)}
        subFolderName={subFolderName}
        setSubFolderName={setSubFolderName}
        createSubFolder={handleCreateSubFolder}
      />

      <FileModal
        show={showFileModal}
        onHide={() => setShowFileModal(false)}
        fileName={fileName}
        setFileName={setFileName}
        handleFileChange={(e) => setUploadedFile(e.target.files[0])}
        createFile={handleCreateFile}
      />
    </Container>
  );
};

export default FolderTree;
