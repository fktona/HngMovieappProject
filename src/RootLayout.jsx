import { useState } from "react";
import Header from "./Components/Header";
import Homepage from "./Components/Main";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import { AppContext } from "./assets/AppContext";
import { NavLink, Outlet, useLocation, useRoutes } from "react-router-dom";
export default function RootLayout() {
  const [searched, setSearched] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative mx-auto max-w-[1440px]">
      <AppContext.Provider
        value={{ searched, setSearched, searchTerm, setSearchTerm }}
      >
        <Nav />
        <Outlet />

        <Footer />
      </AppContext.Provider>
    </div>
  );
}
