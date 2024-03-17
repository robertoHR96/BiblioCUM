import React, { useState, useEffect } from "react";
import { useUsuarioContext } from "../../context/UsuarioContext.jsx";
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

export const Reservas = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (user !== undefined) {
      setReservas(user.reservas);
    }
  }, []);

  return (
    <div className="reservas">
      {reservas !== undefined &&
        reservas.map((libroSelecionado, index) => (
          <Card className="card-reserva-1">
            <div className="body-modal-addlibro card-reserva">
              <div>
                <div className="img-card">
                  <img alt="Sample" src={"" + libroSelecionado.portada} />
                </div>
              </div>
              <div>
                <CardTitle>
                  <b>{libroSelecionado.titulo}</b>
                </CardTitle>
                <CardText>
                  <p className="libro-desc">{libroSelecionado.descripcion}</p>
                </CardText>
                <CardText>
                  {
                    <p>
                      <b>Autor:</b>
                      {" " + libroSelecionado.autor}
                    </p>
                  }
                </CardText>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  <p>
                    <b>Precio: </b>
                    {" " + libroSelecionado.precio + " €"}
                  </p>
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  <p className="sub-text">
                    <b>Stock : </b>
                    {" " + libroSelecionado.disponibles + " uds"}
                  </p>
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  <p className="sub-text">{"#" + libroSelecionado.categoria}</p>
                </CardSubtitle>
              </div>
            </div>
          </Card>
        ))}
      <div>
      </div>
    </div>
  );
};
