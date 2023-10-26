import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModalUser({ openModalError, setOpenModalError }) {

  const {setLoginOrRegister} = useContext(AuthContext)

  return (
    <div>
      <Modal
        open={openModalError}
        onClose={() => setOpenModalError(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "red" }}
          >
            ERROR
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Debes iniciar sesión para crear una tarea
          </Typography>

          <Link to="/login" onClick={()=> setLoginOrRegister("login")}>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Iniciar sesión
            </Button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
}
