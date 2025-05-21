import React from 'react'
import './Jornadas.css'
import Partido from './partido'

export default function jornada({jornada,numJornada}) {
  return (
    
    <div className='jornada-card'>
      <h3 className="jornada-titulo">Jornada {numJornada}</h3>
      <div className="partidos-container">
      {jornada.map((partido) => (
                <Partido key={partido.id} 
                partido={partido}
                
                />
              ))}
      </div>

    </div>
  )
}
