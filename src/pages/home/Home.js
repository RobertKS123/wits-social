import React, { useContext } from 'react';
import AuthContext from '../../api/AuthProvider';

const Home = () => {
    const { auth } = useContext(AuthContext);

    console.log(JSON.stringify(auth));
    return (
        <div className='home'>
            <h1>
                this where is the Home page goes
            </h1>
        </div>
    )
}

export default Home
