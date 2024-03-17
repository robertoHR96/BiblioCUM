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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export const Navb = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [modalLogout, setModalLogout] = useState(false);

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
            {user.logeado === "noLogin" ? (
              <Button onClick={() => navigate("/Login")} color="success">
                Login
              </Button>
            ) : (
              <Button color="danger" onClick={() => setModalLogout(true)}>
                Logout
              </Button>
            )}
          </NavItem>
        </Nav>
      </Navbar>
      <Modal isOpen={modalLogout} centered={true}>
        <ModalHeader>Cerrar Sesión</ModalHeader>
        <ModalBody>
          ¿Estás seguro de que deseas cerrar sesión? Al cerrar sesión, se
          finalizará tu sesión actual y perderas todas tus reservas sin confirmar."
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => setModalLogout(false)}>
            Cancelar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalLogout(false);
              logoutUser();
            }}
          >
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
