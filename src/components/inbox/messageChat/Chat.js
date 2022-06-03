import React, {useState, useContext, useEffect, useRef} from 'react';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {messageObject} from './MessageObject.js'
import ChatObject from './ChatObject';
import axios from '../../../api/axios';
import './Chat.css';
import { AuthContext } from '../../../api/AuthProvider';

const MESSAGE_REGEX = /^/;
const MESSAGES_URL = '/direct_messaging/fetch_messages.php';
const SEND_URL = '/direct_messaging/insert_direct_message.php';

// props:  userId,
//         chatterId,
//         chatterUserName,
//         chatterImg, url
//         userImg, url

const Chat = (props) => {


    const [state] = useContext(AuthContext);

    const [chatName, setChatName] = useState('');
    const [chatPic, setChatPic] = useState('');

    const [messageArr, setMessageArr] = useState([]);

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
    }, [messageArr]);

    //load messages
    useEffect(() => {
        console.log('here');
        const fetchMessages = async () => {
            try {
                //const response = await axios.get(MESSAGES_URL,{params:{logged_in_user_id : props.user.id, chatting_with_id: props.user.id}});
                const response = await axios.get(MESSAGES_URL,{params:{logged_in_user_id : 31, chatting_with_id : 39}});
                if (response?.data === 301){
                    setErrMsg('some thing went wrong'); //make this not an error
                } else {
                    //[{"Direct_Message_ID":1,"Sender_UserID":31,"Receiver_UserID":39,"Message_TimeSent":"2022-06-03 13:36:56","Message_Body":"Hi, how are you"}
                    let d = response?.data;
                    console.log(JSON.stringify(d));
                    for (let i = 0; i<d.length;i++){
                        let tempId = d[i].Direct_Message_ID;
                        let tempMessage = d[i].Message_Body;
                        let tempSrc = true;
                        let tempImg = 'https://startechies.000webhostapp.com/resources/img/logo.jpeg';
                    if (d[i].Sender_UserID !== 31){tempSrc = false; tempImg = null};
                    let temp = new messageObject(tempId, tempSrc, tempMessage, tempImg);
                    setMessageArr(messageArr => [...messageArr,temp]);
                    }
                }
            } catch (e) {
                if (!e?.response) {
                    setErrMsg('No Server Response');
                } else {
                    setErrMsg('Message Failed')
                }
            }
        }
        try {
            fetchMessages();           
        } catch (err) {
            console.log(err);
        }
    }, [])

    //send message
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //const response = await axios.get(SEND_URL,{params:{sender_user_id : props.user.id, recipient_user_id : props.chat.id, message_body : message}});
            const response = await axios.get(SEND_URL,{params:{sender_user_id : 31, recipient_user_id : 39, message_body : message}});

            console.log(JSON.stringify(response?.data));

            if (response?.data === 301){
                setErrMsg('some thing went wrong');
            } else {
                let l = response.data[0];
                console.log(JSON.stringify(l));
                let tempId = l.Direct_Message_ID;
                let tempMessage = l.Message_Body;
                let tempSrc = true;
                //let tempImg = props.user.img;
                //if (l.Sender_UserID !== state.id){tempSrc = false; tempImg = props.chat.img};
                let tempImg = 'https://startechies.000webhostapp.com/resources/img/logo.jpeg';
                if (l.Sender_UserID !== 31){tempSrc = false; tempImg = null};
                let temp = new messageObject(tempId, tempSrc, tempMessage, tempImg);

                setMessageArr(messageArr => [...messageArr,temp]);

                setMessage('');
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Message Failed')
            }
            errRef.current.focus();
        }
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
                <form onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <div className='send-message-outer'>
                        <div className='send-message-inner'>
                            <textarea
                                type='text'
                                id='message'
                                placeholder='Type a message...'
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                //required
                            />                        
                        </div>
                        <div>
                            <button disabled={!validMessage} className='button-message'>
                                <AiIcons.AiOutlineSend />
                            </button>
                        </div>
                    </div>
                </form>              
            </div>
        </div>
    )
}

export default Chat