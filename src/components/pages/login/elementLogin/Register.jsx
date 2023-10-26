import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useState } from "react";

export function Register({ setLoginOrRegister }) {
  const [emailExists, setEmailExists] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .required("Ingresar un nombre de usuario")
        .test(
          "noSpaces",
          "El nombre de usuario no debe contener espacios en blanco",
          (value) => {
            if (value) {
              return !/\s/.test(value); // Comprueba que no haya espacios en blanco
            }
            return true;
          }
        )
        .matches(
          /^[a-zA-Z0-9]+$/,
          "El nombre de usuario solo puede contener letras y números"
        )
        .min(5, "El nombre de usuario debe tener al menos 5 caracteres"),

      email: Yup.string()
        .required("Ingresar un email")
        .test(
          "noSpaces",
          "El email no debe contener espacios en blanco",
          (value) => {
            if (value) {
              return !/\s/.test(value); // Comprueba que no haya espacios en blanco
            }
            return true;
          }
        )
        .test("isLowercase", "El email debe estar en minúsculas", (value) => {
          if (value) {
            return value === value.toLowerCase();
          }
          return true;
        })
        .matches(/.*@.*/, "El email debe contener el símbolo '@'"),
      password: Yup.string()
        .required("Ingresar una contraseña")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
      repeatPassword: Yup.string()
        .required("Ingresa nuevamente la contraseña")
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
    }),

    onSubmit: (data) => {
      let values = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      axios
        .post("http://localhost:3000/authentication/users", values, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("El usuario se registro correctamente", res);
          Toastify({
            text: "USUARIO CREADO CORRECTAMENTE, INICIA SESIÓN",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            backgroundColor: "#4CAF50",
          }).showToast();

          setLoginOrRegister("login");
        })
        .catch((error) => {
          console.log("Error a registrar el usuario");

          const { username, email } = error.response.data.data;

          console.log(username, email)

          if (username !== undefined) {
            if (username[0] === "has already been taken") {
              setUsernameExists(true);
            }
          } else {
            setUsernameExists(false);
          }

          if (email !== undefined) {
            if (email[0] === "has already been taken") {
              setEmailExists(true);
            }
          } else {
            setEmailExists(false);
          }
        });
    },
  });

  return (
    <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
      <TextField
        id="standard-basic"
        label="Nombre de usuario"
        variant="standard"
        className="w-full"
        name="username"
        onChange={handleChange}
        value={values.username}
        error={errors.username || usernameExists === true}
        helperText={errors.username}
        inputProps={{ maxLength: 18 }}
      />

      {usernameExists ? (
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
          El nombre de usuario ya está en uso
        </p>
      ) : null}

      <TextField
        id="standard-basic"
        label="Email"
        variant="standard"
        className="w-full"
        name="email"
        onChange={handleChange}
        value={values.email}
        error={errors.email || emailExists === true}
        helperText={errors.email}
      />

      {emailExists === true ? (
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
          El email ya está en uso
        </p>
      ) : null}

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
      <TextField
        id="standard-basic"
        label="Repetir contraseña"
        variant="standard"
        type="password"
        className="w-full"
        name="repeatPassword"
        onChange={handleChange}
        value={values.repeatPassword}
        error={errors.repeatPassword}
        helperText={errors.repeatPassword}
      />

      <Button variant="contained" sx={{ marginTop: "30px" }} type="submit">
        Registrarse
      </Button>

      <div className="w-full flex items-center justify-center mt-3">
        <p>
          Ya tenés cuenta,{" "}
          <span
            className="font-semibold text-primaryColor cursor-pointer"
            onClick={() => setLoginOrRegister("login")}
          >
            incia sesión
          </span>
        </p>
      </div>
    </form>
  );
}
