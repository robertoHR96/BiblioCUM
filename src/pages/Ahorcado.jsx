import React, { useState } from "react";
import Ah0 from "../assets/Ahorcado0.png";
import Ah1 from "../assets/Ahorcado1.png";
import Ah2 from "../assets/Ahorcado2.png";
import Ah3 from "../assets/Ahorcado3.png";
import Ah4 from "../assets/Ahorcado4.png";
import Ah5 from "../assets/Ahorcado5.png";
import Ah6 from "../assets/Ahorcado6.png";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

export const Ahorcado = () => {
  const intentosTotales = 5;
  const [listaImgAh, setListaImgAh] = useState({
    contador: 0,
    imagenes: [Ah6, Ah5, Ah4, Ah3, Ah2, Ah1, Ah0],
  });
  const [constadorImgAh, setConstadorImgAh] = useState(6);
  const [intentosJugador, setIntentosJugador] = useState({
    porJugar: 5,
    aciertos: 0,
    fallos: 0,
  });
  const [abecedario, setAbecedario] = useState([
    { letra: "A", estado: 0 },
    { letra: "B", estado: 0 },
    { letra: "C", estado: 0 },
    { letra: "D", estado: 0 },
    { letra: "E", estado: 0 },
    { letra: "F", estado: 0 },
    { letra: "G", estado: 0 },
    { letra: "H", estado: 0 },
    { letra: "I", estado: 0 },
    { letra: "J", estado: 0 },
    { letra: "K", estado: 0 },
    { letra: "L", estado: 0 },
    { letra: "M", estado: 0 },
    { letra: "N", estado: 0 },
    { letra: "Ñ", estado: 0 },
    { letra: "O", estado: 0 },
    { letra: "P", estado: 0 },
    { letra: "Q", estado: 0 },
    { letra: "R", estado: 0 },
    { letra: "S", estado: 0 },
    { letra: "T", estado: 0 },
    { letra: "U", estado: 0 },
    { letra: "V", estado: 0 },
    { letra: "W", estado: 0 },
    { letra: "X", estado: 0 },
    { letra: "Y", estado: 0 },
    { letra: "Z", estado: 0 },
  ]);

  const [dataGame, setDataGame] = useState({
    letrasPalabra: [
      { letra: "C", estado: false },
      { letra: "A", estado: false },
      { letra: "S", estado: false },
      { letra: "A", estado: false },
    ],
    pista: "Todos tenemos una...",
  });

  const [terminaJuego, setTerminaJuego] = useState(false);
  const [ganaJuego, setGanaJuego] = useState(false);

  const comprobarSiFin = () => {
    let gana = true;
    dataGame.letrasPalabra.map((letraAbc, index) => {
      if (letraAbc.estado === false) {
        gana = false;
      }
    });
    // varibel si gana
    setGanaJuego(gana);

    // si ha gando termina
    if (gana === true) {
      setTerminaJuego(true);
    } else {
      // sino se comprueba su numeor de intentos
      if (intentosJugador.porJugar === 0) {
        setTerminaJuego(true);
      }
    }
  };

  const chageStateLetter = (index) => {
    let letraButton = abecedario[index];

    // se comprueba no se haya puldado antes
    if (letraButton.estado === 0) {
      letraButton.estado = 1; // se marca como pulsada

      // se busc coincidenica si la hay se marca como good
      dataGame.letrasPalabra.map((letraAbc, index) => {
        console.log(letraAbc.letra, letraButton.letra);
        if (letraAbc.letra === letraButton.letra) {
          letraAbc.estado = true;
          letraButton.estado = 2;
        }
      });
    }
    //Se suma el intento
    let intentosUpdate = intentosJugador;
    if (letraButton.estado === 2) {
      intentosUpdate.aciertos = intentosUpdate.aciertos + 1;
    } else {
      if (letraButton.estado === 1) {
        let contador = (listaImgAh.contador + 1)
        setListaImgAh({...listaImgAh, contador: contador})
        intentosUpdate.fallos = intentosUpdate.fallos + 1;
      }
    }
    intentosJugador.porJugar = intentosJugador.porJugar - 1;
    setIntentosJugador({ ...intentosUpdate });

    // se reace el vector de letras
    let copiaAbecedario = [...abecedario];
    copiaAbecedario[index] = { ...letraButton };
    setAbecedario([...copiaAbecedario]);

    // se comprueba si ha ganado
    // se comprueba si termina la partida
    comprobarSiFin();
  };

  const reintentar = () => {
    setTerminaJuego(false);
    setGanaJuego(false);
  };
  const siguienteJuego = () => {
    setTerminaJuego(false);
    setGanaJuego(false);
  };

  return (
    <>
      <div className="ahorcado">
        <img src={listaImgAh.imagenes[listaImgAh.contador]}  className="imagen-ahorcado"/>
        <div className="centrador">{dataGame.pista}</div>
        <div className="letras-palabra ">
          {dataGame.letrasPalabra.map((letra, index) =>
            letra.estado === true ? (
              <div className="letra-palabra centrador">{letra.letra}</div>
            ) : (
              <div className="letra-palabra centrador">-</div>
            )
          )}
        </div>
        <div className="letras-ahorcado">
          {abecedario.map((letra, index) => (
            <div
              className={"letra" + letra.estado}
              onClick={() => chageStateLetter(index)}
            >
              {letra.letra}
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={terminaJuego && !ganaJuego}>
        <ModalHeader>As perdido...</ModalHeader>
        <ModalBody>Ups... parece que no lo has conseguido...</ModalBody>
        <ModalFooter>
          <Button onClick={() => reintentar()}>Reintentar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={terminaJuego && ganaJuego}>
        <ModalHeader>Enorabuena</ModalHeader>
        <ModalBody>Enorabuena has ganado</ModalBody>
        <ModalFooter>
          <Button onClick={() => siguienteJuego()}>Aceptar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
