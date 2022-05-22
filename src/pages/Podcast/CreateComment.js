import React, { useState, useEffect, useRef, location, parent, useContext, } from "react";
import './Podcast.css';
import * as BsIcons from 'react-icons/bs';
import { AuthContext } from "../../api/AuthProvider";
import axios from '../../api/axios';
import CommentByUser from "./CommentByUser";

const COMMENTS_URL = '/podcast_scripts/insert_podcast_comment.php'; //link to database

function CreateComment(props) {
    const [state] = useContext(AuthContext);
    
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const [comment, setComments] = useState('');

    useEffect(() => {
        
    })

    const handleSubmit = async (e) => { //wehn someone presses the like button
        e.preventDefault();

        const id = state.id;
        //Axios - speaks to ther server
        try {                                                     //database_variable ; my_variable
            const response = await axios.get(COMMENTS_URL,{params:{ user_id: id, podcast_id: props.podcast_id, comment_body: comment}});
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Comment not inserted')
            }
        }
    } 
  
    return(
      
          <div className="Create-Comment"> 
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <BsIcons.BsFillPersonFill className='input-icon'/>
                    <input
                        type="text"
                        id="comments"
                        placeholder='Comment'
                        autoComplete="off"
                        onChange={(e) => setComments(e.target.value)}
                        value={comment}
                        required
                    />
                </div>
                <button>Comment</button>
            </form>
          </div>
    )
}
  

  export default CreateComment


