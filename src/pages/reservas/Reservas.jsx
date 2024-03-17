import React, { useState, useEffect, ChangeEvent } from "react";
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
import Switch from "@mui/material/Switch";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

export const Reservas = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();

  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const aprobarReserva = (libroSelecionado) => {
    let reservas = [...user.reservas];
    reservas.map((reserva) => {
      if (reserva.idReserva === libroSelecionado.idReserva) {
        reserva.aprovada = true;
      }
    });
    loginUser({ ...user, reservas: [...reservas] });
  };
  const formatearFecha = (fechaString) => {
    // Crear un objeto Date con la cadena de fecha original
    let fecha = new Date(fechaString);

    // Días de la semana y meses en español
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    // Obtener el día de la semana, el día del mes y el mes
    let diaSemana = diasSemana[fecha.getDay()];
    let dia = fecha.getDate();
    let mes = meses[fecha.getMonth()];
    let año = fecha.getFullYear();

    // Construir el string formateado
    let fechaFormateada = `${diaSemana} ${dia} de ${mes} del ${año}`;

    return fechaFormateada;
  };
  const getFechaInicio = (libroSelecionado) => {
    let fechaInit = libroSelecionado.fecha[0].startDate
  }
  return (
    <>
      <div className="reservas">
        <div className="switch-reservas">
          <div className="centrador">Sin Aprovadas</div>
          <Switch
            {...label}
            defaultUnChecked
            checked={checked}
            onChange={handleChange}
          />
          <div className="centrador">Aprovadas</div>
        </div>
        {user.reservas !== undefined &&
          user.reservas.map(
            (libroSelecionado, index) =>
              libroSelecionado.aprovada === checked && (
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
                        <p className="libro-desc">
                          {libroSelecionado.descripcion}
                        </p>
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
                          <b>Fecha inicio : </b>
                          {" " +
                            formatearFecha(libroSelecionado.fecha[0].startDate)}
                        </p>
                        <p className="sub-text">
                          <b>Fecha fin: </b>
                          {" " +
                            formatearFecha(libroSelecionado.fecha[0].endDate)}
                        </p>
                      </CardSubtitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        <p className="sub-text">
                          {"#" + libroSelecionado.categoria}
                        </p>
                      </CardSubtitle>
                    </div>
                  </div>
                  {!libroSelecionado.aprovada && (
                    <CardFooter>
                      <div className="centrador-right">
                        <Button
                          color="success"
                          onClick={() => aprobarReserva(libroSelecionado)}
                        >
                          Aprobar
                        </Button>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              )
          )}
        <div></div>
      </div>
    </>
  );
};
