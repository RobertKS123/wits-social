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

    // const [likes, setLikes] = useState((props.podcast_likes));
    // const [likeState, setLikeState] = useState(false);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {                                      
    //         const response = await axios.get(LIKES_URL,{params:{ podcast_id: props.podcast_id, user_id: state.id}});
    //         setLikes(response?.data?.podcast_no_likes);

    //         if (response?.data?.like_response === true){
    //             setLikeState(true);
    //         }
    //         if (response?.data?.like_response === false){
    //             setLikeState(false);
    //         }
    //     } catch (err) {
    //         if (!err?.response) {
    //             console.log('No Server Response');
    //         }
    //     }
    // }

    // useEffect(() => {
    //     const handleLikes = async () => {
    //         try {
    //             const response = await axios.get(LIKED_BEFORE_URL,{params:{ podcast_id: props.podcast_id, user_id: state.id}});
    //             let d = response?.data;
    //             if (d === "liked"){
    //                 setLikeState(true);
    //             }
    //             if (d === "not_liked"){
    //                 setLikeState(false);
    //             }
    //         } catch (err) {
    //             if (!err?.response) {
    //                 console.log('No Server Response');
    //             }
    //         }
    //     }
    //     handleLikes();
    // }, [])

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
            {/* <button onClick={handleSubmit}>
                <div className={likeState ? 'likes active' : 'likes'}>
                    <AiIcons.AiFillHeart size={25}/>
                </div>
                <span style={{fontSize: 28}}>
                    {likes}
                </span>
            </button> */}
            <div className="comment-outer">
                <CommentComponent podcast_id_comment = {props.podcast_id} likes = {props.podcast_likes}/>
            </div>
        </div>
    )
}

export default Podcast

