import React from "react";
import './AudioComponent.css';
import './AudioHtmlTag.css';

function playAudio(link){
    var audio = new Audio("'" + link + "'");
    return(audio.play());
}

function AudioComponent(props) {
    return <>
        <div className="audioCompOuter w3-display-container">
            
            {/* <div className="w3-display-left">
                <button className="btn"><i className="fa fa-rotate-left"></i></button>
            </div>
            <div className="w3-display-middle">
                <button className="btn"><i className="fa fa-play" onClick={playAudio(props.audio_url)}></i><i className="fa fa-pause"></i></button>
            </div>
            <div className="w3-display-right">
            <button className="btn"> <i className="fa fa-rotate-right"></i></button>
            </div> */}
            <div align = 'center'> 
                <audio controls className="htmlAudioTag">
                    <source src={props.audio_url} type="audio/mpeg" />
                </audio>
            </div>
            
        </div>
    </>
    
}

export default AudioComponent
