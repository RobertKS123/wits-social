import React, {useState, useContext, useEffect, useRef} from 'react';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import {messageObject} from './MessageObject.js'
import ChatObject from './ChatObject';
import axios from '../../../api/axios';
import './Chat.css';
import { AuthContext } from '../../../api/AuthProvider';
import { ChatContact } from '../ChatContact.js';

const MESSAGE_REGEX = /^/;
const MESSAGES_URL = '/direct_messaging/fetch_messages.php';
const SEND_URL = '/direct_messaging/insert_direct_message.php';
const USER_DATA_URL = '/direct_messaging/get_user_info.php';

// props:  userId,
//         chatterId,
//         chatterUserName,
//         chatterImg, url
//         userImg, url

const Chat = () => {

    const [state] = useContext(AuthContext);

    //console.log(state.id);
    //console.log(state.chat);

    const [userData, setUserData] = useState({});

    const [chatData, setChatData] = useState({});

    const [change, setChange] = useState(0);

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

    useEffect(() => {
        const fetchData = async () => {
            let response2;
            let img1;
            let img2;
            try {
                const response = await axios.get(USER_DATA_URL,{params:{user_id : state.id}});
                    let d = response?.data[0];
                    let tempUser = new ChatContact(d.EndUser_ID, d.EndUser_Username, d.EndUser_ProfilePicLink);//chage to state.id
                    img1 = d.EndUser_ProfilePicLink;
                    setUserData(tempUser);
            } catch (e) {
                if (!e?.response) {
                    setErrMsg('No Server Response1');
                } else {
                    setErrMsg('Message Failed')
                }
            }
            try {
                const response1 = await axios.get(USER_DATA_URL,{params:{user_id : state.chat}});
                    let d1 = response1?.data[0];
                    let tempUser1 = new ChatContact(d1.EndUser_ID, d1.EndUser_Username, d1.EndUser_ProfilePicLink);//chage to state.id
                    img2 = d1.EndUser_ProfilePicLink;               
                    setChatData(tempUser1);
            } catch (e) {
                if (!e?.response) {
                    setErrMsg('No Server Response2');
                } else {
                    setErrMsg('Message Failed')
                }
            }
            try {
                response2 = await axios.get(MESSAGES_URL,{params:{logged_in_user_id : state.id, chatting_with_id : state.chat}});
            } catch (e) {
                if (!e?.response) {
                    setErrMsg('No Server Response3');
                } else {
                    setErrMsg('Message Failed')
                }
            }
            let d2 = response2.data;
                for (let i = 0; i<d2.length;i++){
                    let tempId = d2[i].Direct_Message_ID;
                    let tempMessage = d2[i].Message_Body;
                    let tempSrc = true;
                    let tempImg = img1;
                    if (d2[i].Sender_UserID !== state.id){tempSrc = false; tempImg = img2;}; //state.id
                    let temp = new messageObject(tempId, tempSrc, tempMessage, tempImg);
                    setMessageArr(messageArr => [...messageArr,temp]);
                }
        }      
        fetchData();
    }, [])

    //send message
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //const response = await axios.get(SEND_URL,{params:{sender_user_id : props.user.id, recipient_user_id : props.chat.id, message_body : message}});
            const response = await axios.get(SEND_URL,{params:{sender_user_id : state.id, recipient_user_id : state.chat, message_body : message}});

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
                let tempImg = userData.img;
                console.log(userData.img);
                if (l.Sender_UserID !== state.id){tempSrc = false; tempImg = chatData.img};
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
                <div className='button-back-container'>
                    <Link to='/inbox'>
                        <div className='button-back'>
                            <MdIcons.MdOutlineArrowBackIos />
                        </div>
                    </Link>
                </div>
                <img src={chatData.img} alt='profile picture' className='chat-img'/>
                <p className='chat-username'>{chatData.username}</p>
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