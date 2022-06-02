import React, {useState, useContext, useEffect, useRef} from 'react';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {messageObject} from './MessageObject.js'
import ChatObject from './ChatObject';
import axios from '../../api/axios';
import './Chat.css';

const MESSAGE_REGEX = /^/;
const CHAT_URL = '';

// props:  userId,
//         chatterId,
//         chatterUserName,
//         chatterImg, url
//         userImg, url

const Chat = (props) => {

    //test messages
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
        if(message.length <= 0){
            setValidMessage(false);
        }
    }, [message]);

    //show new messages
    useEffect(() => {
        console.log('run');
    }, [messageArr]);

    //load messages
    useEffect(() => {
        //get messages
    })

    //send message
    const handleSubmit = async (e) => {
        e.preventDefault();

        let temp = new messageObject(6,false,message);
        setMessageArr(messageArr => [...messageArr, temp]);
        setMessage('');
        // try {
        //     //should return the new message only
        //     const response = await axios.get(CHAT_URL,{params:{userid : props.id, chatterid: props.cid, message : message}});

        //     if (response?.data?.dne == true){
        //         setErrMsg('user does not exist');
        //     } else {
        //         //ture respose into object this should happen in the object

        //         //add object to array
        //         // let temp = new messageObject(6,false,message);
        //         // setMessageArr(messageArr => [...messageArr, temp]);

        //         // setMessage('');
        //     }
        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else {
        //         setErrMsg('Message Failed')
        //     }
        //     errRef.current.focus();
        // }
    }

    return(
        <div>
            <div className='screen-top'>
                <Link to='/'className='button-back-container'>
                    <MdIcons.MdOutlineArrowBackIos className='button-back'/>
                </Link>
                <img src='https://startechies.000webhostapp.com/resources/img/logo.jpeg' alt='profile picture' className='chat-img'/>
                <p className='chat-username'>Username</p>
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
                            //required
                        />                        
                        <button disabled={!validMessage} className='button-message'>
                            <AiIcons.AiOutlineSend />
                        </button>
                    </form>
                </div>                
            </div>
        </div>
    )
}

export default Chat