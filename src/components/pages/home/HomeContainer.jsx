import { useContext, useState } from "react";
import { Home } from "./Home";
import { AuthContext } from "../../../context/AuthContext";

export function HomeContainer() {

  const {user} = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)
  const [openModalError, setOpenModalError] = useState(false)

  const functionOpenModal = () =>{
    if(user){
      setOpenModal(true)
      setOpenModalError(false)
    }
    else{
      setOpenModalError(true)
      setOpenModal(false)
    }
  }

  const data = {
    user,
    openModal, 
    openModalError,
    setOpenModal, 
    setOpenModalError,
    functionOpenModal
  }
  return (
    <Home data={data}/>
  )
}
