import React, {useContext, useEffect} from 'react';
import { AuthContext } from '../../../api/AuthProvider';
import { useHistory } from 'react-router-dom';
import { LOGOUT } from '../../../api/Constants';
import * as BiIcons from 'react-icons/bi';

const Account = () => {

    const [state,dispatch] = useContext(AuthContext);

    const history = useHistory();

    const handleChange = async () => {
        console.log('run');
        dispatch({
            type: LOGOUT,
            payload : 0,
        })
        history.push('/');
    }

    return (
        <div className='button-container '>
            <div className='landing-button-outer'>
                <div className='landing-button-inner w3-monospace' onClick={handleChange}>
                    <BiIcons.BiLogOutCircle className='landing-icon'/>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Account