import React, { useContext } from 'react';
import { AuthContext } from '../../api/AuthProvider';
import { LOGIN } from '../../api/Constants'

const Home = () => {

    const [state]  = useContext(AuthContext);

    console.log(state.id);
    console.log(state.nav);
    return (
        <div className='home'>
            <h1>
                this where is the Home page goes
            </h1>
        </div>
    )
}

export default Home
