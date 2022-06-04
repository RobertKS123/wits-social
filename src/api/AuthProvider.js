import { createContext, useReducer } from "react";
import { LOGIN, CHAT, LOGOUT } from "./Constants"

export const AuthContext = createContext();

const { Provider } = AuthContext;

const initialState = {
    id : 0,
    nav : false,
    chatId : 0
}

function reducer(state,action){
    switch(action.type){
        case LOGIN:
            return {
                id : action.payload,
                nav : true,
            }
        case CHAT:
            return {
                id : state.id,
                nav : true,
                chat : action.payload,
            }
        case LOGOUT:
            return {
                id : action.payload,
                nav : false,
                chat : 0,
            }
        default:
            throw new Error();
    }
}

export default function StoreProvider(props) {
    const [state,dispatch] = useReducer(reducer, initialState);
    return <Provider value={[state,dispatch]}>{props.children}</Provider>
}
