import React, { useEffect, useState } from 'react'
import './Equipos.css'
import CrearEquipo from './CrearEquipo';
import { useIDSelectTorneo } from '../context/TorneosContex';
import Equipo from './Equipo';
import { collection,  getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Equipos() {
  const [isCrearEquipoVisible, setCrearEquipoVisible] = useState(false);
  const { IDSelectTorneo } = useIDSelectTorneo();
  const colletionRef = collection(db,'equipos');
  const [misEquipos, setMisEquipos]=useState([]);
  useEffect(()=>{
    const fechtEquipos = async()=>{
      try {
       
        const q = query(colletionRef, where('torneoID','==',IDSelectTorneo));
        const misEquiposData=[];
        const MisEquiposSnap = await getDocs(q);
        MisEquiposSnap.forEach((equipo)=>{

          misEquiposData.push({id:equipo.id, ...equipo.data()});

        })
        setMisEquipos(misEquiposData);
      } catch (error) {
        console.log(error);
        
      }

      
    }

    fechtEquipos();
  },[IDSelectTorneo])

  const refresh = () => {
    window.location.reload();
  }



  return (
    <>
      <div className='equipos'>
        <h1>Equipos del Torneo</h1>
  
        <div className='equipos-list'>
          {misEquipos.length > 0 ? (
            misEquipos.map((equipo) => (
              <Equipo 
                key={equipo.id}
                equipo={equipo}
                refresh = {refresh}
              />
            ))
          ) : (
            <p className="no-equipos-mensaje">No hay equipos registrados en el torneo. ¡Crea uno nuevo!</p>
          )}
        </div>
      </div>
  
      <button className='crear-equipo-btn' onClick={() => setCrearEquipoVisible(true)}>+</button>
      
      {isCrearEquipoVisible && (
        <CrearEquipo 
          onClose={() => setCrearEquipoVisible(false)}  
          refresh={refresh} 
        />
      )}
    </>
  )
}