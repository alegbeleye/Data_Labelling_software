import { useState } from "react"
import Form from "./Form.module.css"
import axios from "axios"

const Signup = ({handleUserData, setHaveAccount, haveAccount}) =>{
    
    //ERROR MESSAGE
    const ERR_SIGN_UP = "Sorry, this user already exists"

    //ALL STATE VALUES
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    //Handling Form Changes and Updating State
    const handleHaveAccount = () => {
        setHaveAccount(!haveAccount)
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    //Handling Submit Form
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/user_request/create_user/", {email, username, password}).then((res) => {
            handleUserData(res.data);
        }).catch((err) => setError(true))
    }


    return(
        <div className={Form.formContainer}>
            <div className={Form.errorMsg} style={{display: error?"":"none"}}>{ERR_SIGN_UP}</div>
            <div className={Form.containerName}>Create Account</div>
            <div className={Form.containerDesc}>Welcome to LabelX please sign up to start using the Application.</div>
            <div className={Form.inputDiv}>
            <label>Username</label>    
            <input className={Form.formInput} onChange={handleUsername} type="username" name="username"/>
            </div>
            <div className={Form.inputDiv}>
            <label>E-mail</label>    
            <input className={Form.formInput} onChange={handleEmail} type="text" name="email" />
            </div>
            <div className={Form.inputDiv}>
            <label>Password</label>
            <input className={Form.formInput} onChange={handlePassword} type="password" name="password" />
            </div>
            <div className={Form.inputLink}>
            <label onClick={handleHaveAccount}>Already Have an Account?</label>
            </div>
            <hr className={Form.divider}/>
            <button className={Form.formSubmit} type="submit" onClick={handleSubmit}>Create Account</button>
        </div>
    )
}

export default Signup