import React, { useEffect } from 'react';
import { messageObject } from './MessageObject';

const ChatObject = (props) => {
    let messages = props.messages;

    return(
        <div>
            <ul className='chat-body'>
                {messages.map((message) => {
                    return(
                        <li key={message.id} className={message.src ? 'chat-user' : 'chat-chatter'}>
                            <div className='message-contaier'>
                                <img src={message.img} alt='pf'></img>
                                <p>{message.message}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default ChatObject