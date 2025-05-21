import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SimpleLayout from '../layouts/SimpleLayout';
import Login from '../Login';
import Landing from '../Landing';
import Home from '../Home';
import Torneos from '../Torneos/Torneos';
import Equipos from '../Equipos/Equipos';
import Jornadas from '../Jornadas/Jornadas';
import Register from '../Login/register';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppRouter() {
  const [activePath, setActivePath] = useState(window.location.pathname);
  const navigate = useNavigate(); 

  const navigateTo = (path) => {
    navigate(path); 
    setActivePath(path);
  };

  return (
    <Routes>
      {/* Rutas que NO necesitan sidebar */}
      <Route element={<SimpleLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/torneos" element={<Torneos activePath={activePath} setActivePath={setActivePath} navigateTo={navigateTo} />} />
      </Route>

      {/* Rutas que SÍ necesitan sidebar */}
      <Route element={<MainLayout activePath={activePath} setActivePath={setActivePath} navigateTo={navigateTo} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/jornadas" element={<Jornadas />} />
      </Route>
    </Routes>
  );
}
