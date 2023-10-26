import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DateForm from "./elementsModal/Date";
import dayjs from "dayjs";
import axios from "axios"
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import {AuthContext} from "../../../../context/AuthContext"

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

export default function BasicModal({ openModal, setOpenModal }) {
  //Codigo para enviar el estado de la tarea
  const [optionState, setOptionState] = useState("");
  const [messageErrorState, setMessageErrorState] = useState(false);
  const [messageErrorPropiety, setMessageErrorPropiety] = useState(false);

  const {user, setUpdateTasks} = useContext(AuthContext)

  const today = dayjs();
  const [selectedDateTimeString, setSelectedDateTimeString] = useState(
    today.format("YYYY-MM-DD HH:mm")
  );

  const handleChangeState = (event) => {
    setOptionState(event.target.value);
  };

  //Codigo para enviar la propridad de la tarea
  const [optionPriority, setOptionPriority] = useState("");
  const handleChangePriority = (event) => {
    setOptionPriority(event.target.value);
  };

  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    initialValues: {
      nameTask: "",
      label: "",
      description: "",
    },

    validationSchema: Yup.object({
      nameTask: Yup.string().required("Este campo es requerido"),
      label: Yup.string().required("Este campo es requerido"),
      description: Yup.string().required("Este campo es requerido"),
    }),

    onSubmit: (data) => {
      let state = "";
      let priority = "";

      if (optionState === 10) {
        state = "Pendiente";
      } else if (optionState === 20) {
        state = "En progreso";
      }

      if (optionPriority === 10) {
        priority = "Baja";
      } else if (optionPriority === 20) {
        priority = "Media";
      } else if (optionPriority === 30) {
        priority = "Alta";
      }

      if (optionState !== "" && optionPriority !== "") {
        var values = {
          name: data.nameTask,
          label: data.label,
          date: selectedDateTimeString,
          state: state,
          priority: priority,
          description: data.description,
          user_id: user.id
        };
      }

      if (optionState === "") {
        setMessageErrorState(true);
      } else {
        setMessageErrorState(false);
      }

      if (optionPriority === "") {
        setMessageErrorPropiety(true);
      } else {
        setMessageErrorPropiety(false);
      }

      
      // console.log(values)
      axios.post("http://localhost:3000/tasks", values)
        .then((res)=>{
          console.log("Tarea creada correctamente", res);

          Toastify({
            text: "TAREA CREADA CORRECTAMENTE",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            backgroundColor: "#4CAF50",
          }).showToast();

          setOpenModal(false)
          resetForm();
          setUpdateTasks(true);
        })

        .catch((err)=> console.log(err.config.data))
    },
  });

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "10px" }}
          >
            Agregar Tarea
          </Typography>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-2"
          >
            <TextField
              id="outlined-basic"
              label="Nombre de la tarea"
              variant="outlined"
              fullWidth
              name="nameTask"
              onChange={handleChange}
              value={values.nameTask}
              error={errors.nameTask}
              helperText={errors.nameTask}
              sx={{ position: "relative", top: "9px" }}
            />

            <DateForm
              setSelectedDateTimeString={setSelectedDateTimeString}
              selectedDateTimeString={selectedDateTimeString}
            />

            <TextField
              id="outlined-basic"
              label="Etiqueta"
              variant="outlined"
              fullWidth
              name="label"
              onChange={handleChange}
              value={values.label}
              error={errors.label}
              helperText={errors.label}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Estado de la tarea
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={optionState}
                label="Estado de la tarea"
                onChange={handleChangeState}
                error={messageErrorState}
              >
                <MenuItem value={10}>Pendiente</MenuItem>
                <MenuItem value={20}>En progreso</MenuItem>
              </Select>
            </FormControl>

            {messageErrorState && (
              <p
                style={{
                  color: "#d32f2f",
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  lineHeight: 1.66,
                  letterSpacing: "0.03333em",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                Este campo es requerido
              </p>
            )}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Prioridad de la tarea
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={optionPriority}
                label="Prioridad de la tarea"
                onChange={handleChangePriority}
                error={messageErrorPropiety}
              >
                <MenuItem value={10}>Baja</MenuItem>
                <MenuItem value={20}>Media</MenuItem>
                <MenuItem value={30}>Alta</MenuItem>
              </Select>
            </FormControl>

            {messageErrorPropiety && (
              <p
                style={{
                  color: "#d32f2f",
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  lineHeight: 1.66,
                  letterSpacing: "0.03333em",
                  position: "relative",
                  bottom: "10px",
                }}
              >
                Este campo es requerido
              </p>
            )}

            <TextField
              id="outlined-multiline-static"
              label="Descripción"
              multiline
              rows={3}
              name="description"
              onChange={handleChange}
              value={values.description}
              error={errors.description}
              helperText={errors.description}
            />

            <Button variant="contained" type="submit">
              Crear Tarea
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
