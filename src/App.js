import React, { useState } from "react";
import Editor from "./pages/Editor";
import Register from "./pages/RegisterPage";
import {Route, Routes} from "react-router-dom";
import FileManager from "./pages/FileManager";
import FileView from "./pages/FileView";

function App() {
  const [userData, setUserData] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  return (
    <div className="App">
      <Routes>
        <Route path="/editor" element={<Editor setUserData={userData} userData={userData}/>} />
        <Route path="/" element={<Register setUserData={setUserData} userData={userData}/>}/>
        <Route path="/projects" element={<FileManager setUserData={setUserData} userData={userData} setCurrentFolder={setCurrentFolder}/>}/>
        <Route path="/projects/folder/:folderName" element={<FileView userData={userData} currentFolder={currentFolder}/>}/>
      </Routes>
    </div>
  );
}

export default App;
