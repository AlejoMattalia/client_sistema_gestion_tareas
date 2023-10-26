import { Footer } from "./Footer";
import { NavBarContainer } from "./navbar/NavBarContainer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <div>
          <NavBarContainer />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
