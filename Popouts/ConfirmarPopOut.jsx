import React from 'react';


export default function ConfirmarPopOut({ OnClose, startEvent, descripccion, advertencia }) {

  
  return (
    <div className='confirm-overlay'>
      <div className='confirm-content'>
        <h3>{advertencia}</h3>
        <p>{descripccion}</p>
        <div className='confirm-options'>
          <button onClick={startEvent}>Aceptar</button>
          <button onClick={OnClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
