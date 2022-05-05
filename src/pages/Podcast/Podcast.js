import React from "react";
import './Podcast.css';
import AudioComponent from "./AudioComponent";
import CommentComponent from "./CommentComponent";


function Podcast(props) {

  //const url = "https://startechies.000webhostapp.com/end_users/banners/banner_sample_1.png";
  
    return(
       <div className="podcastOuter bg-dark" style={ { backgroundImage: `url(${props.podcast_back_image})`}} >
        <img src={props.podcast_profile_image} className="profilePic img-thumbnail mx-auto d-block"/>
        <br/>
          <div className="podcastTitle text-white">
            {props.podcast_title} 
            <br/>
            <br/>
            <div className="podcastDescription"> {props.podcast_description}</div>
            <br/>
            <div className="podcastCreator"><span class="badge badge-dark">Uploaded by {props.podcast_username}</span></div>
          </div>
        <br/>
        <AudioComponent/>
        <br/> 
        <CommentComponent/>
       
       </div>
    )
  }

  export default Podcast;

  {/*

<div className="podcastOuter bg-dark" style={{ 
      //backgroundImage: `url("https://startechies.000webhostapp.com/end_users/banners/banner_sample_1.png")` 
      backgroundImage: `url(${props.podcast_back_image})`
    }}>
        <img src={props.podcast_profile_image} className="profilePic img-thumbnail mx-auto d-block"/>
        <br/>
          <div className="podcastTitle text-white">
            {props.podcast_title} <br/>
            <div className="podcastDescription"> {props.podcast_description}</div>
            <div className="podcastCreator"><span class="badge badge-dark">Uploaded by {props.podcast_username}</span></div>
          </div>
        <br/>
        <AudioComponent/>
        <br/> 
        <CommentComponent/>
       </div>
    </>

*/}