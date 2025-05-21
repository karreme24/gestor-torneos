import React, { useEffect, useState } from 'react';
import './Home.css';
import { useIDSelectTorneo } from '../context/TorneosContex';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Home() {
  const { IDSelectTorneo } = useIDSelectTorneo();
  const [misEquipos, setMisEquipos] = useState([]);
  const [equiposOrdenados, setEquiposOrdenados] = useState([]);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const collectionRef = collection(db, 'equipos'); // Corregido error tipográfico
        const q = query(collectionRef, where('torneoID', '==', IDSelectTorneo));
        const equiposSnap = await getDocs(q);
        const equiposData = [];

        equiposSnap.forEach((equipo) => {
          const data = equipo.data(); // Definir `data` correctamente
          

          // Calculamos la diferencia de goles
          
          const df = (data.gf || 0) - (data.gc || 0);
          const pts = ((data.v || 0) * 3) + (data.e || 0); // Ahora usamos `data.v` y `data.e` correctamente

          equiposData.push({ 
            id: equipo.id, 
            ...data,
            df: df,
            pts: pts
          });
        });

        setMisEquipos(equiposData);
      } catch (error) {
        console.error("Error al obtener equipos:", error);
      }
    };
    
    fetchPartidos();
  }, [IDSelectTorneo]); 

  useEffect(() => {
    if (misEquipos.length > 0) {
      const ordenados = [...misEquipos].sort((a, b) => {
        if (b.pts !== a.pts) {
          return b.pts - a.pts;
        }
        return b.df - a.df;
      });
      setEquiposOrdenados(ordenados);
    }
  }, [misEquipos]);

  return (
    <div className="standings-container">
      {equiposOrdenados.length > 0 ? (
        <div className="standings-card">
          <div className="standings-header">
            <h2 className="standings-title">Tabla de Posiciones</h2>
          </div>
          <div className="standings-content">
            <div className="table-container">
              <table className="standings-table">
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Equipo</th>
                    <th className="text-center">PJ</th>
                    <th className="text-center">PTS</th>
                    <th className="text-center">GF</th>
                    <th className="text-center">GC</th>
                    <th className="text-center">DG</th>
                  </tr>
                </thead>
                <tbody>
                  {equiposOrdenados.map((equipo, index) => (
                    <tr key={equipo.id}>
                      <td className="font-medium">{index + 1}</td>
                      <td>{equipo.name}</td>
                      <td className="text-center">{equipo.pj || 0}</td>
                      <td className="text-center font-medium">{equipo.pts || 0}</td>
                      <td className="text-center">{equipo.gf || 0}</td>
                      <td className="text-center">{equipo.gc || 0}</td>
                      <td className="text-center">
                        <span className={equipo.df > 0 ? 'positive-diff' : equipo.df < 0 ? 'negative-diff' : ''}>
                          {equipo.df > 0 ? '+' : ''}{equipo.df}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-equipos-message">
          <p>No hay equipos registrados en el troneos.</p>
          
        </div>
      )}
    </div>
  );
}
