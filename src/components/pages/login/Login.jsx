import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Register } from "./elementLogin/Register";
import { LoginUser } from "./elementLogin/LoginUser";

export function Login({ data }) {
  const { loginOrRegister, setLoginOrRegister } = data;

  return (
    <section className="py-12 px-3 flex items-center justify-center w-full">
      <div className="border w-full px-5 py-7 flex flex-col items-center justify-center gap-8 max-w-md">
        <header className="flex items-center justify-start w-full gap-3 flex-wrap">
          <p
            className="text-lg sm:text-xl tracking-wide cursor-pointer font-semibold"
            style={
              loginOrRegister === "login"
                ? { borderBottom: "2px solid #1976d2" }
                : { borderBottom: "2px solid transparent" }
            }
            onClick={() => setLoginOrRegister("login")}
          >
            INICIAR SESIÓN
          </p>

          <p
            className="text-lg sm:text-xl tracking-wide cursor-pointer font-semibold"
            style={
              loginOrRegister === "register"
                ? { borderBottom: "2px solid #1976d2" }
                : { borderBottom: "2px solid transparent" }
            }
            onClick={() => setLoginOrRegister("register")}
          >
            REGISTRARSE
          </p>
        </header>

        <AccountCircleIcon style={{ fontSize: "150px", color: "#1976d2" }} />

        {loginOrRegister === "login" ? (
          <LoginUser setLoginOrRegister={setLoginOrRegister}/>
        ) : loginOrRegister === "register" ? (
          <Register setLoginOrRegister={setLoginOrRegister}/>
        ) : null}
      </div>
    </section>
  );
}
