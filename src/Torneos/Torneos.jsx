import React, { useEffect, useState } from 'react';
import './torneos.css';
import CrearTorneo from './CrearTorneo';
import { useAuth } from '../context/aunthContext';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Torneo from './Torneo'; 

export default function Torneos({ navigateTo }) {
  const [isCrearTorneoVisible, setCrearTorneoVisible] = useState(false);
  const { user } = useAuth();
  const [misTorneos, setMisTorneos] = useState([]);
  const colletionRef = collection(db, 'torneos');

  

  

  const refresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const ferchtTorneos = async () => {
      try {
        const q = query(colletionRef, where("IDOwner", "==", user.uid));

        const misTorneosSnap = await getDocs(q);
        const MsiTorneosData = [];
        misTorneosSnap.forEach((torneo) => {
          MsiTorneosData.push({ id: torneo.id, ...torneo.data() });
        });

        setMisTorneos(MsiTorneosData);
      } catch (error) {
        console.log(error);
      }
    };

    ferchtTorneos();
  }, [user]);

  return (
    <div className='torneos'>
      <h1>Mis Torneos</h1>
      <div className='torneos-list'>
        
        {misTorneos.map((torneo) => (
          <Torneo
            key={torneo.id} 
            id={torneo.id}
            name={torneo.name} 
            refresh={refresh}
            navigateTo={navigateTo}

            
           
          />
        ))}
      </div>

      <button onClick={() => setCrearTorneoVisible(true)} className='btn-crear-torneo'>+</button>

    
      {isCrearTorneoVisible && (
        <CrearTorneo refresh={refresh} onClose={() => setCrearTorneoVisible(false)} />
      )}
    </div>
  );
}