import React, { Component, useContext } from "react";
import './CommentComponent.css';
import CommentByUser from "./CommentByUser";
import { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import axios from "../../api/axios";
import {CommentObject} from './CommentObject';
import LikeComponent from "./LikeComponent";

const COMMENT_URL = '/podcast_scripts/fetch_podcast_comments.php';

const CommentComponent = (props) => {

    console.log(JSON.stringify(props));

    const [commentArray, setCommentArray] = useState([])

    useEffect(() => {
        const fetchComments = async () => {
            setCommentArray([]);
            try {
                const response = await axios.get(COMMENT_URL,{params:{podcast_id: props.podcast_id_comment}});
                if ((response?.data === 'no_comments')){
                    setCommentArray([]);
                } else {
                    let d = response?.data;
                    for (let i=0; i<d.length;i++){
                        let temp = new CommentObject(d[i].Podcast_Comment_ID,d[i].EndUser_Username ,d[i].Comment_Body);
                        setCommentArray(commentArray => [...commentArray,temp]);
                    }                    
                }
            } catch (err) {
                console.log('No server response');
            }
        }
        fetchComments();
    },[])

    return (
    <>
        <div className="utility-bar">
            <div className="utility-bar-add-comment">
                <CreateComment podcast_id = {props.podcast_id_comment}/> 
            </div>
            <div className="utility-bar-like">
                <LikeComponent podcast_id = {props.podcast_id_comment} likes={props.likes}/>
            </div>
        </div>
            <div className="commentScrollBox">
                <ul>
                    {commentArray.map((comment)=>{
                        return(
                            <li key={comment.id}>
                                <CommentByUser user_posted={comment.name} comment={comment.body}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
    </>
    )
}

export default CommentComponent
