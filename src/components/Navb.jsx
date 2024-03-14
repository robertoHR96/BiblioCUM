import React, { useEffect, useState, useRef } from "react";
import { useUsuarioContext } from "../context/UsuarioContext";
import "./Navb.css";
import { useNavigate } from "react-router-dom";
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
  Button,
} from "reactstrap";

export const Navb = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar fixed="top" className="nav-flot" expand="xl" container={true}>
        <Nav>
          <NavbarBrand href="/">
            <div className="logo-nav">
              <p className="p1">Biblio</p>
              <p className="p2">CU</p>
              <p className="p3">M</p>
            </div>
          </NavbarBrand>
          <div
            className="centrador button-navbar"
            onClick={() => navigate("/libros")}
          >
            <b>Libros</b>
          </div>
          <div
            className="centrador button-navbar"
            onClick={() => navigate("/novedades")}
          >
            <b>Novedades</b>
          </div>
          {user.logeado === "login" && (
            <div
              className="centrador button-navbar"
              onClick={() => navigate("/reservas")}
            >
              <b>Reservas</b>
            </div>
          )}
          <div
            className="centrador button-navbar"
            onClick={() => navigate("/ahorcado")}
          >
            <b>Ahorcado</b>
          </div>
        </Nav>
        <Nav>
          <NavItem>
            {user.logeado === "noLogin" && (
              <Button onClick={() => navigate("/Login")} color="success">Login</Button>
            )}
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};
