import React, { useState } from 'react'
import { Trash2 } from 'lucide-react';
import { collection, deleteDoc, doc, getDocs, query} from 'firebase/firestore';
import { useAuth } from '../context/aunthContext';
import { db } from '../firebase/config';
import { useIDSelectTorneo } from '../context/TorneosContex';
import { where } from 'firebase/firestore/lite';
import ConfirmarPopOut from '../../Popouts/confirmarPopOut';


export default function Torneo({id, name, refresh, navigateTo}) {
  const {setIDSelectTorneo} = useIDSelectTorneo();
  const {user} = useAuth();
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  const ConfirmarAccion = (e) => {
    e.stopPropagation();
    setConfirmVisible(true);
  }
  

  const deleteTorneo = async (e) => {
    e.stopPropagation();

    
    
    try {
      const torneoRef = doc(db, 'torneos', id);
  
      const equiposQ = query(collection(db, 'equipos'), where('torneoID', '==', id));
      const partidosQ = query(collection(db, 'partidos'), where('torneo', '==', id));
  
      const equipos = await getDocs(equiposQ);
      const partidos = await getDocs(partidosQ);
  
  
      // Filtro adicional para asegurar coincidencia exacta
      await Promise.all(
        equipos.docs
          .filter((doc) => doc.data().torneoID === id)
          .map((doc) => deleteDoc(doc.ref))
      );
  
      await Promise.all(
        partidos.docs
          .filter((doc) => doc.data().torneo === id)
          .map((doc) => deleteDoc(doc.ref))
      );
  
      await deleteDoc(torneoRef);
      refresh();
    } catch (error) {
      console.error("Error eliminando torneo y datos relacionados:", error);
    }
  
  };
  
  
  const handelTorneoSelect = () => {
    setIDSelectTorneo(id);
    navigateTo('/home');
  }

  const close = () => {
   
    setConfirmVisible(false);
  }


  
  return (
    <>
    <div className='torneo-item' onClick={handelTorneoSelect}>
      <h3>{name}</h3>
      <button 
        onClick={ConfirmarAccion} 
        className='torneo-delete-btn'
      >
        <Trash2 size={30} />
      </button>

     

    
    </div>

     {isConfirmVisible && (
        <ConfirmarPopOut
          OnClose={close}
          advertencia={`¿Está seguro de que desea eliminar el torneo ${name}?`}
          descripccion={`Esto eliminará todos los datos relacionados con el torneo, incluidos los equipos y partidos.`}
          startEvent={deleteTorneo}
          />
      )}

    </>
  )
}