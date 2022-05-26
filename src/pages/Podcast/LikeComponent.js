import React, {useState, useEffect, useRef, useContext} from 'react'
import axios from '../../api/axios';
import { AuthContext } from '../../api/AuthProvider';


const REGISTER_URL = '/podcast_scripts/like_unlike_podcast.php'; //link to database


const LikeComponent = (props) => {
    const [state,dispatch]  = useContext(AuthContext); //change state 
    const [success, setSuccess] = useState(false); //maybe button changes colour - in css
    const [errMsg, setErrMsg] = useState('');

    const [likes, setLikes] = useState(props.podcast_likes_1);
    const [likeState, setLikesStates] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [])

    const handleSubmit = async (e) => { //wehn someone presses submit on the form
        e.preventDefault();
        // prevents button hack

        //Axios - speaks to ther server
        try {                                                     //database_variable ; my_variable
            const response = await axios.get(REGISTER_URL,{params:{ podcast_id: props.podcast_id_1, username: state.id}});
            setSuccess(true);
            setLikes(response?.data?.podcast_likes);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
        }

        console.log("NUMBER OF LIKES = ", likes);
    }
    return (
        <>
           
        <form onSubmit={handleSubmit}>
            <button>Sign Up = {likes}</button>
        </form>
            
        </>
    )
}


export default LikeComponent