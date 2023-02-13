import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputImage" src={imageUrl} alt="" width='500px' height='auto'/>
                {box.map(elementBox => (
                    <div key={elementBox.topRow} className="bounding-box" style={{top: elementBox.topRow, 
                                                                                  right: elementBox.rightCol, 
                                                                                  bottom: elementBox.bottomRow, 
                                                                                  left: elementBox.leftCol}}>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FaceRecognition;