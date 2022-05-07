import React, { useContext } from "react";
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
          {/* <span className="badge badge-dark">{props.podcast_title}</span>  */}
            <br/>
            <div className="podcastDescription"> {props.podcast_description}</div>
            <div className="podcastCreator"><span className="badge badge-dark">Uploaded by {props.podcast_username}</span></div>
          </div>
        <AudioComponent audio_url={props.podcast_audio}/>
        <br/> 
        <br/> 
        <CommentComponent podcast_id_comment = {props.podcast_id}/>
      
      </div>
    )
  }

  export default Podcast

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
  const url = "https://startechies.000webhostapp.com/end_users/banners/banner_sample_1.png";
    return <>
      <div className="podcastOuter bg-dark" style={{ 
      //backgroundImage: `url("https://startechies.000webhostapp.com/end_users/banners/banner_sample_1.png")` 
      backgroundImage: `url(${url})`
    }}>
        <img src="https://startechies.000webhostapp.com/end_users/profile_pictures/sample_3_profile.jpg" className="profilePic img-thumbnail mx-auto d-block"/>
        <br/>
          <div className="podcastTitle text-white">
            TITLE <br/>
            <div className="podcastDescription">Description</div>
            <div className="podcastCreator"><span class="badge badge-dark">Uploaded by KABELO20</span></div>
alan/v1
          </div>
        <br/>
        <AudioComponent/>
        <br/> 
        <CommentComponent/>
      </div>
  </> */}

