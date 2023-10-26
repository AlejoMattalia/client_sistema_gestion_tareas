import { useContext } from "react";
import { Login } from "./Login";
import { AuthContext } from "../../../context/AuthContext";

export function LoginContainer() {

  const {loginOrRegister, setLoginOrRegister} = useContext(AuthContext)

  const data = {
    loginOrRegister,
    setLoginOrRegister
  }
  return (
    <Login data={data}/>
  )
}
