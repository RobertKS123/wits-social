import { useRef, useState, useEffect, useContext } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import { AuthContext } from '../../api/AuthProvider';
import { LOGIN } from '../../api/Constants'
import axios from '../../api/axios';
import { Link,Redirect } from 'react-router-dom';
import "./Signup.css";

const LOGIN_URL = '/login/end_user_login.php';

const Login = () => {
    const [state,dispatch]  = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(LOGIN_URL,{params:{ email: email, password: pwd }});;
            if(response?.data?.login === 301){
                setErrMsg('Incorrect Username or Password');
            }
            else {
                const user_id = response?.data?.user_id;
                
                dispatch({
                    type: LOGIN,
                    payload : user_id,
                })

                setEmail('');
                setPwd('');
                setSuccess(true);
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err?.response?.data?.login === 301) {
                setErrMsg('Incorrect Username or Password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <Redirect to='/home'/>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                    <div className='input-container'>
                        <BsIcons.BsFillPersonFill className='input-icon'/>
                        <input
                            type="text"
                            id="email"
                            placeholder='Email Adress'
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div className='input-container'>
                        <RiIcons.RiLockPasswordLine className='input-icon'/>
                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </div>

                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to='/signup'>
                                Signup
                            </Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login