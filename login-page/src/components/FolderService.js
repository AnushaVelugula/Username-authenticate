import axios from 'axios';

const apiUrl = 'https://43.254.41.144:9090/api';
const apiToken = `Bearer ${localStorage.getItem('token')}`;

export const fetchFolders = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Folders`, {
      headers: {
        Authorization: apiToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching folders:', error);
    return [];
  }
};

export const createFolder = async (folderName) => {
  try {
    await axios.post(
      `${apiUrl}/Folders`,
      {
        folderName,
        isSystem: false,
        parentId: null,
      },
      {
        headers: {
          Authorization: apiToken,
          'Content-Type': 'application/json-patch+json',
        },
      }
    );
  } catch (error) {
    console.error('Error creating folder:', error);
  }
};

export const createSubFolder = async (folderName, parentId) => {
  try {
      await axios.post(
      `${apiUrl}/Folders`,
      {
        folderName,
        
        isSystem: false,
        parentId,
      },
      {
        headers: {
          Authorization: apiToken,
          'Content-Type': 'application/json-patch+json',
        },
      }
    );
  } catch (error) {
    console.error('Error creating subfolder:', error);
  }
};

export const createFile = async (fileName, folderId, uploadedFile, richTextContent = null) => {
  try {
    const formData = new FormData();
    formData.append('folderID', folderId);
    formData.append('typeID', 1);
    formData.append('title', fileName);
    formData.append('tagData',null)

    if (uploadedFile) {
      formData.append('UploadedDocument', uploadedFile);
    }
    
    if (richTextContent) {
      formData.append('fileContent', richTextContent);
    }
    // else {
    //   formData.append('fileContent', '<p>Hellooooo</p>');
    // }

    // formData.append('tagData', null);

    await axios.post(
      `${apiUrl}/Files`,
      formData,
      {
        headers: {
          Authorization: apiToken,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("file uploded successfully")
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};


export const deleteFolder = async (folderId) => {
  try {
    await axios.delete(`${apiUrl}/Folders/${folderId}`, {
      headers: {
        Authorization: apiToken,
      },
    });
  } catch (error) {
    console.error('Error deleting folder:', error);
  }
};


