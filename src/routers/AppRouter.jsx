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
import { Ahorcado } from "../pages/Ahorcado";
import { Libros } from "../pages/Libros";
import { Novedades } from "../pages/Novedades";
import { Reservas } from "../pages/Reservas";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navb />
      <Routes>
        <Route path="/" element={ <Ahorcado />} />
        <Route path="/*" element={ <Ahorcado />} />
        <Route path="/ahorcado" element={<Ahorcado />} />
        <Route path="/libros" element={ <Libros />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/reservas" element={ <Reservas />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
