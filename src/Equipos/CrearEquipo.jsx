import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/config';
import { useIDSelectTorneo } from '../context/TorneosContex';
import './equipos.css';

export default function CrearEquipo({ onClose, refresh }) {
  const [name, setName] = useState('');
  const { IDSelectTorneo } = useIDSelectTorneo();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        HandleSumit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [name]); // Escucha cambios en `name`

  const HandleSumit = async () => {
    if (!name.trim()) return; // Evita crear equipos sin nombre

    try {
      await addDoc(collection(db, 'equipos'), {
        name,
        torneoID: IDSelectTorneo,
        ga: 0,
        gc: 0,
        dg: 0,
        v: 0,
        e: 0,
        d: 0,
      });
      onClose();
      refresh();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="crear-equipo-overlay">
      <div className="crear-equipo-content">
        <button onClick={onClose} className="close-btn">X</button>
        <h2>Crear Equipo</h2>
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder='Nombre del equipo'
        />
        <button className='btn-crear' onClick={HandleSumit}>Crear</button>
      </div>
    </div>
  );
}
