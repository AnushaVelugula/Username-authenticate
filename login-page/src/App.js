import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Otp from './components/VerifyOtp';
import FolderTree from './components/FolderTree';
import FileUploaderquill from './components/FileUploaderquill';
function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/folderTree" element={<FolderTree/>}/>
        <Route path="/quill" element={<FileUploaderquill/>}/>
        </Routes>
    </Router>
  );
}

export default App;