import { useState } from "react"
import Form from "./Form.module.css"
import axios from "axios"

const Signin = ({ handleUserData, setHaveAccount, haveAccount}) =>{

    //ERROR MESSAGE 
    const ERR_SIGN_IN = "Sorry, Email or Password is incorrect"

    //ALL STATE VALUES
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false);

    //Handling state changes from forms
    const handleHaveAccount = () => {
        setHaveAccount(!haveAccount)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    //Handling Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/user_request/get_user/", {email, password}).then((res) => {
            handleUserData(res.data)
        }).catch((err) => setError(true))
    }

    return(
        <div className={Form.formContainer}>
            <div className={Form.errorMsg} style={{display: error?"":"none"}}>{ERR_SIGN_IN}</div>
            <div className={Form.containerName}>Sign In</div>
            <div className={Form.containerDesc}>Welcome to LabelX please sign in to start using the Application.</div>
            <div className={Form.inputDiv}>
            <label>E-mail</label>    
            <input className={Form.formInput} onChange={handleEmail} type="text" name="email" />
            </div>
            <div className={Form.inputDiv}>
            <label>Password</label>
            <input className={Form.formInput} onChange={handlePassword} type="password" name="password" />
            </div>
            <div className={Form.inputLink}>
            <label onClick={handleHaveAccount}>Dont Have an Account?</label>
            </div>
            <hr className={Form.divider}/>
            <button className={Form.formSubmit} type="submit" onClick={handleSubmit}>Sign In</button>
        </div>
    )
}

export default Signin