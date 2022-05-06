import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Provider from './api/AuthProvider';
// import {createStore} from 'redux';

// const userId = () => {
//     return{
//         type: 'ID'
//     }
// }

// const setId = (state = 0, userId) => {
//     return state;
// }

// let store = createStore(setId);

// store.subscribe(() => console.log(store.getState()));

// store.dispatch(setId());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider>
        <App />
        </Provider>
    </React.StrictMode>
);

