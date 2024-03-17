import React, { useState } from "react";
import { addDays } from "date-fns";
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
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";
export const ModalSelecionLibro = (props) => {
  const {
    modalAddLibro,
    setModalAddLibro,
    libroSelecionado,
    setLibroSelecionado,
    addReserva,
  } = props;

  const [parteModal, setParteModal] = useState(1);

  return (
    <>
      <Modal isOpen={modalAddLibro} centered={true}>
        <ModalHeader>{libroSelecionado.titulo}</ModalHeader>
        <ModalBody>
          {parteModal === 1 ? (
            <div className="body-modal-addlibro">
              <div>
                <div className="img-card">
                  <img alt="Sample" src={"" + libroSelecionado.portada} />
                </div>
              </div>
              <div>
                <CardText>
                  <p>{libroSelecionado.descripcion}</p>
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
          ) : (
            <div className="centrador">
              <DateRange
                locale={es}
                color={"#00843d"}
                editableDateInputs={true}
                onChange={(item) =>
                  setLibroSelecionado({
                    ...libroSelecionado,
                    fecha: [item.selection],
                  })
                }
                moveRangeOnFirstSelection={false}
                ranges={libroSelecionado.fecha}
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {parteModal === 1 ? (
            <Button onClick={() => setModalAddLibro(false)} color="danger">
              Cancelar
            </Button>
          ) : (
            <Button onClick={() => setParteModal(1)} color="danger">
              Atras
            </Button>
          )}
          {parteModal === 1 ? (
            <Button onClick={() => setParteModal(2)} color="success">
              Siguiente
            </Button>
          ) : (
            <Button
              onClick={() => {
                addReserva();
                setParteModal(1);
              }}
              color="success"
            >
              Reservar
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};
