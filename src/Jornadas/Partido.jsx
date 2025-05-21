import React, { useState } from 'react'
import './Jornadas.css'
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Partido({partido}) {
  const [GolLocal, setGolLocal] = useState(partido.golLocal);
  const [GolVisita, setGolVisita] = useState(partido.golVisita);
  
  

  const actualizarEquipos = async () => {
    console.log("estado en db= ",partido.estado)
    // Determinar el nuevo estado
    let nuevoEstado = 0;
    if (GolLocal > GolVisita) {
      nuevoEstado = 1;
    } else if (GolVisita > GolLocal) {
      nuevoEstado = 2;
    } else {
      nuevoEstado = 3;
    }

    const localRef = doc(db,"equipos",partido.local);
    const visitaRef = doc(db,"equipos",partido.visita)

    const equipoLocalSnap = await getDoc(localRef);
    const equipoVisitaSnap = await getDoc(visitaRef);
    const equipoLocal = equipoLocalSnap.data();
    const equipoVisita = equipoVisitaSnap.data();

    
    
    
 
  
    
    try {
     





       // Actualizar partido

      console.log(partido.id);
      const partidoRef = doc(db, "partidos", partido.id);
      await updateDoc(partidoRef, {
        golLocal: Number(GolLocal),
        golVisita: Number(GolVisita),
        estado: 1
      });
      console.log("actualizado correctamente");



      //actualizar los resultado 
      if (GolLocal > GolVisita) {

        await updateDoc(localRef,{
          v:increment(1),
          pj:increment(1),
          gf:increment(GolLocal),
          gc:increment(GolVisita)
        });

        
        await updateDoc(visitaRef,{

          d:increment(1),
          pj:increment(1),
          gf:increment(GolVisita),
          gc:increment(GolLocal)
        })


      } else if (GolVisita > GolLocal) {

        await updateDoc(visitaRef,{
          v:increment(1),
          pj:increment(1),
          gf:increment(GolVisita),
          gc:increment(GolLocal)
        });

        await updateDoc(localRef,{
          d:increment(1),
          pj:increment(1),
          gf:increment(GolLocal),
          gc:increment(GolVisita)
        });
      } else {

        await updateDoc(localRef,{
          e:increment(1),
          pj:increment(1),
          gf:increment(GolLocal),
          gc:increment(GolVisita)
        })
        await updateDoc(visitaRef,{
          e:increment(1),
          pj:increment(1),
          gf:increment(GolVisita),
          gc:increment(GolLocal)
        }) 
      }

   


      
    } catch (error) {
      console.log(error);
    }








    window.location.reload();
  }

  return (
    <div className='partido-card'>
        <div className="equipo local">
          <h3>{partido.localName}</h3>
          {partido.estado===0 ?<input type="number" 
          value={GolLocal} 
          onChange={(e) => setGolLocal(e.target.value)} 
          className='goles'/>:<h3>{partido.golLocal}</h3> }
          </div>
                  <div className="vs">-</div>
                  <div className="equipo visita">
                  {partido.estado===0 ?<input type="number" 
                  value={GolVisita} 
                  onChange={(e) => setGolVisita(e.target.value)} 
                  className='goles'/>:<h3>{partido.golVisita}</h3>}
                    <h3>{partido.visitaName}</h3>
                    </div>
        {partido.estado === 0 ?<button onClick={actualizarEquipos}>Guardar</button>:null}
    </div>
  )
}