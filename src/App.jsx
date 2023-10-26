import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes/AppRouter"
import { ThemeProvider } from "@mui/material"
import { theme } from "./theme"
import { AuthContextProvider } from "./context/AuthContext"

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
