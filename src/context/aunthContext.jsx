import { auth, db } from "../firebase/config";
import React, { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ErrorPopOut from "../error/ErrorPopOut"; // Importamos el componente ErrorPopOut

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("Error creando el contexto de autenticación");
  }
  return context;
};

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); 
  }, []);

  const register = async (email, password, name, lastName) => {
    try {
      setLoading(true);
      
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          name,
          lastName,
          email,
        });
        
        setUser(user);
      } else {
        console.error("Error: el usuario creado es nulo");
        setError("Error: no se pudo crear el usuario.");
        setIsErrorVisible(true);
        throw new Error("Error: el usuario creado es nulo");
      }
    } catch (error) {
      console.error("Error en el registro:", error.message);
      setError("Error en el registro. Por favor, verifica los datos e inténtalo de nuevo.");
      setIsErrorVisible(true);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
    } catch (error) {
      console.error("Error en el login:", error.message);
      setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
      setIsErrorVisible(true);
      console.log("NO SE PUDO LOGUEAR");
      throw error; // Seguimos propagando el error para compatibilidad
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
  
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
  
        if (!userSnapshot.exists()) {
          console.log("Usuario nuevo");
          const fullName = user.displayName ? user.displayName.split(" ") : ["Usuario", "Google"];
          const name = fullName[0];
          const lastName = fullName.length > 1 ? fullName[1] : "";
          const email = user.email;
  
          await setDoc(userRef, {
            name,
            lastName,
            email,
          });
        } 
        setUser(user);
      } else {
        console.error("Error: el usuario de Google es nulo");
        setError("Error: no se pudo obtener información del usuario de Google.");
        setIsErrorVisible(true);
        console.log("NO SE PUDO LOGUEAR CON GOOGLE");
        throw new Error("Error: el usuario de Google es nulo");
      }
    } catch (error) {
      console.error("Error en el login con Google:", error.message);
      setError("Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.");
      setIsErrorVisible(true);
      console.log("NO SE PUDO LOGUEAR CON GOOGLE");
      throw error; // Propagamos el error para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
      throw error; // Propagamos el error para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar el popup de error
  const handleCloseError = () => {
    setIsErrorVisible(false);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    isErrorVisible,
    handleCloseError,
    register,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <authContext.Provider value={value}>
      {isErrorVisible && (
        <div className="error-popup-container" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <ErrorPopOut 
            error={error} 
            onClose={handleCloseError} 
          />
        </div>
      )}
      {!loading && children}
    </authContext.Provider>
  ); 
}