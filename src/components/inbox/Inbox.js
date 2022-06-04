import React,{useState, useEffect, useContext, useRef} from 'react';
import * as BiIcons from 'react-icons/bi';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';
import axios from '../../api/axios';
import ChatBox from './ChatBox';
import { ChatContact } from './ChatContact';
import Chat from './messageChat/Chat';
import { AuthContext } from '../../api/AuthProvider';
import { Link } from 'react-router-dom';
import './Inbox.css';

const INBOX_URL ='/direct_messaging/inbox.php';
const SEARCH_URL ='/direct_messaging/search_username.php';

const Inbox = () => {

    const [state] = useContext(AuthContext);

    const [search,setSearch] = useState('');
    const [validSearch, setValidSearch] = useState(false);

    const [user, setUser] = useState({});

    const [chats, setChats] = useState([]);     

    const [empty, setEmpty] = useState(true);

    const [refresh, setRefresh] = useState(false);

    const [defaultMessage, setDefaultMessage] = useState("search a user and start chatting...");

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setEmpty(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(INBOX_URL,{params:{logged_in_UserID: state.id}}); //change to state.id
                if (response?.data === 301){ //no chats
                    setEmpty(true);
                    setDefaultMessage('search a user and start chatting...');
                } else {
                    setDefaultMessage("search a user and start chatting...");
                    setEmpty(false);

                    setRefresh(true);
                    setChats([]);

                    let u = response?.data.logged_in_user_info;
                    let tempUser = new ChatContact(u.EndUser_ID, u.EndUser_Username, u.EndUser_ProfilePicLink);//chage to state.id
                    setUser(tempUser);

                    let d = response?.data.inbox_user_info;
                    for (let i=0;i<d.length;i++){
                        let tempChat = new ChatContact(d[i].EndUser_ID, d[i].EndUser_Username, d[i].EndUser_ProfilePicLink); 
                        setChats(chats => [...chats,tempChat]);
                    }
                    setEmpty(false);
                }            
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else {
                    setErrMsg('Message Failed')
                }
            }
        }
        fetchData();
    },[refresh])

    useEffect(() => {
        if (search.length >= 20) {
            setErrMsg("Search is too long");
            setValidSearch(false);
        } else if(search.length <= 0){
            setValidSearch(false);
        } else {
            setValidSearch(true);
        }
    }, [search])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(SEARCH_URL,{params:{username_wildcard:search,logged_in_user_id:state.id}}); //charge to loged in user
            if (response?.data === 301) { //no users found
                setDefaultMessage('No users Found');
            } else {
                //setRefresh(false);
                setChats([]);
                let u = response?.data.logged_in_user_info;
                let tempUser = new ChatContact(u.EndUser_ID, u.EndUser_Username, u.EndUser_ProfilePicLink);//chage to state.id
                setUser(tempUser);
                let d = response?.data.wildcard_matches;
                for (let i=0;i<d.length;i++){
                    let tempChat = new ChatContact(d[i].EndUser_ID, d[i].EndUser_Username, d[i].EndUser_ProfilePicLink); 
                    setChats(chats => [...chats,tempChat]);
                }
                setEmpty(false);
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }

    return(
        <>
            <div className='search-bar'>
                <div className='search-back-button-outer'>
                    <button onClick={() => setRefresh(false)} className='search-back-button'>
                        <div className='button-back'>
                            <MdIcons.MdOutlineArrowBackIos />
                        </div>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='search-form'>
                    <div className='search-bar-outer'>
                        <div className='search-bar-inner'>
                            <div className='search-icon'>
                                <BiIcons.BiSearchAlt2/>
                            </div>
                            <div className='search-input'>
                                <input
                                    type="text"
                                    id="search"
                                    placeholder='Search'
                                    autoComplete='off'
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            </div>
                            <div className='search-button-outer'>
                                <button disabled={!validSearch} className='search-button'>
                                    <FiIcons.FiSend className='search-button-icon'/>    
                                </button>
                            </div>
                        </div>
                    </div>
                </form>                
            </div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            {empty ? (
                <div className='default-message'>                 
                    <p>{defaultMessage}</p>
                </div>
            ) : (
                <div className='chat-list'>  
                    <div className='chat-list-inner'>
                        <ul>
                            {chats.map((chat) => {
                                return(
                                    <li key={chat.id}>
                                        <ChatBox user={user} chat={chat}/>                                
                                    </li>
                                )
                            })}
                        </ul>
                    </div>                 
                </div>
            )}

        </>
    )
}

export default Inbox