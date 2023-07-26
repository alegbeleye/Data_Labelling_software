import {React, useState} from "react"
import Section from "./Section.module.css"
import axios from "axios"

const ImageSection = ({images, setImages, setCurrentUrl, currentUrl}) => {

    //ALL STATES
    const [searchInput, setSearchInput] = useState(null)

    // Handling Image Search value
    const handleSearchQuery = (e) =>{
        setSearchInput(e.target.value);
    }

    //Function to request images url's through image search value from server
    const handleSearch = () => {
        axios.post("http://127.0.0.1:8000/get_images/", {"request":searchInput}).then((res) => {
            setImages(res.data.data);
            console.log(res.data.data)
        }).catch((err) => console.log(err));
    }

    //Handling Image URL changes and updating the currentURL state that was passed down
    const handleImageUrl = (val) => {
        setCurrentUrl(val);
    }

    return(
        <div className={Section.imageSecContainer}>
            <div className={Section.secName}>Search Images</div>
            <div className={Section.containerName}>
                <input className={Section.containerNameChild} onChange={handleSearchQuery}/>
                <div className={Section.addLabel} onClick={handleSearch}>+</div>
            </div> 
            {images.map((val, idx) => {
                return(
                <div key={idx} loading="lazy" className={Section.imageContainer} style={{backgroundImage: `url(${val})`}} onClick={() => handleImageUrl(val)}></div>
                )
            })}
        </div>

    )
}

export default ImageSection;