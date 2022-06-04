import React, { useState, useEffect, useRef, location, parent, useContext, } from "react";
import './CreateComment.css';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from "react-icons/bi";
import { AuthContext } from "../../api/AuthProvider";
import axios from '../../api/axios';
import CommentByUser from "./CommentByUser";


const COMMENTS_URL = '/podcast_scripts/insert_podcast_comment.php'; //link to database

function CreateComment(props) {
    const [state] = useContext(AuthContext);
    
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const [comment, setComments] = useState('');

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

        console.log("evalue = ", comment);

        setComments('');

        
    }
    return(
        <div className="create-comment"> 
            <form onSubmit={handleSubmit}>
                <div className="create-comment-inner">
                    <div className="create-comment-icon">
                        <AiIcons.AiOutlineComment/>
                    </div>
                    <div className='create-comment-input'>
                        <input
                            type="text"
                            id="comments"
                            placeholder='Add a comment...'
                            autoComplete="off"
                            onChange={(e) => setComments(e.target.value)}
                            value={comment}
                            required
                        />
                    </div>
                    <div className='create-comment-button-outer'>
                        <button className='create-comment-button'>
                            <div className='create-comment-button-icon'>
                                <AiIcons.AiOutlineSend />
                            </div>
                        </button>
                    </div>
                </div>            
            </form>
        </div>
    )
}

export default CreateComment


