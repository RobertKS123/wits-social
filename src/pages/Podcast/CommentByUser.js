import React from "react";
import './CommentByUser.css';




function CommentByUser(props) {

    
    return <>
        <div className="commentByUserOuter mt-2 text-white mb-2">
        <span class="badge badge-light">{props.user_posted}</span> <br/>
            {props.comment}
        </div>
    </>
    
  }

  export default CommentByUser;