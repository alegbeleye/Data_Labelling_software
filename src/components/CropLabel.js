import {React, useState} from "react";
import Section from "./Section.module.css"

const CropLabel = ({labels, setLabels, updateCurrentLabel}) => {

    // ALL STATES
    const [labelName, setLabelName] = useState(null)

    // ALL STATE CHANGE AND ATTRIBUTE FUNCTIONS

    const handleLabelName = (e) => {
        setLabelName(e.target.value)
    }

    //Function to generate random color codes to assing to label's
    const generateHexColor = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
      };

    const handleAddLabel = () => {
        const color = generateHexColor();
        setLabels((prev) => ([...prev, {name:labelName, color:color}]))
    }

    const handleLabelClick = (val) => {
        updateCurrentLabel(val);
    }

    return(    
    <div className={Section.labelContainer}>
        <div className={Section.secName}>Add Labels</div>
        <div className={Section.containerName}>
            <input className={Section.containerNameChild} onChange={handleLabelName}/>
            <div className={Section.addLabel} onClick={handleAddLabel}>+</div>
        </div> 
        {labels.map((val, idx)=>{
            return(
                <div key={idx} className={Section.label} onClick={() => handleLabelClick(val)}>
                    <div style={{backgroundColor: val.color}} className={Section.labelColor}></div>
                    <div className={Section.labelName}>{val.name}</div>
                </div>
            )
        })}
    </div>
    )
}

export default CropLabel;