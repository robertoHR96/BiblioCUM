import { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto
const UsuarioContext = createContext();

// Crear el proveedor del contexto
export const UsuarioProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { infoGame: [] };
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const loginUser = (userData) => {
    setUser({ ...userData });
  };

  const logoutUser = () => {
    setUser({ infoGame: [] });
  };

  return (
    <UsuarioContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// Crear un custom hook para acceder al contexto
export const useUsuarioContext = () => {
  return useContext(UsuarioContext);
};
