import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import jsonArticulos from "../jsonArticulos.json";

export const Novedades = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    setArticulos(jsonArticulos);
  }, []);

  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <div className="novedades">
      <div className="articulos">
        <h1>Novedades</h1>
        {articulos.map((articulo, index) => (
          <div className="articulo">
            <div className="foto">
              <img src={articulo.imagen} />
            </div>
            <div className="title">
              <h5>{articulo.titulo}</h5>
            </div>
            <div className="descripcion">
              <p>{articulo.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
