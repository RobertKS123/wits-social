import React,{Component} from "react";
import {Link} from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import './BottomNavbar.css';

function BottomNavbar(){
    return(
    <>
        <div className="bottomNavbar">
            <ul className='bottom-nav-menu'>
                <li className="bottom-nav-item">
                    <div className="nav-icon">
                        <Link to='/'>
                            <AiIcons.AiFillHome />                           
                            <p>Home</p>                      
                        </Link>                        
                    </div>
                </li>
                <li className="bottom-nav-item">
                    <Link to='/login'>
                        <BiIcons.BiLogIn/>
                        <br/>
                        <span>Login</span>
                    </Link>
                </li>
                <li className="bottom-nav-item">
                    <Link to='/login'>
                        <BiIcons.BiLogIn/>
                        <br/>
                        <span>Login</span>
                    </Link>
                </li>
                <li className="bottom-nav-item">
                    <Link to='/signup'>
                        <BiIcons.BiLogIn />
                        <br/>
                        <span>Signup</span>
                    </Link>
                </li>
                <li className="bottom-nav-item">
                    <Link to='/account'>
                        <MdIcons.MdManageAccounts />
                        <br/>
                        <span>Account</span>
                    </Link>
                </li>
            </ul>
        </div>
    </>
    );
}

export default BottomNavbar;