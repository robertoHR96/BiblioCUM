import React, { useState } from "react";
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
export const Filtro = (props) => {
  const {
    filter,
    setFilter,
    handleChangeRangeMin,
    handleChangeRangeMax,
    changeCheck,
  } = props;
  const [desplegar, setDesplegar] = useState(false);
  return (
    <>
      <div
        onClick={() => setDesplegar(!desplegar)}
        className="button-desplegar"
      >
        <Button><b>Filtros</b></Button>
      </div>
      <div className={desplegar ? "libros-left despl" : "libros-left no-despl"}>
        <div>
          <div className="filtro">
            <Label>Nombre / Autor</Label>
            <Input
              type="text"
              value={filter.name}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />
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
          <div className="filtro ">
            <Label>Categorias</Label>
            <div className="box-categorias">
              {filter.categorias.map((categoria, index) => (
                <div>
                  <div>
                    <input
                      type="checkbox"
                      name={categoria.nombre}
                      checked={categoria.valor}
                      onChange={() => changeCheck(categoria.nombre)}
                    />
                  </div>
                  <div>
                    <Label check>{categoria.nombre}</Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
