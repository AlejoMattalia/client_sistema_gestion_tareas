import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Layout } from "../components/layout/Layout";

export function AppRouter() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        {
          routes.map(({id, path, Element})=>(
            <Route key={id} path={path} element={<Element/>}/>
          ))
        }
      </Route>
    </Routes>
  )
}
