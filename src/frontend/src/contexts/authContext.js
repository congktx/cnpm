import React, { createContext, useState } from "react";

const authContext = createContext()
export function AuthProvider({ children }) {
    const [username, setUserName] = useState(localStorage.getItem("name"))
    const [token, setToken] = useState(localStorage.getItem("token"))

    return (<authContext.Provider value={{ username, token, setUserName, setToken }}>{children}</authContext.Provider>);
}

export const useAuthContext = () => React.useContext(authContext)