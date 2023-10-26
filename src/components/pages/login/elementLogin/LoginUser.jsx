import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Navigate } from "react-router-dom";

export function LoginUser({ setLoginOrRegister }) {
  const { setUser } = useContext(AuthContext);
  const [userFailed, setUserFailed] = useState("");
  const [redirectHome, setRedirectHome] = useState(false);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },

    validationSchema: Yup.object({
      usernameOrEmail: Yup.string().required(
        "Ingresa nombre de usuario o email"
      ),

      password: Yup.string().required("Ingresa una contraseña"),
    }),

    onSubmit: (data) => {
      axios
        .post("http://localhost:3000/authentication/sessions", data)
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem("token", res.data.token);
          setRedirectHome(true)
        })

        .catch((error) => {
          setUserFailed(error.response.data.message);
        });
    },
  });

  return (
    <>
      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Nombre de usuario o email"
          variant="standard"
          className="w-full"
          name="usernameOrEmail"
          onChange={handleChange}
          value={values.usernameOrEmail}
          error={errors.usernameOrEmail}
          helperText={errors.usernameOrEmail}
        />
        <TextField
          id="standard-basic"
          label="Contraseña"
          variant="standard"
          type="password"
          className="w-full"
          name="password"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
          helperText={errors.password}
        />

        {userFailed === "Autenticación fallida" && (
          <p
            style={{
              color: "#d32f2f",
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 400,
              fontSize: "0.9rem",
              lineHeight: 1.66,
              letterSpacing: "0.03333em",
            }}
          >
            Nombre de usuario/email o contraseña son incorrectos
          </p>
        )}

        <Button
          variant="contained"
          sx={{ marginTop: "40px", marginBottom: "15px" }}
          type="submit"
        >
          Iniciar Sesión
        </Button>

        <div className="w-full flex items-center justify-center mt-3">
          <p>
            No tenes cuenta,{" "}
            <span
              className="font-semibold text-primaryColor cursor-pointer"
              onClick={() => setLoginOrRegister("register")}
            >
              Regístrate
            </span>
          </p>
        </div>
      </form>

      {
        redirectHome &&
        <Navigate to="/"/>
      }
    </>
  );
}
