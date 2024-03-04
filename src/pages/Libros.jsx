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
} from "reactstrap";

import MultiRangeSlider from "../components/MultiRangeSlider.jsx";

import jsonLibros from "./jsonLibros.json";

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
      { nombre:"Ficción",valor: true },
      "Clásicos",
      "Realismo mágico",
      "Literatura española",
      "Distopía",
      "Literatura inglesa",
      "Aventura",
      "Literatura francesa",
      "Literatura rusa",
      "Teatro",
      "Modernismo",
      "Historia",
      "Fantasía",
      "Literatura infantil",
      "Terror",
      "Misterio",
      "Épica",
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

  return (
    <div className="libros">
      <div className="libros-left">
        <div className="filtro">
          <Label>Nombre</Label>
          <Input type="text" />
        </div>
        <div className="filtro">
          <Label>{"Min precio: " + filter.min + "€"}</Label>
          <input
            min={1}
            max={99}
            value={filter.min}
            onChange={handleChangeRangeMin}
            type="range"
          />
        </div>
        <div className="filtro">
          <Label>{"Max precio: " + filter.max + "€"}</Label>
          <input
            min={1}
            max={99}
            value={filter.max}
            onChange={handleChangeRangeMax}
            type="range"
          />
        </div>
        <div className="filtro">
          <Label>Categorias</Label>
          <div>
            <Input type="checkbox" name="ficcion" />
            <Label check>Ficcion</Label>
            <Input type="checkbox" />
            <Label check>Clasicos</Label>
            <Input type="checkbox" />
            <Label check>Check me out</Label>
            <Input type="checkbox" />
            <Label check>Check me out</Label>
          
          </div>
        </div>
      </div>
      <div className="libros-center">
        {libros.map((libro, index) => (
          <Card
            style={{
              maxWidth: "17rem",
            }}
          >
            <img alt="Sample" src="https://picsum.photos/300/200" />
            <CardBody>
              <CardTitle tag="h5">{libro.titulo}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {libro.precio + " €"}
              </CardSubtitle>
              <CardText>{libro.descripcion}</CardText>
              <Button>Solicitar</Button>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="libros-rigth">rigth</div>
    </div>
  );
};
