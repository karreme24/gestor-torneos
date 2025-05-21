import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "./aunthContext";

// Crea el contexto
const IDSelectTorneoContext = createContext();

// Proveedor del contexto
export const TorneoContext = ({ children }) => {
  const { user } = useAuth(); // Obtiene el usuario autenticado

  // Genera la clave de la cookie basada en el UID del usuario
  const cookieKey = user ? `IDSelectTorneo_${user.uid}` : "IDSelectTorneo";

  // Obtiene el valor inicial de la cookie específica del usuario
  const initialID = user ? Cookies.get(cookieKey) || "" : "";

  const [IDSelectTorneo, setIDSelectTorneo] = useState(initialID);

  // Guarda el ID en cookies cuando cambia
  useEffect(() => {
    if (user) {
      Cookies.set(cookieKey, IDSelectTorneo, {
        expires: 7, // Expira en 7 días
        sameSite: "None", // Permite el uso en contextos de terceros
        secure: true, // Solo se envía a través de HTTPS
      });
    } else {
      // Si no hay usuario, elimina la cookie específica del usuario
      Cookies.remove(cookieKey, { sameSite: "None", secure: true });
    }
  }, [IDSelectTorneo, user, cookieKey]);

  return (
    <IDSelectTorneoContext.Provider value={{ IDSelectTorneo, setIDSelectTorneo }}>
      {children}
    </IDSelectTorneoContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useIDSelectTorneo = () => useContext(IDSelectTorneoContext);