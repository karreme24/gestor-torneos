import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ConfirmarPopOut from '../Popouts/ConfirmarPopOut';

export default function Equipo({ equipo, refresh }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const deleteEquipo = async () => {
    try {
      const equipoRef = doc(db, 'equipos', equipo.id);
      await deleteDoc(equipoRef);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const OnClose = () => {
    setIsConfirmOpen(false);
  };

  const ConfirmarAccion = () => {
    setIsConfirmOpen(true);
  };

  return (
    <div className='equipo-item'>
      <div className='equipo-content'>
        <h3>{equipo.name}</h3>
        <button 
          onClick={ConfirmarAccion} 
          className='torneo-delete-btn'
        >
          <Trash2 size={30} />
        </button>
      </div>

      <div className='equipo-info'>
        <p>V : {equipo.v}</p>
        <p>E : {equipo.e}</p>
        <p>D : {equipo.d}</p>
      </div>

      {isConfirmOpen && (
        <ConfirmarPopOut 
          OnClose={OnClose}
          startEvent={deleteEquipo}
          advertencia={`¿Estas seguro de eliminar el equipo ${equipo.name}?`}
          descripccion={`Esta accion no se puede deshacer y eliminara todos los partidos y datos relacionados con el equipo ${equipo.name}.`}
        />
      )}
    </div>
  );
}
