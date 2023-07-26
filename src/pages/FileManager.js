import { useEffect, useState } from "react"
import Nav from "../components/Nav"
import File from "./File.module.css"
import folderSvg from "./static_files/folder_managed.svg"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"

const FileManager = ({ userData, setCurrentFolder }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [folders, setFolders] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        if(!userData){
            setError(true)
            return;
        }

        axios.get(`http://127.0.0.1:8000/user_request/get_user/${userData.id}`).then((res) => {
            console.log(res.data)
            setFolders(res.data);
        }).catch((err) => setError(true))

    }, [])

    const handleRegisterNavigate = () => {
        navigate("/register")
    }

    const handleFolderNavigate = (folder) => {
        const currentPath = location.pathname
        setCurrentFolder(folder)
        navigate(`${currentPath}/folder/${folder}`);
    }

    return (
        <div className={File.pageContainer}>
            <Nav userData={userData}/>
            <div className={File.title}>{"/ All Folders"}</div>
            <div style={{display: error?"none":""}} className={File.folderSec}>
                {folders ? folders.map((val, idx) => {
                    return (
                        <div key={idx} className={File.folderContainer}>
                            <div onClick={() => handleFolderNavigate(val)} className={File.folder}>
                                <img className={File.folderIcon} src={folderSvg} alt="folder" />
                            </div>
                            <label className={File.folderLabel}>{val}</label>
                        </div>
                    )
                }) : <></>}
            </div>
            <div style={{display: error?"":"none"}} className={File.noUser}>
                <button onClick={handleRegisterNavigate} className={File.registerButton}>Register or Sign In to start using</button>
            </div>
        </div>
    )
}

export default FileManager