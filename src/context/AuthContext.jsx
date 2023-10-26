import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [loginOrRegister, setLoginOrRegister] = useState("");
  const [user, setUser] = useState(null);
  const [updateTasks, setUpdateTasks] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios.get("http://localhost:3000/authentication/user_data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res)=> {
          setUser(res.data.user)
          setUpdateTasks(true)
        })
        .catch((error)=> console.log(error))
    }
  }, []);


  // Cerrar sesion
  const exitSession = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common["Authorization"];
    setUser(null)
  };

  const data = {
    loginOrRegister,
    setLoginOrRegister,
    setUser,
    exitSession,
    user,
    setUpdateTasks,
    updateTasks
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
