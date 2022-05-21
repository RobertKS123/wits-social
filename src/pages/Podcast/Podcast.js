import React, { useState, useEffect, useRef, location, parent, useContext, } from "react";
import './Podcast.css';
import AudioComponent from "./AudioComponent";
import CommentComponent from "./CommentComponent";
import * as AiIcons from 'react-icons/ai';
import LikeComponent from "./LikeComponent";
import { AuthContext } from "../../api/AuthProvider";
import axios from '../../api/axios';

const LIKES_URL = '/podcast_scripts/like_unlike_podcast.php'; //link to database
const number_of_presses = 0;
const number_of_likes_real = 0;

function Podcast(props) {
    const [state] = useContext(AuthContext);
    
    const [success, setSuccess] = useState(false); //maybe button changes colour - in css
    const [errMsg, setErrMsg] = useState('');

    const [likes, setLikes] = useState((props.podcast_likes));
    const [likeState, setLikesState] = useState(false);

    const handleSubmit = async (e) => { //wehn someone presses submit on the form
        e.preventDefault();
        process.env.number_of_presses=process.env.number_of_presses+1;

        if (number_of_presses%2===0){
          setLikes(likes-1);
          process.env.number_of_likes_real = props.podcast_likes-1;
          console.log("YYYYYYYY");
        }
        if (number_of_presses%2===1){
          setLikes(likes+1)
          process.env.number_of_likes_real = props.podcast_likes+1;
          console.log("SSSSSSSSSSS");
        }
        // prevents button hack
        //Axios - speaks to ther server
        try {                                                     //database_variable ; my_variable
            const response = await axios.get(LIKES_URL,{params:{ podcast_id: props.podcast_id, username: state.id}});
            setSuccess(true);
            setLikes(response?.data?.podcast_no_likes); //Change based on php response
            console.log(JSON.stringify(response?.data))
            if (response?.data?.like_response === true){
              setLikesState(true);
              setLikes(props.podcast_likes-1)
              console.log("HEREEEEE");
            }
            if (response?.data?.like_response === false){
              setLikesState(false);
              setLikes(props.podcast_likes+1)
            }
            //setLikesState(true);
            setLikes(response?.data?.podcasr_no_likes);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
        }

        console.log("NUMBER OF LIKES = ", likes);
    }

  //const url = "https://startechies.000webhostapp.com/end_users/banners/banner_sample_1.png";    
    return(
      <div className="podcastOuter bg-dark" style={ { backgroundImage: `url(${props.podcast_back_image})`}} >
        <img src={props.podcast_profile_image} className="profilePic img-thumbnail mx-auto d-block"/>
        
          <div className="podcastTitle text-white">
          {props.podcast_title}
          {/* <span className="badge badge-dark">{props.podcast_title}</span>  */}
            <br/>
            <div className="podcastDescription"> {props.podcast_description}</div>
            <div className="podcastCreator"><span className="badge badge-dark">Uploaded by {props.podcast_username}</span></div>
          </div>                   
          
          <AudioComponent audio_url={props.podcast_audio}/>
          <button className={likeState ? 'likes active' : 'likes'} onClick={handleSubmit}>
            <div>
              <AiIcons.AiTwotoneLike/>
              <span>{process.env.number_of_likes_real}</span>
            </div>
          </button>
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

