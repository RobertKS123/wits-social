
import React, {useContext} from 'react';
import { AuthContext } from '../../../api/AuthProvider';

function Account() {

    const [state] = useContext(AuthContext);
    console.log(state.nav);
    console.log(state.id);
    return (
        <div className='manage'>
            <h1>
                this is where the Account Manage page goes
            </h1>
        </div>
    )
}

export default Account