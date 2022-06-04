import React,{useContext, useState} from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../api/AuthProvider";
import { CHAT } from "../../api/Constants";
import './Inbox.css';

const ChatBox = (props) => {

    const [state,dispatch] = useContext(AuthContext);

    let chat = props.chat;
    let user = props.user;

    const history = useHistory();

    //if(chat)

    const handleChange = async () => {
        console.log('run');
        dispatch({
            type: CHAT,
            payload : chat.id,
        })
        history.push('/chat');
    }

    return ( 
        <div className="chat-outer">
            <div onClick={handleChange}>
                <div className="chat-inner">
                    <div>
                        <img src={chat.img} alt='pf' className="chat-pf-img"/>
                    </div>
                    <div className="chat-username">
                        {chat.username}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox