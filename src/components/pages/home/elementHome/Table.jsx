import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ user }) {
  const [tasks, setTasks] = useState(null);
  const { setUpdateTasks, updateTasks } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/tasks/user/${user.id}`)
        .then((res) => {
          setTasks(res.data.data);
          setUpdateTasks(false);
        })
        .catch((err) => console.log(err));
    } else {
      setTasks(null);
    }
  }, [user, updateTasks]);

  const deleteTask = (id) => {
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
          })
          .catch(() => {
            Swal.fire("Error, no se pudo eliminar la tarea", "", "info");
          });
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Número</StyledTableCell>
            <StyledTableCell>Nombre de la tarea</StyledTableCell>
            <StyledTableCell align="center">Fecha limite</StyledTableCell>
            <StyledTableCell align="center">Prioridad</StyledTableCell>
            <StyledTableCell align="center">Etiqueta</StyledTableCell>
            <StyledTableCell align="center">Ver más</StyledTableCell>
            <StyledTableCell align="center">Borrar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks ? (
            tasks.map((task, index) => (
              <StyledTableRow key={task.id}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {task.name}
                </StyledTableCell>
                <StyledTableCell align="center">{task.date}</StyledTableCell>
                <StyledTableCell align="center">
                  {task.priority}
                </StyledTableCell>
                <StyledTableCell align="center">{task.label}</StyledTableCell>

                <StyledTableCell align="center">
                  <Link to={`/task/${task.id}`}>
                    <AddIcon style={{ color: "blue", cursor: "pointer" }} />
                  </Link>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <DeleteIcon
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteTask(task.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <div className="h-72 px-12 py-10">
              <p className="text-xl font-bold text-center absolute">
                SIN TAREAS
              </p>
            </div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
