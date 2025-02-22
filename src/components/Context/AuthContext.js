import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    
  let [Token, setToken] = useState(null);
  
  useEffect(() => {
    let localStorageToken = localStorage.getItem("token");
    if (localStorageToken !== null) {
      setToken(localStorageToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ Token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
