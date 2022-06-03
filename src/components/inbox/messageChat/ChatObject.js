import React, { useEffect } from 'react';
import { messageObject } from './MessageObject';

const ChatObject = (props) => {
    let messages = props.messages;

    return(
        <div className='chat-body-outer'>
            <ul>
                {messages.map((message) => {
                    return(
                        <li key={message.id}>
                            <div className='chat-text-outer'>
                                <div className={message.src ? 'user-text' : 'chatter-text'}>
                                    <div className={message.src ? 'user-test-inner' : 'chatter-text-inner'}>
                                        <div>
                                            <img src={message.img} alt='pf' className='pfp-img'></img>
                                        </div>
                                        <div className='message-text'>
                                            {message.message}
                                        </div>
                                    </div>
                                </div>                            
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default ChatObject