import React,{useState,useEffect,useRef,useContext} from 'react';
import axios from '../../api/axios';
import { AuthContext } from '../../api/AuthProvider';
import { Link,Redirect } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import './Upload.css';

const NAME_REGEX =/^/;
const DESC_REGEX =/^/;
const UPLOAD_URL = '/podcast_scripts/upload_podcast.php';

const Upload = () => {
    const [state] = useContext(AuthContext);

    const errRef = useRef();
    const nameRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [desc, setDesc] = useState('');
    const [validDesc, setValidDesc] = useState(false);
    const [descFocus, setDescFocus] = useState(false);

    const [podcast, setPodcast] = useState('');
    const [validPodcast, setValidPodcast] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name]);

    useEffect(() => {
        setValidDesc(DESC_REGEX.test(desc));
    }, [desc]);

    useEffect(() => {
        setValidPodcast(true);
    }, [podcast]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const v1 = NAME_REGEX.test(name);
        const v2 = DESC_REGEX.test(desc);

        if (!v1 || !v2 ) {
            setErrMsg("Invalid Entry");
            return;
        }

        //Axios goes here 
        try {
            const id = state.id;

            const response = await axios.get(UPLOAD_URL,{params:{user_id : id, podcast_title: name, podcast_description : desc, fileToUpload : podcast }});
            
            if (response?.data?.file_exists === true) { //name taken
                setErrMsg('This podcast name is already in use');           
            } else if (response?.data?.extension_valid === false) { //not accepted audio type
                setErrMsg('This is not an accepted ausio type');
            } else {              
                setSuccess(true);
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Upload Failed')
            }
            errRef.current.focus();
        }
    }

    return(
        <section className='w3-monospace'>
            <h1>Create!</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='input-container'>
                    {/*<BsIcons.BsFillPersonFill className='input-icon'/>*/}
                    <input
                        type="text"
                        id="name"
                        placeholder='Podcast Name'
                        ref={nameRef}
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                    />
                    {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
                </div>
                <div className='input-container'>
                    {/*<BsIcons.BsFillPersonFill className='input-icon'/>*/}
                    <textarea
                        type="text"
                        id="desc"
                        placeholder='Podcast Description'
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                        required
                        onFocus={() => setDescFocus(true)}
                        onBlur={() => setDescFocus(false)}
                    />
                    {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
                </div>
                <div className='input-container'>
                    <p>Add your podcast here</p>
                    <AiIcons.AiOutlinePlusCircle />
                    <input
                        type='file'
                        id="podcast"
                        accept='audio/mp3, audio/wav'
                        onChange={(e) => setPodcast(e.target.value)}
                        // style={{display: 'none'}}
                    />
                </div>
                <button disabled={!validName || !validDesc ? true : false}>Upload</button>
            </form>
        </section>
    );
}

export default Upload