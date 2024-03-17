import React, { useState, useEffect } from "react";
import { Button, FormFeedback, Input, Tooltip } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useUsuarioContext } from "../../context/UsuarioContext";

export const Register = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const [passwordRepit, setPasswordRepit] = useState("");
  const [passwordRepitValid, setPasswordRepitValid] = useState(false);

  const [ciudad, setCiudad] = useState("");
  const [ciudadValid, setCiudadValid] = useState(false);

  const [numero, setNumero] = useState("");
  const [numeroValid, setNumeroValid] = useState("");

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const navigate = useNavigate();

  const isMail = (mail) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(mail);
  };

  const isPassword = (cadena) => {
    // Verificar longitud mínima de 8 caracteres
    if (cadena.length < 8) {
      return false;
    }

    // Verificar al menos una mayúscula, una minúscula, un número y un carácter especial
    const regexMayuscula = /[A-Z]/;
    const regexMinuscula = /[a-z]/;
    const regexNumero = /[0-9]/;
    const regexEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (
      !regexMayuscula.test(cadena) ||
      !regexMinuscula.test(cadena) ||
      !regexNumero.test(cadena) ||
      !regexEspecial.test(cadena)
    ) {
      return false;
    }

    // Si la cadena pasa todas las validaciones, retorna true
    return true;
  };

  const isPasswordRepit = () => {
    return password === password;
  };
  const validar = () => {
    let v1 = isMail(email);
    setEmailValid(!v1);
    let v2 = isPassword(password);
    setPasswordValid(!v2);
    let v3 = isPasswordRepit();
    setPasswordRepit(v3);
    let v4 = ciudad.length > 0;
    setCiudadValid(v4);
    let v5 = numero.length === 9;
    setNumeroValid(v5);

    if (v1 && v2 && v3 && v4 && v5) {
      navigate("/libros");
      loginUser({ ...user, logeado: "login" });
    }
  };

  const onlyNumbers = (event) => {
    const inputValor = event.target.value;

    // Si el valor ingresado no es un número, no lo actualizamos
    if (!/^[\d+]*$/.test(inputValor)) {
      return;
    }

      if (inputValor.length > 9) {
          return;
    }
    // Actualizar el estado con el valor más "+34" delante
    setNumero(inputValor);
  };

  return (
    <div className="login">
      <div className="centrador content-login">
        <label>Correo electronico</label>
        <Input
          type="mail"
          value={email}
          invalid={emailValid}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormFeedback>Email no valido</FormFeedback>
        <label>Contraseña</label>
        <Input
          type="password"
          value={password}
          invalid={passwordValid}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormFeedback>
          <p id="feedback-1">
            <b>Contraseña no valida:</b>
            {
              " Contraseña requerida de 8 caracteres alfanuméricos includidas letras mayusculas y minusculas con al menos 1 caracter especial."
            }
          </p>
        </FormFeedback>
        <label>Repite contraseña</label>
        <Input
          type="password"
          value={passwordRepit}
          invalid={passwordRepitValid}
          onChange={(e) => setPasswordRepit(e.target.value)}
        />
        <FormFeedback>
          <p id="feedback-1">
            <b>Contraseña no valida:</b>
            {"Ambas constraseña deben coincidir"}
          </p>
        </FormFeedback>

        <label>Ciudad</label>
        <Input
          type="text"
          value={ciudad}
          invalid={ciudadValid}
          onChange={(e) => setCiudad(e.target.value)}
        />
        <FormFeedback>Este campo no puede estar vacio</FormFeedback>
        <label>Número de telefono</label>

        <Input
          type="text"
          value={numero}
          invalid={numeroValid}
          onChange={(e) => onlyNumbers(e)}
        />
        <FormFeedback>Debe ser un numero de telefono valido</FormFeedback>

        <div className="buttons-login">
          <Button color="success" onClick={() => validar()}>
            Registrarse
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Atras
          </Button>
        </div>
      </div>
    </div>
  );
};
