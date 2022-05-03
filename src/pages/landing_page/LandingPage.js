import React from 'react'
import {Link} from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
    return (
        <div className='manage'>
            <h1>
                this is where the Landing Page goes
            </h1>
            <button className="main_btn"> Login </button> 
            <br className='br_main'/>
            <br className='br_main'/>
            <br className='br_main'/>
            <br className='br_main'/>
            <br className='br_main'/>
            <br className='br_main'/>
            <br className='br_main'/>
            <button 
                className="main_btn" 
                onClick={<Link to='/signup'> <span>Signup</span> </Link>}>
                    Signup 
            </button> 
        </div>
    )
}

export default LandingPage