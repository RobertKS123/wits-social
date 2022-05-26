import React from "react";
import reactRouterDom from "react-router-dom";
import Signup from "../login/Signup"; 
import { useRef, useState, useEffect, useContext } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ai';
import axios from 'axios';
import Home from "../../pages/home/Home";

const LOGIN_URL = 'https://startechies.000webhostapp.com/server/login/end_user_login.php';


const Reset = () =>{


    
        const userRef = useRef();
        const errRef = useRef();
    
        const [user, setUser] = useState('');
        const [pwd, setPwd] = useState('');
        const [errMsg, setErrMsg] = useState('');
        const [success, setSuccess] = useState(false);
    
        useEffect(() => {
            userRef.current.focus();
        }, [])
    
        useEffect(() => {
            setErrMsg('');
        }, [user, pwd])
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const response = await axios.get(LOGIN_URL,{params:{ user, pwd }},
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                console.log(JSON.stringify(response?.data));
                //console.log(JSON.stringify(response));
                //const accessToken = response?.data?.accessToken;
                //const roles = response?.data?.roles;
                //setAuth({ user, pwd, roles, accessToken });
                //setUser('');
                setPwd('');
                setSuccess(true);
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 300) {
                    setErrMsg('Missing Username or Password');
                } else if (err.response?.status === 301) {
                    setErrMsg('Unauthorized');
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
                        <h1>Plese check you emails to reset password</h1>
                        <br />
                        <p>
                            <a href="./Password">Go to Home</a>
                        </p>
                    </section>
                ) : (
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h6>please enter your email address to reset password</h6>
                        <form onSubmit={handleSubmit}>
                        <div className='input-container'>
                            <BsIcons.BsFillPersonFill className='input-icon'/>
                            <input
                                type="text"
                                id="email"
                                placeholder='email'
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                        </div>
    
                        
    
                        <button>Submit</button>
                        </form>
                        <p>
                          
                        <span className="line">
                            {/*put router link here*/}
                            <a href="./Login">SignIn</a>
                        </span>
                        </p>
                    </section>
                )}
            </>
        )
    }
export default Reset