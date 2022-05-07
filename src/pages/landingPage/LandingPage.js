import React from 'react'
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import {Link} from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <section>
            <h1>
                Welcome to wits social
            </h1>
            <div className='button-container'>
                <Link to='/signup'>
                    <div className='landing-button-outer'>
                        <div className='landing-button-inner'>
                            <BiIcons.BiLogInCircle className='landing-icon'/>
                            Signup
                        </div>
                    </div>
                </Link>
                <Link to='/login'>
                    <div className='landing-button-outer'>
                        <div className='landing-button-inner'>
                            <div className='landing-button'>
                                <BsIcons.BsPersonCircle className='landing-icon'/>
                                Login
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default LandingPage