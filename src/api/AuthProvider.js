import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const { Provider } = AuthContext;

const initialState = {
    id : 0,
    nav : false,
}

function reducer(state,action){
    switch(action.type){
        case 'LOGIN':
            return {
                id : action.payload,
                nav : true,
            }
        default:
            throw new Error();
    }
}

export default function AuthProvider(props) {
    const [state,dispatch] = useReducer(reducer, initialState);
    return <Provider value={[state,dispatch]}>{props.children}</Provider>
}
