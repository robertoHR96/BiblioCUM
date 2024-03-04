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
} from "reactstrap";

import MultiRangeSlider from "../components/MultiRangeSlider.jsx";

import jsonLibros from "./jsonLibros.json";
import { Filtro } from "./Filtro.jsx";

export const Libros = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    setLibros(jsonLibros);
  }, []);

  const [filter, setFilter] = useState({
    min: 1,
    max: 99,
    name: "",
    categorias: [
      { nombre: "Ficción", valor: true },
      { nombre: "Clásicos", valor: true },
      { nombre: "Literatura española", valor: true },
      { nombre: "Distopía", valor: true },
      { nombre: "Aventura", valor: true },
      { nombre: "Historia", valor: true },
      { nombre: "Fantasía", valor: true },
      { nombre: "Literatura infantil", valor: true },
      { nombre: "Terror", valor: true },
      { nombre: "Épica", valor: true },
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

  const pasaFiltros = (categoriaItem) => {
    if (filter.name !== "") {
      if (categoriaItem.titulo !== undefined) {
        if (
          !categoriaItem.titulo.toLowerCase().includes(filter.name.toLowerCase())
        ) {
          return false;
        }
      }
    }
    return true;
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
                style={
                  {
                    maxWidth: "496px",
                  }
                }
              >
                <img alt="Sample" src="https://picsum.photos/300/200" />
                <CardBody>
                  <CardTitle tag="h5">{libro.titulo}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {libro.precio + " €"}
                  </CardSubtitle>
                  <CardText>{libro.descripcion}</CardText>
                </CardBody>
                <CardFooter>
                  <Button>Solicitar</Button>
                </CardFooter>
              </Card>
            )
        )}
      </div>
      <div className="libros-rigth">rigth</div>
    </div>
  );
};
