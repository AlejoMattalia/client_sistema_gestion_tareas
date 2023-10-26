import { HomeContainer } from "../components/pages/home/HomeContainer";
import { InfoTaskContainer } from "../components/pages/infoTask/InfoTaskContainer";
import { LoginContainer } from "../components/pages/login/LoginContainer";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: HomeContainer
  },

  {
    id: "login",
    path: "/login",
    Element: LoginContainer
  },

  {
    id: "infoTask",
    path: "/task/:id",
    Element: InfoTaskContainer
  }
]