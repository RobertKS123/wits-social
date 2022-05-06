import React from 'react'
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import {Link} from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className='landing'>
            <h1>
                Welcome to wits social
            </h1>
            <Link to='/signup'>
                <div className='landing-button'>
                    <BiIcons.BiLogInCircle className='landing-icon'/>
                    Signup
                </div>
            </Link>
            <Link to='/login'>
                <div className='landing-button'>
                    <BsIcons.BsPersonCircle className='landing-icon'/>
                    Login
                </div>
                </Link>
        </div>
    )
}

export default LandingPage