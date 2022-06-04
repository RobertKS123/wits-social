import React, {useState, useEffect, useRef, useContext} from 'react'
import axios from '../../api/axios';
import { AuthContext } from '../../api/AuthProvider';
import * as AiIcons from 'react-icons/ai';
import './Podcast.css';

const LIKES_URL = '/podcast_scripts/like_unlike_podcast.php'; //link to database
const LIKED_BEFORE_URL = '/podcast_scripts/liked_before.php'; //link to liked_before php file

const LikeComponent = (props) => {

    const [state] = useContext(AuthContext);

    const [likes, setLikes] = useState((props.likes));
    const [likeState, setLikeState] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(JSON.stringify(props));
        try {                                      
            const response = await axios.get(LIKES_URL,{params:{ podcast_id: props.podcast_id, user_id: state.id}});
            setLikes(response?.data?.podcast_no_likes);
            console.log('run');
            if (response?.data?.like_response === true){
                setLikeState(true);
            }
            if (response?.data?.like_response === false){
                setLikeState(false);
            }
            console.log(JSON.stringify(response?.data));
        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            }
        }
    }

    useEffect(() => {
        const handleLikes = async () => {
            try {
                const response = await axios.get(LIKED_BEFORE_URL,{params:{ podcast_id: props.podcast_id, user_id: state.id}});
                let d = response?.data;
                if (d === "liked"){
                    setLikeState(true);
                }
                if (d === "not_liked"){
                    setLikeState(false);
                }
            } catch (err) {
                if (!err?.response) {
                    console.log('No Server Response');
                }
            }
        }
        handleLikes();
    }, [])

    return(
        <div className='like-outer'>
            <button onClick={handleSubmit} className='like-button'>
                <div className='like-inner'>
                    <div className={likeState ? 'likes active' : 'likes'}>
                        <AiIcons.AiFillHeart/>
                    </div>
                    <div className='like-text'>
                        {likes}
                    </div>
                </div>
            </button>
        </div>
    )
}


export default LikeComponent