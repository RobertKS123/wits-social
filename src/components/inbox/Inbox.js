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

const INBOX_URL ='';
const SEARCH_URL ='';

const Inbox = () => {

    let c = new ChatContact(2, 'test');

    const [state] = useContext(AuthContext);

    const [search,setSearch] = useState('');
    const [validSearch, setValidSearch] = useState(false);

    const [user, setUser] = useState({});

    const [chats, setChats] = useState([c]);     

    const [empty, setEmpty] = useState(true);

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        //TODO:
        //Get chats
        //load into objects

        const fetchData = async () => {
            try {
                const response = await axios.get(INBOX_URL,{params:{userId: state.id}});
        
                if (response?.data?.dne === 301){ //no chats
                    setEmpty(true);
                } else {
                    setEmpty(false);
                    //load into objects
                    //Load object into arr        
                    // let u = new ChatContact(1,'user');
                    // setUser(u);    
            
                    // let c2 = new ChatContact(3, 'test2');

                    // let arr1 = c2;

                    // setChats(chats => [...chats,arr1]);
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
    },[])

    useEffect(() => {
        if (search.length >= 20) {
            setErrMsg("Search is too long");
            setValidSearch(false);
        } else {
            setErrMsg('');
        }
        if(search.length <= 0){
            setValidSearch(false);
        }
    }, [search])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //collect form data
        //search with contexts
        //send user id and search criteria
        try {
            const response = await axios.get(SEARCH_URL,{params:{userId:state.id,search:search}});
            if (response?.data?.dne === 301) { //no users found
                setErrMsg('No users Found');
            } else {
                //fill chats array with the data 
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
            <Link to='/inbox'>
                <MdIcons.MdOutlineArrowBackIos className='button-back'/>
            </Link>
            <form onSubmit={handleSubmit}>
                <BiIcons.BiSearchAlt2/>
                <input
                    type="text"
                    id="search"
                    placeholder='Search'
                    autoComplete='off'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button disabled={!validSearch}><FiIcons.FiSend/></button>
            </form>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            {empty ? (
                <div>                    
                    <p>search a user and start chatting...</p>
                </div>
            ) : (
                <div>                    
                    <ul className='chats'>
                        {chats.map((chat) => {
                            return(
                                <li key={chat.id}>
                                    <ChatBox user={user} chat={chat}/>                                
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}

        </>
    )
}

export default Inbox