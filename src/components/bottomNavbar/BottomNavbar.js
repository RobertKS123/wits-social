import React,{Component} from "react";
import {Link} from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import {BottombarData} from './BottombarData';
import './BottomNavbar.css';

function BottomNavbar(){
    return(
    <>
        <nav className="bottomNavbar">
            <ul className='bottom-nav-menu'>
            {BottombarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <p>{item.title}</p>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </nav>
    </>
    );
}

export default BottomNavbar;