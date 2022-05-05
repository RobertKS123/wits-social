import React from "react";
import './AudioComponent.css';




function AudioComponent() {
    return <>
        <div className="audioCompOuter w3-display-container">
            <div className="w3-display-left">
                <button className="btn"><i className="fa fa-rotate-left"></i></button>
            </div>
            <div className="w3-display-middle">
                <button className="btn"><i className="fa fa-play"></i><i className="fa fa-pause"></i></button>
            </div>
            <div className="w3-display-right">
            <button className="btn"><i className="fa fa-rotate-right"></i></button>
            </div>
        </div>
    </>
    
  }

  export default AudioComponent;
