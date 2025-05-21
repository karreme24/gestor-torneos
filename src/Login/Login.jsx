import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/aunthContext';
import ErrorPopOut from '../error/ErrorPopOut';

export default function Login() {
  const { user, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user != null) {
      navigate('/torneos');
    }
  }, [user, navigate]);

  const handleSumit = async (event) => {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();

    try {
      await login(email, passWord);
      navigate('/torneos');
    } catch (error) {
      // Cuando hay un error, actualiza el estado para mostrar el popup
      setIsErrorVisible(true);
      setErrorMessage(error.message || "Error al iniciar sesión. Por favor, verifica tus credenciales.");
      console.log("NO SE PUDO LOGUEAR");
      console.log("Error de login:", error);
    }
  }

  const handleGoogle = async (event) => {
    // Prevenir la recarga de la página
    event.preventDefault();
    
    try {
      await loginWithGoogle();
      navigate('/torneos');
    } catch (error) {
      // Cuando hay un error en login con Google, también muestra el popup
      setIsErrorVisible(true);
      setErrorMessage(error.message || "Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.");
      console.log("NO SE PUDO LOGUEAR CON GOOGLE");
      console.log("Error al iniciar sesión con Google:", error);
    }
  };

  // Esta función se llamará cuando el usuario cierre el popup de error
  const handleCloseError = () => {
    setIsErrorVisible(false);
  };

  return (
    <>
      <div className='login'>
        <form className='login-form' onSubmit={handleSumit}>
          <h1>Inicio de Sesión</h1>
          <p className='login-p'>Correo Electrónico</p>
          <input 
            className='login-in' 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <p className='login-p'>Contraseña</p>
          <input 
            className='login-in' 
            type="password" 
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)} 
            required
          />
          <button type='submit' className='sumit-button'>Iniciar Sesión</button>
          <p className='login-p'>------------otras opciones------------ </p>
          <button type="button" onClick={handleGoogle} className="google-btn">
            <svg
              className="google-icon"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuar con Google
          </button>
          <a className='register-a' href="/registrar">No tengo una cuenta</a>
        </form>

        {/* Muestra el componente ErrorPopOut cuando isErrorVisible es true */}
        {isErrorVisible && (
          <div className="error-popup-container" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <ErrorPopOut 
              message={errorMessage} 
              onClose={handleCloseError} 
            />
          </div>
        )}
      </div>
    </>
  )
}