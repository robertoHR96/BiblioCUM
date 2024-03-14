import React, { useState, useEffect } from "react";
import Ah0 from "../../assets/Ahorcado0.png";
import Ah1 from "../../assets/Ahorcado1.png";
import Ah2 from "../../assets/Ahorcado2.png";
import Ah3 from "../../assets/Ahorcado3.png";
import Ah4 from "../../assets/Ahorcado4.png";
import Ah5 from "../../assets/Ahorcado5.png";
import Ah6 from "../../assets/Ahorcado6.png";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import axios from "axios";

/**
 * Componente funcional Ahorcado
 */
export const Ahorcado = () => {
  // Número total de intentos permitidos
  const intentosTotales = 6;

  // Estado para controlar las imágenes del ahorcado
  const [listaImgAh, setListaImgAh] = useState({
    contador: 0,
    imagenes: [Ah6, Ah5, Ah4, Ah3, Ah2, Ah1, Ah0],
  });

  // Estado para controlar los intentos del jugador
  const [intentosJugador, setIntentosJugador] = useState(intentosTotales);

  // Estado para controlar el abecedario de botones
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

  // Estado para controlar los datos del juego (letras de la palabra, pista)
  const [dataGame, setDataGame] = useState({
    letrasPalabra: [{ letra: "", estado: false }],
    pista: "",
  });

  const cargarDiccionario = (response) => {
    axios
      .get("https://programacion-cum.unex.es/diccionario.php")
      .then((response) => {
        let pista = response.data.Definicion;
        let letrasPalabras = [];
        let palabra = response.data.Palabra;
        for (let i = 0; i < palabra.length; i++) {
          let letraObjeto = {
            letra: palabra[i].toUpperCase(),
            estado: false,
          };
          letrasPalabras.push(letraObjeto);
        }
        setDataGame({ pista: pista, letrasPalabra: [...letrasPalabras] });
      })
      .catch((error) => {
        // handle error
      })
      .finally(() => {
        // always executed
      });
  }
  useEffect(() => {
    cargarDiccionario();
  }, []);

  // Estado para controlar si el jugador gana el juego
  const [ganaJuego, setGanaJuego] = useState(false);

  // Estado para controlar si el jugador pierde el juego
  const [pierdeJuego, setPierdeJuego] = useState(false);

  /**
   * Comprueba si el jugado gana la partida y activa el modal de Ganador
   */
  const comprobarSiGana = () => {
    let gana = !dataGame.letrasPalabra.some((letra) => !letra.estado);
    setGanaJuego(gana);
  };

  /**
   * Comprueba si el jugado pierde la partida y activa el modal de Perdedor
   */
  const comprobarSiPierde = () => {
    if (intentosJugador === 0) {
      setPierdeJuego(true);
    }
  };

  /**
   * Este useEffect sirve para evaluar si puerde el jugador, al restar un intento
   *     Es llamado en la funcion sumarIntentoFallido
   */
  useEffect(() => {
    comprobarSiPierde();
  }, [intentosJugador]);

  /**
   * Esta función aplica los cambios al fallar una letra,
   * cambia la imagen del ahorcado y resta un intento
   */
  const sumarItentoFallido = () => {
    let contador = listaImgAh.contador + 1;
    setListaImgAh({ ...listaImgAh, contador: contador });
    setIntentosJugador(intentosJugador - 1);
  };

  /**
   * Esta función actuliza el useState que maneja las letras (botones de juego),
   * para modificar la letra pulsada
   * @param {{letra: "", estado: int}} letraButton
   * @param {int} index
   */
  const updateAbecedario = (letraButton, index) => {
    let copiaAbecedario = [...abecedario];
    copiaAbecedario[index] = { ...letraButton };
    setAbecedario([...copiaAbecedario]);
  };

  /**
   * Esta función se jecuta al pulsar una letra,
   * cambia su estado en funcion de si acierta o falla,
   * y hace llamdas a los cambios
   * @param {int} index
   */
  const comprobarLetra = (index) => {
    let letraButton = abecedario[index];

    // se comprueba no se haya puldado antes
    if (letraButton.estado === 0) {
      // se marca como fallida por defecto
      letraButton.estado = 1;
      // se busca coincidenica si la hay se marca como good
      dataGame.letrasPalabra.map((letraAbc, index) => {
        if (letraAbc.letra.toUpperCase() === letraButton.letra.toUpperCase()) {
          letraAbc.estado = true;
          letraButton.estado = 2;
        }
      });
    }

    //Se suma el intento fallido si ha fallado
    if (letraButton.estado === 1) {
      sumarItentoFallido();
    }

    // se reace el vector de letras
    updateAbecedario(letraButton, index);

    // se comprueba si ha ganado
    if (pierdeJuego === false) {
      comprobarSiGana();
    }
  };

  const restableAbacedario = () => {
    let listaAbecedario = abecedario;
    abecedario.map((letra) => {
      letra.estado = 0;
    });
    setAbecedario([...listaAbecedario]);
  }
  
  const reiniciar = () => {
    setPierdeJuego(false);
    setGanaJuego(false);
    cargarDiccionario();
    restableAbacedario();
    setListaImgAh({
      contador: 0,
      imagenes: [Ah6, Ah5, Ah4, Ah3, Ah2, Ah1, Ah0],
    });
  };

  return (
    <>
      <div className="ahorcado">
        <div className="centrador">
          <img
            src={listaImgAh.imagenes[listaImgAh.contador]}
            className="imagen-ahorcado"
          />
        </div>
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
              onClick={() => comprobarLetra(index)}
            >
              {letra.letra}
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={pierdeJuego} centered={true}>
        <ModalHeader>As perdido...</ModalHeader>
        <ModalBody>Ups... parece que no lo has conseguido...</ModalBody>
        <ModalFooter>
          <Button onClick={() => reiniciar()}>Reintentar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={ganaJuego} centered={true}>
        <ModalHeader>Enorabuena</ModalHeader>
        <ModalBody>Enorabuena has ganado</ModalBody>
        <ModalFooter>
          <Button onClick={() => reiniciar()}>Aceptar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
