import React from 'react';
import {Container,Button, Table} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const FolderList = ({ folders, expandedFolders, toggleFolder, handleAddSubFolder, handleAddFile, handleDeleteFolder }) => {
  return (
    <Container>
      <Table  striped bordered hover style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ border: '2px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>S.No</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Folder Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {folders.map((folder, index) => (
            <React.Fragment key={folder.folderId}>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{index + 1}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  <div onClick={() => toggleFolder(folder.folderId)} style={{ cursor: 'pointer' }}>
                    {folder.folderName} 
                  </div>
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  <Button 
                    variant="link" 
                    onClick={() => handleDeleteFolder(folder.folderId)} 
                    style={{ color: 'red' }}
                  >
                    <FaTrash />
                  </Button>
                  {/* Optional: Add other action buttons here */}
                </td>
              </tr>
              {expandedFolders[folder.folderId] && (
                <tr>
                  <td colSpan="3">
                    <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                      {/* Subfolders Table */}
                      <span>
                        <h2>SubFolders Table
                          <Button className="float-end" onClick={() => handleAddSubFolder(folder.folderId)}>
                                        Add subFolder
                          </Button>
                        </h2>
                      </span>
                      
                      <Table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                          <tr style={{ border: '2px solid #ccc' }}>
                            <th style={{ padding: '10px', textAlign: 'left' }}>S.No</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Sub-folder Name</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {folder.subFolders && folder.subFolders.length > 0 ? (
                            folder.subFolders.map((subFolder, idx) => (
                              <tr key={subFolder.folderId} style={{ border: '1px solid #ccc' }}>
                                <td style={{ padding: '10px' }}>{idx + 1}</td>
                                <td style={{ padding: '10px' }}>{subFolder.folderName}</td>
                                <td style={{ padding: '10px' }}>
                                  {/* Add actions for subfolders here if needed */}
                                  
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" style={{ padding: '10px' }}>No subfolders</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      {/* Files Table */}
                      <span>
                        <h2>Files
                          <Button className="float-end" onClick={() => handleAddFile(folder.folderId)}>
                                    Add File
                          </Button>
                        </h2>
                      </span>
                      <Table style={{ width: '100%', borderCollapse: 'collapse' }}>

                        <thead>
                          <tr style={{ border: '2px solid #ccc' }}>
                            <th style={{ padding: '10px', textAlign: 'left' }}>S.No</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>File Name</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {folder.files && folder.files.length > 0 ? (
                            folder.files.map((file, idx) => (
                              <tr key={file.fileId} style={{ border: '1px solid #ccc' }}>
                                <td style={{ padding: '10px' }}>{idx + 1}</td>
                                <td style={{ padding: '10px' }}>{file.fileName}</td>
                                <td style={{ padding: '10px' }}>
                                  {/* Add actions for files here if needed */}
                                  
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" style={{ padding: '10px' }}>No files</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      
                      
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FolderList;
