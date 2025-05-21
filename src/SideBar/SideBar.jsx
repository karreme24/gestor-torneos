import React, { useState, useEffect } from 'react';
import './SideBar.css';
import { useAuth } from '../context/aunthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import userImg from '../img/user.avif';


export default function SideBar({activePath,setActivePath,navigateTo}) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState();
  const [error, setError] = useState();
  
  
  

  useEffect(() => {
    
    const handleLocationChange = () => setActivePath(window.location.pathname);
    window.addEventListener("popstate", handleLocationChange);

    return () => window.removeEventListener("popstate", handleLocationChange);
  }, [activePath]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    const fetchDoc = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const res = await getDoc(docRef);
        if (res.exists()) {
          setUserData(res.data());
        } else {
          setError("Documento no encontrado");
        }
      } catch (e) {
        setError(e.message);
      }
    };

    fetchDoc();
  }, [user]);

  const handleLogOut = () => {
    logout();
    navigate('/'); // Redirige al usuario al inicio de sesión después de cerrar sesión.
  };


 
  return (
    <>
      <button
        className="menu-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img className='user-img' src={userImg} alt="" />
          <h2 className='saludo' onClick={()=>{navigate('/torneos')}}>Hola {userData?.name || ""}</h2>
        </div>

        <div className="sidebar-nav">
          <button
            onClick={() => navigateTo('/home')}
            className={`nav-item ${activePath === "/home" ? "active" : ""}`}
          >
            🏠 Inicio
          </button>
          <button
            onClick={() => navigateTo('/equipos')}
            className={`nav-item ${activePath === "/equipos" ? "active" : ""}`}
          >
            👕 Equipos
          </button>
          <button
            onClick={() => navigateTo('/jornadas')}
            className={`nav-item ${activePath === "/jornadas" ? "active" : ""}`}
          >
            📅 Jornadas
          </button>
          
        </div>

        <div className="sidebar-footer">
          <button
            className="logout-btn"
            onClick={handleLogOut}
          >
            Cerrar sesión
          </button>
          
        </div>
      </div>

      {isOpen && (
        <div 
          className="overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
