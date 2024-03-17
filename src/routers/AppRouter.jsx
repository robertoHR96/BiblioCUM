import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navb } from "../components/Navb";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import Footer from "../components/Footer";
import { Ahorcado } from "../pages/ahorcado/Ahorcado";
import { Libros } from "../pages/libros/Libros";
import { Novedades } from "../pages/novedades/Novedades";
import { Reservas } from "../pages/reservas/Reservas";
import { BasicRouter } from "./BasicRouter";
import { Login } from "../pages/users/Login";
import { Register } from "../pages/users/Register";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navb />
      <Routes>
        <Route path="/" element={<Libros />} />
        <Route path="/*" element={<Libros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/ahorcado" element={<Ahorcado />} />
        <Route path="/libros" element={<Libros />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route
          path="/reservas"
          element={
            <BasicRouter>
              <Reservas />
            </BasicRouter>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
