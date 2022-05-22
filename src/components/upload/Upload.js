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

    const [podcast, setPodcast] = useState(null);
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

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         audio_file: null,
    //         audio_name: null,
    //         audio_description: null,
    //     };
    // }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const v1 = NAME_REGEX.test(name);
        const v2 = DESC_REGEX.test(desc);

        if (!v1 || !v2 ) {
            setErrMsg("Invalid Entry");
            return;
        }

        const FileUploader = ({onFileSelect}) => {
            const fileInput = useRef(null)
        
            const handleFileInput = (e) => {
                // handle validations
                onFileSelect(e.target.files[0])
            }

        //Axios goes here 
        try {
            const id = state.id;
            console.log(JSON.stringify(podcast));
            const response = await axios.get(UPLOAD_URL,{params:{user_id : id, podcast_title: name, podcast_description : desc, fileToUpload : podcast }});
            
            if (response?.data?.file_exists == true) { //name taken
                setErrMsg('This podcast name is already in use');           
            } else if (response?.data?.extension_valid == false) { //not accepted audio type
                setErrMsg('This is not an accepted audio type');
            } else {          
                console.log('success');    
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
            <form  encType='multipart/form-data' onSubmit={handleSubmit}>   
                <div className='input-container'>
                    {/*<BsIcons.BsFillPersonFill className='input-icon'/>*/}
                    <input className='file-name'
                        type="text"
                        id="podcast_title"
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
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />*/}
                </div>
                <div className='input-container'>
                    {/*<BsIcons.BsFillPersonFill className='input-icon'/>*/}
                    <textarea
                        type="text"
                        id="podcast_description"
                        placeholder='Podcast Description'
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                        required
                        onFocus={() => setDescFocus(true)}
                        onBlur={() => setDescFocus(false)}
                    />
                    {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />*/}
                </div>
                <div className='input-container'>
                    <p>Add your podcast here</p>
                    <AiIcons.AiOutlinePlusCircle />
                    <input
                        type='file'
                        id="fileToUpload"
                        accept='audio/mp3, audio/wav'
                        // onChange={(e) => setPodcast(e.target.files[0])}
                        onChange={handleFileInput}
                        name="fileToUpload"
                        // style={{display: 'none'}}
                        value={podcast}
                        required
                    />
                </div>
                <button disabled={!validName || !validDesc ? true : false}>Upload</button>
            </form>
        </section>
    );
}

export default Upload