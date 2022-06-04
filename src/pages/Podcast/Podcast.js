import React, { useState, useEffect, useRef, location, parent, useContext, } from "react";
import './Podcast.css';
//import '../../components/login/Signup.css';
import AudioComponent from "./AudioComponent";
import CommentComponent from "./CommentComponent";
import * as AiIcons from 'react-icons/ai';
import * as FcIcons from 'react-icons/fc';
import LikeComponent from "./LikeComponent";
import { AuthContext } from "../../api/AuthProvider";
import axios from '../../api/axios';

const LIKES_URL = '/podcast_scripts/like_unlike_podcast.php'; //link to database
const LIKED_BEFORE_URL = '/podcast_scripts/liked_before.php'; //link to liked_before php file

function Podcast(props) {
    const [state] = useContext(AuthContext);
    
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const [likes, setLikes] = useState((props.podcast_likes));
    const [likeState, setLikesState] = useState(false);

    const handleSubmit = async (e) => { //wehn someone presses the like button
        e.preventDefault();
        //Axios - speaks to ther server
        try {                                                     //database_variable ; my_variable
            const response = await axios.get(LIKES_URL,{params:{ podcast_id: props.podcast_id, user_id: state.id}});
            setSuccess(true);
            
            setLikes(response?.data?.podcast_no_likes);

            // console.log(JSON.stringify(response?.data));
            // console.log("PODCAST_ID = ", props.podcast_id);
            // console.log("USER_ID = ", state.id);

            if (response?.data?.like_response === true){
                setLikesState(true);
                //setLikes(props.podcast_likes-1)
            }
            if (response?.data?.like_response === false){
                setLikesState(false);
                //setLikes(props.podcast_likes+1)
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }
    let json_2;

    useEffect(() => {
        const response_2 = axios.get(LIKED_BEFORE_URL,{params:{ podcast_id: props.podcast_id, user_id: state.id}});
        var final_response;

        response_2.then(function(result){
            final_response = result.data;
            if (final_response === "liked"){
                setLikesState(true);
            }
            if (final_response === "not_liked"){ //response_2?.data?.like_response
                setLikesState(false);
            }
        }
    )}, []);


    if (likeState === true){ //this means liked
        return(
            <div className="podcastOuter bg-dark" style={ { backgroundImage: `url(${props.podcast_back_image})`}} >
                <img src={props.podcast_profile_image} className="profilePic img-thumbnail mx-auto d-block"/>
            
                <div className="podcastTitle">
                    <span className="badge badge-pill badge-light podcastTitle">{props.podcast_title}</span>
                </div>
                <div className="podcastDescription">
                    <span class="badge badge-primary">
                        {props.podcast_description}
                    </span>
                </div>
                <div className="podcastCreator">
                    <span className="badge badge-dark">
                        Uploaded by {props.podcast_username}
                    </span>
                </div>
                <AudioComponent audio_url={props.podcast_audio}/>
                <button className={likeState ? 'likes active' : 'likes'} onClick={handleSubmit}>
                    <div>
                        <FcIcons.FcLike  className='input-icon' size={25}/>
                        <span style={{fontSize: 28}}>
                            {likes}
                        </span>
                    </div>
                </button>
                <CommentComponent podcast_id_comment = {props.podcast_id}/>
            </div>
        )
    } else { //this means unliked
    return(
        <div className="podcastOuter bg-dark" style={ { backgroundImage: `url(${props.podcast_back_image})`}} >
            <img src={props.podcast_profile_image} className="profilePic img-thumbnail mx-auto d-block"/>
            <div className="podcastTitle">
                <span className="badge badge-pill badge-light podcastTitle">
                    {props.podcast_title}
                </span>
            </div>
            <div className="podcastDescription">
                <span class="badge badge-primary">
                    {props.podcast_description}
                </span>
            </div>
            <div className="podcastCreator">
                <span className="badge badge-dark">
                    Uploaded by {props.podcast_username}
                </span>
            </div>          
            <AudioComponent audio_url={props.podcast_audio}/>
            <button className={likeState ? 'likes active' : 'likes'} onClick={handleSubmit}>
                <div>
                    <AiIcons.AiOutlineLike className='input-icon' size={25} color={"white"}/> 
                    <span style={{fontSize: 28}}>
                        {likes}
                    </span>
                </div>
            </button>
            <CommentComponent podcast_id_comment = {props.podcast_id}/>
        </div>
    )
    }
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

