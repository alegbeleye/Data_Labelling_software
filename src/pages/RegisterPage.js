import React, { useState } from "react";
import Signup from "../components/Signup";
import RegStyle from "./Register.module.css";
import Signin from "../components/Signin";
import { useNavigate } from "react-router-dom";

const Register = ({userData, setUserData}) => {
    const [haveAccount, setHaveAccount] = useState(false)
    const navigate = useNavigate();

    const handleUserData = (data) => {
        setUserData(data, navigate("/editor"));
    }

    return (
        <div className={RegStyle.pageContainer}>
            <div className={RegStyle.nav}>LabelX</div>
            <div className={RegStyle.sec1}>
                {
                haveAccount ? 
                <Signin handleUserData={handleUserData} haveAccount={haveAccount} setHaveAccount={setHaveAccount} /> : 
                <Signup handleUserData={handleUserData} haveAccount={haveAccount} setHaveAccount={setHaveAccount} />
                }
            </div>
            <div className={RegStyle.sec2}>
                <h1 className={RegStyle.infoHead}>How to Use</h1>
                <ol className={RegStyle.infoBody}>
                    <li>Log into your account</li>
                    <li>Start a project</li>
                    <li>Label data</li>
                    <li>Good luck!</li>
                </ol>
                <img className={RegStyle.imagePrev} src="https://lanre-datasoftware-bucket.s3.us-west-1.amazonaws.com/web-static/preview.png" alt="preview"/>
            </div>
        </div>
    )
}

export default Register