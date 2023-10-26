import { useParams } from "react-router-dom";
import { InfoTask } from "./InfoTask";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";

export function InfoTaskContainer() {
  const [task, setTask] = useState(null)
  const {id} = useParams()
  const {updateTasks ,setUpdateTasks} = useContext(AuthContext)
  const [goHome, setGoHome] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(()=>{
    axios.get(`http://localhost:3000/tasks/${id}`)
      .then((res)=> {
        setTask(res.data.data)
        setUpdateTasks(false)
      })
      .catch((err)=> console.log(err))
  }, [id, updateTasks])


  const deleteTask = ()=>{
    if(task){
      Swal.fire({
        title: "¿Eliminar tarea?",
        showDenyButton: true,
        denyButtonColor: "red",
        confirmButtonText: "Cancelar",
        denyButtonText: `Confirmar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isDenied) {
          axios
            .delete(`http://localhost:3000/tasks/${id}`)
            .then(() => {
              setUpdateTasks(true);
              setGoHome(true)

            })
            .catch(() => {
              Swal.fire("Error, no se pudo eliminar la tarea", "", "info");
            });
        }
      });
    }
  }

  const data = {
    task,
    deleteTask,
    goHome,
    openModal, setOpenModal
  }
  return (
    <InfoTask data={data}/>
  )
}
