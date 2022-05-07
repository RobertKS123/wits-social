import React from 'react'
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import {Link} from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className='w3-container'>

            <div className='w3-display-topmiddle imgContainer'>
                <img src="https://startechies.000webhostapp.com/resources/img/welcomeBanner.jpeg" className='welcomeBanner' />
                <img src="https://startechies.000webhostapp.com/resources/img/logo.jpeg" className='logo'/>
                <h1 className='heading w3-monospace'>Let's Get Started:</h1>
                <div className='button-container '>
                    <Link to='/signup'>
                        <div className='landing-button-outer'>
                            <div className='landing-button-inner w3-monospace'>
                                <BiIcons.BiLogInCircle className='landing-icon'/>
                                Signup
                            </div>
                        </div>
                    </Link>
                    <Link to='/login'>
                        <div className='landing-button-outer'>
                            <div className='landing-button-inner w3-monospace'>
                                <div className='landing-button'>
                                    <BsIcons.BsPersonCircle className='landing-icon'/>
                                    Login
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            
            
        </div>
    )
}

export default LandingPage