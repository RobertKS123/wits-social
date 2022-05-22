import React from "react";
import './CommentByUser.css';
import CreateComment from "./CreateComment";

function CommentByUser(props) {

    
    return <>
        <div className="commentByUserOuter mt-2 text-white mb-2">
        <span className="badge badge-light">{props.user_posted}</span> <br/>
            {props.comment}
        </div>
    </>
    
}

export default CommentByUser