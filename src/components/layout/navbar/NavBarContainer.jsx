import { useContext, useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

export function NavBarContainer() {
  const [viewSearch, setViewSearch] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const { setLoginOrRegister, user, exitSession } = useContext(AuthContext);
  const [openDataUser, setOpenDataUser] = useState(false);
  const [awaitUser, setAwaitUser] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [itemsSearch, setItemsSearch] = useState([]);
  const [tasks, setTasks] = useState([])

  //no mostrar nada durante dos segundos apenas inicia la pag
  useEffect(() => {
    if (awaitUser) {
      const timeoutId = setTimeout(() => {
        setAwaitUser(false);
      }, 1000); // 5000 milisegundos = 5 segundos

      return () => clearTimeout(timeoutId); // Limpia el temporizador si el componente se desmonta antes de que el tiempo transcurra.
    }
  }, [awaitUser]);

  //Obtener las tareas
  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/tasks/user/${user.id}`)
      .then((res) => {
        const filteredTasks = res.data.data.map(task => ({
          id: task.id,
          name: task.name,
          status: task.status
        }));
        setTasks(filteredTasks);
      })
      .catch((err) => console.log(err))
    }
  }, [user]);

  useEffect(()=>{
    if(tasks){
      let captureItems = tasks
      .filter((item) => {
        if(item){

          if(inputValue === ""){
            return ""
          }
          else{
            return item.name.toLowerCase().includes(inputValue.toLowerCase());
          }
        }
      })

    setItemsSearch(captureItems);
    }
  },[inputValue, tasks])


  //Función para abrir buscador
  const openSearch = () => {
    setViewSearch(!viewSearch);
    setViewUser(false);
  };

  //funcion para abrir el registro en mobile
  const openUser = () => {
    setViewUser(!viewUser);
    setViewSearch(false);
  };

  //Funcion registrarse
  const functionRegister = () => {
    setLoginOrRegister("register");
    setViewUser(false);
  };

  //funcion logearse
  const functionLogin = () => {
    setLoginOrRegister("login");
    setViewUser(false);
  };

  //funcion para abrir la info del usuario
  const functionOpenDataUser = () => {
    setOpenDataUser(!openDataUser);
    setViewSearch(false);
  };

  const closeSessions = () => {
    exitSession();
    setOpenDataUser(false);
  };

  const data = {
    viewSearch,
    viewUser,
    user,
    openDataUser,
    awaitUser,
    itemsSearch,
    inputValue,
    setInputValue,
    closeSessions,
    openSearch,
    openUser,
    functionRegister,
    functionLogin,
    functionOpenDataUser,
  };

  return <NavBar data={data} />;
}
