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
} from "reactstrap";

import MultiRangeSlider from "../components/MultiRangeSlider.jsx";
import { useUsuarioContext } from "../context/UsuarioContext";
import jsonLibros from "./jsonLibros.json";
import { Filtro } from "./Filtro.jsx";

export const Libros = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();

  const [libros, setLibros] = useState([]);

  useEffect(() => {
    setLibros(jsonLibros);
  }, []);

  const [filter, setFilter] = useState({
    min: 1,
    max: 99,
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
      console.log("min", valor < filter.max);
      if (valor < filter.max) {
        setFilter({ ...filter, min: valor }); // Actualizar el estado con el nuevo valor del rango
      }
    }
  };
  const handleChangeRangeMax = (event) => {
    let valor = event.target.value;
    valor = Number(valor);
    if (!isNaN(valor)) {
      console.log("max", valor > filter.min);
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

  const pasaFiltros = (categoriaItem) => {
    return filtroCheck(categoriaItem) && filtroNombreAutor(categoriaItem);
  };

  const addReserva = (libro) => {
    let lista = [...user.reservas];
    lista.push(libro);
    loginUser({ ...user, reservas: [...lista] });
  };

  return (
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
                  <CardText>{libro.descripcion}</CardText>
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
                      <b>Precio: </b>
                      {" " + libro.precio + " €"}
                    </p>
                  </CardSubtitle>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => addReserva(libro)}>Solicitar</Button>
                </CardFooter>
              </Card>
            )
        )}
      </div>
    </div>
  );
};
