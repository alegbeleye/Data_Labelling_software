import Section from "./Section.module.css"
import { useNavigate } from "react-router-dom";

const Nav = ({userData}) => {
    const navigate = useNavigate();
    const handleLink = (link) => {
        navigate(link);
    }
    return(
    <div className={Section.webNav}>
        <div className={Section.navSec1}>
            <p className={Section.navLogo}>LabelX</p>
            <p className={Section.navContent} onClick={() => handleLink("/projects")}>Projects</p>
            <p className={Section.navContent} onClick={() => handleLink("/editor")}>Editor</p>
        </div>
        <div className={Section.navSec2}>
            {(userData)?<p className={Section.navContent}>{userData.username}</p>:<p className={Section.navContent} onClick={() => handleLink("/register")}>Sign In</p>
            }
        </div>
    </div>
    )
}

export default Nav;