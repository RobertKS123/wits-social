import React, { useState, useEffect, useRef, location, parent, useContext, } from "react";
import './Podcast.css';
import AudioComponent from "./AudioComponent";
import CommentComponent from "./CommentComponent";
import LikeComponent from "./LikeComponent";
import { AuthContext } from "../../api/AuthProvider";
import axios from '../../api/axios';

const REGISTER_URL = '/podcast_scripts/like_unlike_podcast.php'; //link to database

function Podcast(props) {
  
    const [success, setSuccess] = useState(false); //maybe button changes colour - in css
    const [errMsg, setErrMsg] = useState('');

    const [likes, setLikes] = useState(props.podcast_likes);
    const [likeState, setLikesStates] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [])

    const handleSubmit = async (e) => { //wehn someone presses submit on the form
        e.preventDefault();
        // prevents button hack

        //Axios - speaks to ther server
        try {                                                     //database_variable ; my_variable
            const response = await axios.get(REGISTER_URL,{params:{ podcast_id: props.podcast_id, username: state.id}});
            setSuccess(true);
            setLikes(response?.data?.podcast_likes);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
        }

        console.log("NUMBER OF LIKES = ", likes);
    }
  
  // function handleClick(e){ 
  //   e.preventDefault();    
  //   console.log('The link was clicked.');  
  // }
  
  const [state] = useContext(AuthContext);

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
          
          {/* LIKE BUTTON: 
          https://startechies.000webhostapp.com/server/podcast_scripts/like_unlike_podcast.php'+'?user_id='+props.podcast_user_id+'?podcast_id='+props.podcast_id*/}
          {/* <a href="#" onClick={handleClick}> LIKES = {props.podcast_likes}</a> */}
          {/* <a href="#" onClick={location.href='https://startechies.000webhostapp.com/server/podcast_scripts/like_unlike_podcast.php'+'?user_id='+props.podcast_user_id+'?podcast_id='+props.podcast_id} > LIKES = {props.podcast_likes}</a> */}
          {/* <a href={"https://startechies.000webhostapp.com/server/podcast_scripts/like_unlike_podcast.php?podcast_id="+props.podcast_id+"?user_id="+state.id}> THIS ONE = {props.podcast_likes}</a> */}
          
          <LikeComponent podcast_id_1={props.podcast_id} podcast_likes_1={props.podcast_likes} />
          <form onSubmit={handleSubmit}>
            <button>Sign Up = {likes}</button>
          </form>
          <br/>
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

      <div class="col-md-12 text-center">
              <button type="button" class="btn btn-primary" onClick={console.log("HERE")}>LIKES</button>
            </div>
  </> */}

