import { createContext } from "react";

/* Creating a context for the user. */
export const UserContext = createContext({
    logeado:"noLogin",
    tipo:null,
    imagen:null,
    reservas: [],
});