import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/config';
import { useAuth } from '../context/aunthContext';
import './torneos.css';

export default function CrearTorneo({ onClose, refresh }) {
  const [torneoName, setTorneoName] = useState('');
  const { user } = useAuth();
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
        handleSumit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [torneoName]); 

  const handleSumit = async () => {
    console.log('Torneo name:', torneoName); // Verifica el valor de torneoName
    if (!torneoName.trim()) return; // Evita enviar vacío

    try {
      await addDoc(collection(db, 'torneos'), {
        IDOwner: user.uid,
        name: torneoName,
        isStart: false,
      });
      onClose();
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="crear-torneo-overlay">
      <div className="crear-torneo-content">
        <button onClick={onClose} className="close-btn">X</button>
        <h2>Crear Torneo</h2>
        <input clasesName="crear-torneo-input"
          ref={inputRef}
          type="text"
          onChange={(e) => setTorneoName(e.target.value)}
          placeholder='Nombre del torneo'
        />
        <button className='btn-crear' onClick={handleSumit}>Crear</button>
      </div>
    </div>
  );
}
