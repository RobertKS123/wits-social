import React, {useState, useContext, useEffect, useRef} from 'react';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {messageObject} from './MessageObject.js'
import ChatObject from './ChatObject';
import './Chat.css';

const MESSAGE_REGEX = /^/;
const CHAT_URL = '';

// props:  userId,
//         chatterId,
//         chatterUserName,
//         chatterImg,
//         userImg,

const Chat = (props) => {

    let p = new messageObject(1,true,'hello');
    let q = new messageObject(2,false,'hello');
    let r = new messageObject(3,true,'How are you');
    let s = new messageObject(4,false,'good and you');
    let t = new messageObject(5,true,'good');

    let arr1 = [p,q,r,s,t]

    const [chatName, setChatName] = useState('');
    const [chatPic, setChatPic] = useState('');

    const [messageArr, setMessageArr] = useState(arr1);

    const [message, setMessage] = useState('');
    const [validMessage, setValidMessage] = useState(false);

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setValidMessage(MESSAGE_REGEX.test(message));
        if (message.length >= 150) {
            setErrMsg("Message is too long");
            setValidMessage(false);
        } else {
            setErrMsg('');
        }
    }, [message]);

    useEffect(() => {
        //get messages as an array or 2 arrays
        console.log('run');
    }, [messageArr]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let temp = new messageObject(6,false,message);
        setMessageArr(messageArr => [...messageArr, temp]);
    }

    return(
        <div>
            <div className='screen-top'>
                <Link to='/'>
                    <div className='button-back'>
                        <MdIcons.MdOutlineArrowBackIos />
                    </div>
                </Link>
                <div className='chat-name'>
                    <img src='this.jpg' alt='profile picture'/>
                    <p><b>Username</b></p>
                </div>
            </div>
            <div className='chat-body-outer'>
                <ChatObject messages={messageArr}/>
            </div>
            <div className='message-send'>
                <div className='message-enter'>
                    <form onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                        <textarea
                            type='text'
                            id='message'
                            placeholder='Type a message...'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            required
                        />                        
                        <button disabled={!validMessage}>
                            <AiIcons.AiOutlineSend />
                        </button>
                    </form>
                </div>                
            </div>
        </div>
    )
}

export default Chat