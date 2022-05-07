import React,{Component , useContext} from "react";
import {Link} from 'react-router-dom';
import { AuthContext } from '../../api/AuthProvider';
import {BottombarData} from './BottombarData';
import './BottomNavbar.css';
//import LandingPage from './Backdrop';

function BottomNavbar(){
    const [state]  = useContext(AuthContext);

    return(
    <>
        <nav className={state.nav ? 'bottomNavbar active' : 'bottomNavbar'}>
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