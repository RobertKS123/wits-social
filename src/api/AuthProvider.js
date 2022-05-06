
import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState([]);

    const changeId = (id) =>{
        setAuth(() => [{id}]);
    }

    return (
        <AuthContext.Provider value={{ auth, changeId }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;