import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Label,
  Input,
  CardFooter,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  ListGroupItemHeading,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { addDays } from "date-fns";
import MultiRangeSlider from "../../components/MultiRangeSlider.jsx";
import { useUsuarioContext } from "../../context/UsuarioContext.jsx";
import jsonLibros from "../jsonLibros.json";
import { Filtro } from "./Filtro.jsx";
import { useNavigate } from "react-router-dom";
import { ModalSelecionLibro } from "./ModalSelecionLibro.jsx";

export const Libros = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();
  const navigate = useNavigate();

  const [libros, setLibros] = useState([]);

  const [libroSelecionado, setLibroSelecionado] = useState({});

  const [modalAddLibro, setModalAddLibro] = useState(false);

  const [modalNoLogin, setModalNoLogin] = useState(false);

  useEffect(() => {
    setLibros(jsonLibros);
  }, []);

  const [filter, setFilter] = useState({
    min: 0,
    max: 100,
    name: "",
    categorias: [
      { nombre: "Ficción", valor: false },
      { nombre: "Clásicos", valor: false },
      { nombre: "Distopía", valor: false },
      { nombre: "Aventura", valor: false },
      { nombre: "Historia", valor: false },
      { nombre: "Fantasía", valor: false },
      { nombre: "Literatura infantil", valor: false },
      { nombre: "Terror", valor: false },
      { nombre: "Épica", valor: false },
    ],
  });

  const handleChangeRangeMin = (event) => {
    let valor = event.target.value;
    valor = Number(valor);
    if (!isNaN(valor)) {
      if (valor < filter.max) {
        setFilter({ ...filter, min: valor }); // Actualizar el estado con el nuevo valor del rango
      }
    }
  };
  const handleChangeRangeMax = (event) => {
    let valor = event.target.value;
    valor = Number(valor);
    if (!isNaN(valor)) {
      if (valor > filter.min) {
        setFilter({ ...filter, max: valor }); // Actualizar el estado con el nuevo valor del rango
      }
    }
  };

  const changeCheck = (nombre) => {
    let lista = filter.categorias;

    lista.map((categoria) => {
      if (categoria.nombre == nombre) {
        categoria.valor = !categoria.valor;
      }
    });

    setFilter({ ...filter, categorias: lista });
  };

  const hasActiveCategory = () => {
    let salida = false;
    filter.categorias.map((cat) => {
      if (cat.valor == true) {
        salida = true;
      }
    });
    return salida;
  };
  const hasCategoryByName = (nombreCategoria) => {
    const categoria = filter.categorias.find(
      (categoria) => categoria.nombre === nombreCategoria
    );
    return categoria ? categoria.valor : false;
  };

  const filtroCheck = (categoriaItem) => {
    if (hasActiveCategory() == true) {
      if (hasCategoryByName(categoriaItem.categoria)) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const filtroNombreAutor = (categoriaItem) => {
    if (filter.name !== "" && filter.name !== undefined) {
      if (categoriaItem.titulo !== undefined) {
        if (
          categoriaItem.titulo
            .toLowerCase()
            .includes(filter.name.toLowerCase()) ||
          categoriaItem.autor
            .toLowerCase()
            .includes(filter.name.toLocaleLowerCase())
        ) {
          return true;
        }
      }
    } else {
      return true;
    }
  };

  const filtroPrecio = (categoriaItem) => {
    return (
      categoriaItem.precio <= filter.max && categoriaItem.precio >= filter.min
    );
  };

  const pasaFiltros = (categoriaItem) => {
    return (
      filtroCheck(categoriaItem) &&
      filtroNombreAutor(categoriaItem) &&
      filtroPrecio(categoriaItem)
    );
  };

  const abrirModalSeleccionLibro = (libro) => {
    if (user.logeado === "login") {
      if (libro.disponibles > 0) {
        setLibroSelecionado({
          ...libro,
          fecha: [
            {
              startDate: new Date(),
              endDate: addDays(new Date(), 7),
              key: "selection",
            },
          ],
        });
        setModalAddLibro(true);
      }
    } else {
      setModalNoLogin(!modalNoLogin);
    }
  };

  const getNewID = () => {
    if (user.reservas.length === 0) {
      return 1;
    } else {
      console.log(user.reservas.length);
      return user.reservas[user.reservas.length - 1].idReserva + 1;
    }
  };

  const addReserva = () => {
    let lista = [...user.reservas];
    lista.push({
      ...libroSelecionado,
      aprovada: false,
      idReserva: getNewID(),
      
    });
    loginUser({ ...user, reservas: [...lista] });
    setModalAddLibro(false);
    setLibroSelecionado({});
  };

  return (
    <>
      <div className="libros">
        <Filtro
          filter={filter}
          setFilter={setFilter}
          handleChangeRangeMin={handleChangeRangeMin}
          handleChangeRangeMax={handleChangeRangeMax}
          changeCheck={changeCheck}
        />
        <div className="libros-center">
          {libros.map(
            (libro, index) =>
              pasaFiltros(libro) && (
                <Card
                  style={{
                    maxWidth: "496px",
                  }}
                >
                  <div className="content-img-card">
                    <div className="img-card">
                      <img alt="Sample" src={"" + libro.portada} />
                    </div>
                  </div>
                  <CardBody>
                    <CardTitle tag="h5">{libro.titulo}</CardTitle>
                    <CardText>
                      <p className="descripcion-libro">{libro.descripcion}</p>
                    </CardText>
                    <CardText>
                      {
                        <p>
                          <b>Autor:</b>
                          {" " + libro.autor}
                        </p>
                      }
                    </CardText>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      <p>
                        <b>Stock : </b>
                        {" " + libro.disponibles + " uds"}
                      </p>
                    </CardSubtitle>
                  </CardBody>
                  <CardFooter>
                    <Button
                      disabled={libro.disponibles <= 0}
                      onClick={() => abrirModalSeleccionLibro(libro)}
                      color="success"
                    >
                      Solicitar
                    </Button>
                  </CardFooter>
                </Card>
              )
          )}
        </div>
      </div>
      <Modal isOpen={modalNoLogin} centered={true}>
        <ModalHeader>Ups...</ModalHeader>
        <ModalBody>Debes iniciar sesión para poder hacer reservas.</ModalBody>
        <ModalFooter>
          <Button onClick={() => setModalNoLogin(!modalNoLogin)}>Cerrar</Button>
          <Button color="success" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </Button>
        </ModalFooter>
      </Modal>
      {modalAddLibro && (
        <ModalSelecionLibro
          modalAddLibro={modalAddLibro}
          setModalAddLibro={setModalAddLibro}
          libroSelecionado={libroSelecionado}
          addReserva={addReserva}
          setLibroSelecionado={setLibroSelecionado}
        />
      )}
    </>
  );
};
