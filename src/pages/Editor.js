import { useEffect, useRef, useState } from "react"
import Style from "./Editor.module.css"
import myRect from "./overlayClass"
import CropLabel from "../components/CropLabel"
import ImageSection from "../components/ImageSection"
import axios from "axios"
import Nav from "../components/Nav"

let croppers = []
let currentLabel = { name: "Dresses", color: "#FF8B13" }

const Editor = ({userData}) => {

    //ERROR MESSAGE
    const ERR_MSG = "Sorry, We couldnt save you work it seems something went wrong."

    //SUCCESS MESSAGE
    const SUCCESS_MSG = "Successfully saved your work into our database";

    //WARNING MESSAGE
    const WARNING_MSG = "You must sign in to save work to database"

    //LOADING MESSAGE
    const LOADING_MSG = "Finalizing... Please hold on"

    //ALL STATE DECLRATIONS 

    const canvasRef = useRef(null)
    const [images, setImages] = useState([])
    const [labels, setLabels] = useState([{ name: "Dresses", color: "#FF8B13" }])
    const [currentUrl, setCurrentUrl] = useState();
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);
    const [loading, setLoading] = useState(false);

    let imageObj = null;
    //REGULAR VALUES SUCH AS THE IMAGE OBJECT... ETC
    let canvas; let context;
    let selected = false;

    //USE EFFECT TO RUN EVERYTIME CHANGES ARE MADE
    useEffect(() => {
        resetState();
        createAllEventListeners();
        //REMOVING THE WARNINGS ON DEPENDENCY ARRAY
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [currentUrl])

    //RESET THE STATE BY CLEARING ALL CROPPERS AND REFRESHING THE CANVAS THEN LOADING NEW IMAGE

    const resetState = () => {
        //removing all the croppers
        croppers = []

        //re-initializing the canvas and context
        canvas = canvasRef.current;
        context = canvas.getContext("2d")

        //setting the height and wwidth of the canvas
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        //loading the current image
        loadImage();
    }

    //CREATING AND HANDLING ALL EVENT LISTENERS

    const createAllEventListeners = () => {
        //checking if the image object is created and loading the image to the screen
        console.log(imageObj)
        if (imageObj){ 
        imageObj.addEventListener("load", () => drawImage(context, imageObj))

        if(!canvas){
            console.log("no canvas here bro")
            return
        }

        //checking mouse movement to draw croppers on the screen
        canvas.addEventListener("mousedown", (e) => handleMouseDown(e, canvas));
        canvas.addEventListener("mousemove", (e) => handleMouseMove(e, canvas, context));
        canvas.addEventListener("mouseup", () => handleMouseUp())
        }
    }

    const removeAllEventListeners = () => {
        canvas.removeEventListener("mousedown", (e) => handleMouseDown(e, canvas, context));
        canvas.removeEventListener("mousemove", (e) => handleMouseMove(e, canvas, context));
        canvas.removeEventListener("mouseup", () => handleMouseUp())
    }

    /* HANDLING MOUSE EVENTS ON THE CANVAS  */

    const handleMouseDown = (e, canvas) => {
        if(!currentUrl) return

        let mouseX = e.clientX - canvas.offsetLeft;
        let mouseY = e.clientY - canvas.offsetTop;

        function callDrag() {
            for (let i of croppers) {
                if (i.holding(mouseX, mouseY)) {
                    i.startMoving(mouseX, mouseY);
                    selected = true
                }
                if (i.contain(mouseX, mouseY)) {
                    i.startDragging(mouseX, mouseY);
                    selected = true
                }
            }
        }

        callDrag();

        if (!selected) {
            let myColor = currentLabel.color;
            croppers.push(new myRect(mouseX, mouseY, myColor + "99", currentLabel.name));
            callDrag();
        }
    }

    //HANDLING MOUSE MOVEMENTS TO KNOW HOW TO RESIZE CROPPERS ON DRAG
    const handleMouseMove = (e, canvas, context) => {
        let mouseX = e.clientX - canvas.offsetLeft;
        let mouseY = e.clientY - canvas.offsetTop;
        for (let i of croppers) {
            if (i.isMoving) {
                i.move(mouseX, mouseY, context, canvas);
                drawImage(context, imageObj);
                drawCroppers(context);
            }
            if (i.isDragging) {
                i.update(mouseX, mouseY, context, canvas);
                drawImage(context, imageObj)
                drawCroppers(context);
            }
        }
    }

    //HANDLING MOUSE RELEASE TO KNOW WHEN USER HAS STOPPED DRAGGING
    const handleMouseUp = () => {
        for (let i of croppers) {
            i.stopDragging();
            i.stopMoving();
        }
        selected = false;
    }

    /* HANDLING CANVAS FUNCTIONS ON THE CROPPER,IMAGES AND CANVAS */
    const drawCroppers = (context) => {
        for (let i of croppers) {
            if (currentLabel) i.drawme(context);
        }
    }

    //LOADING THE NEWLY SELECTED IMAGE AFTER NOCICING A CHANGE IN CURRENT URL
    const loadImage = () => {
        if (!currentUrl) return;
        imageObj = new Image()
        imageObj.src = currentUrl;
    }

    //DRAWING THE IMAGE ON THE CANVAS
    const drawImage = (context, i) => {
        var IMAGE_WIDTH = i.width*0.13;
        var IMAGE_HEIGHT = i.height*0.13;
        console.log("i passed here")
        if (i) context.drawImage(i, context.canvas.width / 2 - IMAGE_WIDTH/2, 50, IMAGE_WIDTH, IMAGE_HEIGHT)
    }

    /* HANDLING CANVAS FUNCTIONS ON THE CROPPER AND IMAGES*/
    const updateCurrentLabel = (val) => {
        currentLabel = val;
    }

    /* CROPPING THE IMAGES */
    const applyCrop = () => {
        if(!userData){
            setWarning(true);
            return
        }
        if(croppers.length === 0 || !canvas || !context){
            return
        } 
        

        let dataList = []
        for (let i of croppers) {
            const tempRect = i;
            const originX = context.canvas.width / 2 - imageObj.width * 0.13 / 2;
            const originY = 50;
            const x1 = tempRect.x1 - originX;
            const y1 = tempRect.y1 - originY;
            const w = x1 + tempRect.w;
            const h = y1 + tempRect.h;
            const label = tempRect.label

            console.log(x1, y1, w, h)

            if (x1 > 0 && y1 > 0) {
                const reqData = {
                    "label":label,
                    "email":userData.email,
                    "url": currentUrl,
                    "x": x1 / 0.13,
                    "y": y1 / 0.13,
                    "w": w / 0.13,
                    "h": h / 0.13
                }
                dataList.push(reqData)
            }
        }

        console.log(croppers, dataList)
        setLoading(true);
        axios.post("http://127.0.0.1:8000/get_images/process/", dataList).then((res) => {
            console.log(res)
            if(res.status === 200){
                setLoading(false)
                setImages((prev) => prev.filter((elem) => elem !== currentUrl))
                setSuccess(true);
            }
        }).catch((err) =>{
            console.log(err)
            setError(true, setCurrentUrl(images[0]))
        });

        return
    }

    const handleCloseErr = () => {
        setError(false);
    }

    const handleCloseWarn = () => {
        setWarning(false);
    }

    const handleCloseSucc = () => {
        setCurrentUrl(images[0])
        setSuccess(false);
    }



    return (
        <div className={Style.canvasContainer}>
            <Nav userData={userData}/>
            <div style={{display: loading?"":"none"}} className={Style.succMsg} >{LOADING_MSG}</div>
            <div style={{display: warning?"":"none"}} className={Style.warnMsg} >{WARNING_MSG}<div onClick={handleCloseWarn} className={Style.closeWarn}>✕</div></div>
            <div style={{display: error?"":"none"}} className={Style.errMsg} >{ERR_MSG}<div onClick={handleCloseErr} className={Style.closeErr}>✕</div></div>
            <div style={{display: success?"":"none"}} className={Style.succMsg} >{SUCCESS_MSG}<div onClick={handleCloseSucc} className={Style.closeSucc}>Continue</div></div>
            <canvas className={Style.canvas} id="canvas" ref={canvasRef}>
            </canvas>
            <div className={Style.submitButton} onClick={applyCrop}>Finalize</div>
            <CropLabel currentLabel={currentLabel} updateCurrentLabel={updateCurrentLabel} setLabels={setLabels} labels={labels} />
            <ImageSection images={images} setImages={setImages} setCurrentUrl={setCurrentUrl} currentUrl={currentUrl} />
        </div>
    )
}

export default Editor;