import ShortcutIcon from "@mui/icons-material/Shortcut";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import ModalEdit from "./elementsInfoTasks/Modal"
 
export function InfoTask({ data}) {

  const {task, deleteTask, goHome, openModal, setOpenModal} = data

  console.log(task);
  return (
    <section className="flex items-center flex-wrap lg:items-start lg:flex-col lg:justify-between gap-5 p-5 lg:h-full">

      <h1 className="text-xl lg:text-2xl font-semibold w-full">TAREA</h1>

      {task && (
        <>
          <div className="flex flex-wrap gap-5 sm:gap-8 sm:mt-5 lg:mt-0">
            <section className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <ShortcutIcon style={{ fontSize: "30px", color: "#1976d2" }} />
                <p className="text-md lg:text-xl font-semibold tracking-wider text-primaryColor">
                  Tarea:
                </p>
              </div>

              <p className="text-sm sm:text-md lg:text-lg">{task.name}</p>
            </section>

            <section className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <ShortcutIcon style={{ fontSize: "30px", color: "#1976d2" }} />
                <p className="text-md lg:text-xl font-semibold tracking-wider text-primaryColor">
                  Fecha limite:
                </p>
              </div>

              <p className="text-sm sm:text-md lg:text-lg">{task.date}hs</p>
            </section>
          </div>

          <div className="flex flex-wrap gap-5 sm:gap-8">
            <section className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <ShortcutIcon style={{ fontSize: "30px", color: "#1976d2" }} />
                <p className="text-md lg:text-xl font-semibold tracking-wider text-primaryColor">
                  Etiqueta:
                </p>
              </div>

              <p className="text-sm sm:text-md lg:text-lg">{task.label}</p>
            </section>

            <section className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <ShortcutIcon style={{ fontSize: "30px", color: "#1976d2" }} />
                <p className="text-md lg:text-xl font-semibold tracking-wider text-primaryColor">
                  Prioridad:
                </p>
              </div>

              <p className="text-sm sm:text-md lg:text-lg">{task.priority}</p>
            </section>

            <section className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <ShortcutIcon style={{ fontSize: "30px", color: "#1976d2" }} />
                <p className="text-md lg:text-xl font-semibold tracking-wider text-primaryColor">
                  Estado:
                </p>
              </div>

              <p className="text-sm sm:text-md lg:text-lg">{task.state}</p>
            </section>
          </div>

          <section className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <div className="flex items-center gap-2">
              <ShortcutIcon style={{ fontSize: "30px", color: "#1976d2" }} />
              <p className="text-md lg:text-xl font-semibold tracking-wider text-primaryColor">
                Descripción:
              </p>
            </div>

            <p className="text-sm sm:text-md lg:text-lg">{task.description}</p>
          </section>
        </>
      )}

      <section className="w-full flex items-center justify-center sm:justify-start lg:justify-center mt-10 lg:mt-10">
        <div className="w-10/12 sm:w-8/12 md:w-6/12 flex flex-col lg:flex-row items-center justify-center gap-3 lg:w-10/12 lg:items-center lg:gap-8">
          <Button
            variant="outlined"
            fullWidth
            size="medium"
            onClick={()=> setOpenModal(true)}
          >
            EDITAR TAREA
          </Button>
          <Button variant="contained" color="error" fullWidth size="medium" onClick={deleteTask}>
            BORRAR TAREA
          </Button>
        </div>
      </section>

      {goHome && <Navigate to={"/"} />}
      {openModal && <ModalEdit openModal={openModal} setOpenModal={setOpenModal} task={task}/>}
    </section>
  );
}
