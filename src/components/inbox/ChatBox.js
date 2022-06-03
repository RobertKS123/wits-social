import React,{useState} from "react";
import { Link } from "react-router-dom";

const ChatBox = (props) => {
    console.log(JSON.stringify(props));

    let chat = props.chat;
    let user = props.user;

    //if(chat)

    return ( 
        <div className="chat">
            <Link to='/chat' user={user} chat={chat}>
                <img scr={chat.img} alt='pf'/>
                <p>{chat.userName}</p>
            </Link>
        </div>
    )
}

export default ChatBox