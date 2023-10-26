import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function NavBar({ data }) {
  const {
    viewSearch,
    viewUser,
    user,
    awaitUser,
    itemsSearch,
    inputValue,
    setInputValue,
    closeSessions,
    openDataUser,
    openSearch,
    openUser,
    functionRegister,
    functionLogin,
    functionOpenDataUser,
  } = data;

  return (
    <>
      {/* Encabezadp */}
      <header className="h-20 py-5 px-3 bg-primaryColor flex items-center justify-between relative z-50 md:px-5">
        <Link to="/">
          <p className="text-white text-lg font-semibold">GESTIÓN DE TAREAS</p>
        </Link>

        <section className="flex gap-3 items-center">
          {/* Si el usuario inicio sesion mostrar el nombre del usuario con su info */}

          {awaitUser ? null : (
            <>
              {user ? (
                <>
                  <div
                    className="hidden sm:flex items-center gap-1 relative xl:right-8 cursor-pointer"
                    onClick={functionOpenDataUser}
                  >
                    <AccountCircleIcon
                      style={{ color: "#fff", fontSize: "30px" }}
                    />

                    <p className="text-white font-semibold text-lg">
                      {user.username}
                    </p>

                    <ArrowDropDownIcon
                      style={{ color: "#fff", fontSize: "30px" }}
                    />
                  </div>

                  {/* Abrir la informacion de usuario */}
                  {openDataUser && (
                    <motion.div
                      className="absolute py-2 px-5 top-16 right-15 xl:right-24 bg-white border rounded-md flex flex-col items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-1">
                        <EmailIcon style={{ fontSize: "15px" }} />
                        <p className="text-sm">{user.email}</p>
                      </div>

                      <Button
                        variant="text"
                        sx={{ fontSize: "10px" }}
                        onClick={closeSessions}
                      >
                        Cerrar sesión
                      </Button>
                    </motion.div>
                  )}
                </>
              ) : (
                // Si el usuario no inicio sesion, se muestra la opcion para iniciar sesion y registrarse

                <div className="hidden sm:flex gap-5">
                  <Link to="/login" onClick={functionLogin}>
                    <Button
                      variant="contained"
                      color="colorWhite"
                      sx={{ color: "#1976d2" }}
                    >
                      Iniciar sesión
                    </Button>
                  </Link>

                  <Link to="/login" onClick={functionRegister}>
                    <Button variant="outlined" color="colorWhite">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}

          <SearchIcon
            style={{ color: "#fff", fontSize: "30px", cursor: "pointer" }}
            onClick={openSearch}
          />
          <div className="sm:hidden">
            <AccountCircleIcon
              style={{ color: "#fff", fontSize: "30px", cursor: "pointer" }}
              onClick={openUser}
            />
          </div>
        </section>
      </header>

      {/* Buscador */}
      <motion.nav
        className="absolute py-5 px-3 bg-primaryColor flex flex-col items-center justify-center w-full border-t border-white z-40"
        initial={{ y: -200 }}
        animate={viewSearch ? { y: 0 } : { y: -200 }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center justify-center w-full">
          <input
            type="text"
            placeholder="Nombre de la tarea"
            className="p-1 sm:w-3/6 md:h-10"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="bg-blue-400 p-1 md:p-2">
            <SearchIcon
              style={{ color: "#fff", fontSize: "23px", width: "100%" }}
            />
          </div>
        </div>

        <section className="flex flex-col items-center justify-center w-full mt-0.5">
          {inputValue !== "" &&
            itemsSearch.map((el) => {
              return (
                <div className="flex items-center justify-center w-full" key={el.id}>
                  <div
                    className="bg-white p-1 md:p-2"
                    style={{ position: "relative", bottom: "0.2px" }}
                  >
                    <SearchIcon
                      style={{
                        color: "#60A5FAFF",
                        fontSize: "25px",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="z-50 w-64 sm:w-6/12 bg-white border p-1 md:p-2 flex items-center justify-between">
                    <p className="font-semibold">{el.name.toUpperCase()}</p>
                    <p>{el.state}</p>
                  </div>
                </div>
              );
            })}
        </section>
      </motion.nav>

      {/* Mostrar info del usuario o iniciar sesion en responsive */}
      <motion.nav
        className="absolute py-5 px-3 bg-primaryColor flex items-center justify-center w-full gap-5 flex-wrap z-40"
        initial={{ y: -200 }}
        animate={viewUser ? { y: 1 } : { y: -200 }}
        transition={{ duration: 1 }}
      >
        {/* Si el usuario esta logeado mostrar info del usuario */}
        {user ? (
          <div className="flex flex-col items-center gap-4">
            <section className="flex items-center justify-center flex-wrap gap-x-8 gap-y-1">
              <div className="flex items-center gap-1 relative xl:right-8 cursor-pointer">
                <AccountCircleIcon
                  style={{ color: "#fff", fontSize: "25px" }}
                />

                <p className="text-white font-semibold text-md">
                  {user.username}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <EmailIcon style={{ fontSize: "15px", color: "#fff" }} />
                <p className="text-sm text-white">{user.email}</p>
              </div>
            </section>

            <Button
              color="colorWhite"
              variant="text"
              sx={{ fontSize: "12px" }}
              onClick={closeSessions}
            >
              Cerrar sesión
            </Button>
          </div>
        ) : (
          // Si el usuario no se logeo mostrar opciones para logearse o registrarse
          <>
            <Link to="/login" onClick={functionLogin}>
              <Button variant="contained" color="colorWhite">
                Iniciar sesión
              </Button>
            </Link>

            <Link to="/login" onClick={functionRegister}>
              <Button variant="outlined" color="colorWhite">
                Registrarse
              </Button>
            </Link>
          </>
        )}
      </motion.nav>
    </>
  );
}
