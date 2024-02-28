import { createContext } from "react";

/* Creating a context for the user. */
export const UserContext = createContext({
    tipo:null,
    imagen:null,
});