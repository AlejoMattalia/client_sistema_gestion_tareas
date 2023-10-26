import { Button } from "@mui/material";
import Table from "./elementHome/Table";
import ModalFor from "./elementHome/Modal";
import ModalUser from "./elementHome/ModalUserAlert";

export function Home({ data }) {
  const { user, openModal, setOpenModal, functionOpenModal, openModalError, setOpenModalError } = data;

  return (
    <section className="mt-3 mb-8 p-3 sm:p-10 md:px-16 lg:px-24">

      <div className="py-6 mb-3 flex items-center justify-between gap-5">
        {
          user &&
          <p className="text-md md:text-xl font-semibold">{user.username}</p>
        }

        <Button variant="contained" size="small" onClick={functionOpenModal}>
          Agregar tarea
        </Button>
      </div>

      <Table user={user}/>

      <ModalFor openModal={openModal} setOpenModal={setOpenModal}/>
      <ModalUser openModalError={openModalError} setOpenModalError={setOpenModalError}/>
    </section>
  );
}
