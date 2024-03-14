import React, { useState, useEffect } from "react";
import { Button, FormFeedback, Input, Tooltip } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useUsuarioContext } from "../../context/UsuarioContext";

export const Login = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

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
  const validar = () => {
    let v1 = isMail(email);
    setEmailValid(!v1);
    let v2 = isPassword(password);
    setPasswordValid(!v2);

    if (v1 && v2) {
      navigate("/libros");
      loginUser({ ...user, logeado: "login" });
    }
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
        <label>contraseña</label>
        <Input
          type="password"
          value={password}
          invalid={passwordValid}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormFeedback>
          <p id="feedback-1">
            <b>
            Contraseña no valida: 
            </b>
            {
            " Contraseña requerida de 8 caracteres alfanuméricos includidas letras mayusculas y minusculas con al menos 1 caracter especial."
            }
          </p>
        </FormFeedback>

        <div className="buttons-login">
          <Button color="success" onClick={() => validar()}>
            Login
          </Button>
          <Button color="secondary">Registrarse</Button>
        </div>
      </div>
    </div>
  );
};
