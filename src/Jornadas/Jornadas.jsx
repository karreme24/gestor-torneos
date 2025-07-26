import React, { useEffect, useState } from 'react';
import './Jornadas.css';
import { collection, doc, getDoc, getDocs, query, updateDoc, where, writeBatch } from 'firebase/firestore'; 
import { db } from '../firebase/config';
import { useIDSelectTorneo } from '../context/TorneosContex';
import ConfirmarPopOut from '../Popouts/ConfirmarPopOut';

import ErrorPopOut from '../error/ErrorPopOut';
import Jornada from './jornada';

export default function Jornadas() {
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const { IDSelectTorneo } = useIDSelectTorneo();
  const colletionRef = collection(db, 'equipos');
  const [misEquipos, setMisEquipos] = useState([]);
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState("");
  const [torneoData, setTorneoData] = useState(null);
  const torneoRef = doc(db, 'torneos', IDSelectTorneo);
  const [misJornadas, setMisJornadas]=useState([]);
 



  // Fetch equipos
  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const q = query(colletionRef, where('torneoID', '==', IDSelectTorneo));
        const misEquiposData = [];
        const misEquiposSnap = await getDocs(q);
        misEquiposSnap.forEach((equipo) => {
          misEquiposData.push({id: equipo.id, ...equipo.data()});
        });
        setMisEquipos(misEquiposData);
      } catch (error) {
        console.error('Error fetching equipos:', error);
      }
    };

    fetchEquipos();
  }, [IDSelectTorneo]);








  // Fetch torneo data
  useEffect(() => {
    const fetchTorneo = async () => {
      try {
        const torneoSnap = await getDoc(torneoRef);
        setTorneoData(torneoSnap.data());
      } catch (error) {
        console.error('Error fetching torneo:', error);
      }
    };

    fetchTorneo();
  }, [IDSelectTorneo]); // Only depend on IDSelectTorneo








  // Fetch partidos when torneo is started
  useEffect(() => {
    
  const ordenarPartidosPorJornadas = (partidos) => {
    // Verifica si hay partidos
    if (!partidos || partidos.length === 0) {
      return [];
    }
  
    // Encuentra el número total de jornadas
    const numJornadas = misEquipos.length-1;
    
    // Crear la matriz de jornadas
    const matrizJornadas = [];
  
    // Organizar partidos por jornada
    for (let i = 1; i <= numJornadas; i++) {
      const partidosJornada = partidos.filter(partido => partido.jornada === i)
                                    .sort((a, b) => a.local.localeCompare(b.local));
      matrizJornadas.push(partidosJornada);
    }
  
    return matrizJornadas;
  };


    const fetchPartidos = async () => {
      try {
        const partidosRef = collection(db, 'partidos');
        const q = query(partidosRef, where('torneo', '==', IDSelectTorneo));
        const partidosData = [];
        const partidosSnap = await getDocs(q);
        partidosSnap.forEach((partido) => {
          partidosData.push({id: partido.id, ...partido.data()});
        });
        const jornadas = ordenarPartidosPorJornadas(partidosData);
        
        setMisJornadas(jornadas)
      } catch (error) {
        console.error('Error fetching partidos:', error);
      }
    };

    if (torneoData?.isStart) {
      fetchPartidos();
      

    }
  }, [IDSelectTorneo, torneoData?.isStart, torneoData]); // Only re-run when tournament ID or start status changes









  const generarJornadas = (equipos) => {
    if (equipos.length % 2 !== 0) {
      console.error("El número de equipos debe ser par.");
      return [];
    }

    const totalJornadas = equipos.length - 1;
    const partidos = [];
    const mitad = equipos.length / 2;
    let equiposRotables = [...equipos];

    for (let i = 0; i < totalJornadas; i++) {
      for (let j = 0; j < mitad; j++) {
        partidos.push({
          torneo: IDSelectTorneo,
          jornada: i + 1,
          local: equiposRotables[j].id,
          visita: equiposRotables[equiposRotables.length - 1 - j].id,
          localName:equiposRotables[j].name,
          visitaName: equiposRotables[equiposRotables.length - 1 - j].name,
          golLocal:0,
          golVisita:0,
          estado:0

        });
      }
      equiposRotables = [
        equiposRotables[0],
        ...equiposRotables.slice(2),
        equiposRotables[1]
      ];
    }

    return partidos;
  };

  const guardarPartidos = async (partidos) => {
    try {
      const batch = writeBatch(db);
      const partidosRef = collection(db, "partidos");

      partidos.forEach((partido) => {
        const partidoDoc = doc(partidosRef);
        batch.set(partidoDoc, partido);
      });

      await batch.commit();
      console.log("Todos los partidos fueron guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar los partidos:", error);
    }
  };

  const StartConfirm = async () => {
    

    if (misEquipos.length === 0) {
      setError("No hay equipos en el torneo");
      setConfirmVisible(false);
      setErrorVisible(true);
    } else if (misEquipos.length % 2 === 0) {
      const partidos = generarJornadas(misEquipos);
      await guardarPartidos(partidos);
      await updateDoc(torneoRef, {
        isStart: true
        
      });
      setTorneoData(prev => ({...prev, isStart: true}));
      window.location.reload();
    } else {
      setError("el numero de equipos debe ser par");
      setConfirmVisible(false);
      setErrorVisible(true);
    }
  };


/* agregar a base de datos el localName y el Visita Name */
  

  return (
    <div className="jornadas">
     

      {torneoData?.isStart ? (
        <div className="jornadas-container">
        <h2>Calendario del Torneo</h2>
        {misJornadas.map((jornada, jornadaIndex) => (
          <Jornada key={jornadaIndex} jornada={jornada} numJornada={jornadaIndex+1}/>
          
            
              
            
        ))}
      </div>
      ) : (
        <div className='aviso-container'>
          <p >Debes iniciar el torneo para ver las jornadas</p>
          <button className="start-btn" onClick={() => setConfirmVisible(true)}>
            Iniciar torneo
          </button>
        </div>
      )}

      {isConfirmVisible && ( 
        <ConfirmarPopOut
          OnClose={() => setConfirmVisible(false)}
          startEvent={StartConfirm}
          advertencia={`¿Estas seguro de iniciar el torneo ${torneoData?.name}?`}
          descripccion={`Una vez iniciado el torneo no podras agregar ni eliminar equipos. Esta accion no se puede deshacer y eliminara todos los partidos y datos relacionados con el torneo ${torneoData?.name}.`}
        />
      )}

      {isErrorVisible && (
        <ErrorPopOut error={error} onClose={() => setErrorVisible(false)} />
      )}
    </div>
  );
}