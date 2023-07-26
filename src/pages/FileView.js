import { useEffect, useState } from "react"
import File from "./File.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Nav from "../components/Nav"

const FileView = ({ currentFolder, userData }) => {

    const [files, setFiles] = useState([])
    const [error, setError] = useState(false)

    const navigate = useNavigate();
    useEffect(() => {
        if (!currentFolder) navigate('/projects');
        axios.post(`http://127.0.0.1:8000/user_request/get_user/${userData.id}`, { "folder": currentFolder }).then((res) => {
            setFiles(res.data)
        }).catch((err) => {
            console.log(err);
            setError(true)
        })
    }, [files])

    return (
        <div className={File.pageContainer}>
            <Nav userData={userData} />
            <div className={File.title}>{`/ ${currentFolder}`}</div>
            <div style={{ display: error ? "none" : "" }} className={File.folderSec}>
                <div className={File.listView}>
                    {files ? files.map((val, idx) => {
                        return (
                            <li className={File.listObj} href={val}>{`${currentFolder + "-" + idx + ".jpg"}`}</li>
                        )
                    }) : <></>}
                </div>
            </div>
        </div>
    )
}

export default FileView