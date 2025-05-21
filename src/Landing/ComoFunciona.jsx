import React, { useRef } from 'react';
import './ComoFunciona.css';
import torneosImg from '../img/torneos.png'
import equiposImg from '../img/equipos.png';
import jornadasImg from '../img/jornadas.png';

const ComoFunciona = () => {
  // Referencias para las secciones
  const torneosRef = useRef(null);
  const equiposRef = useRef(null);
  const jornadasRef = useRef(null);

  // Función para scroll suave a cada sección
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 80, // Ajusta según el tamaño de tu navbar
      behavior: 'smooth'
    });
  };

  return (
    <div className="como-funciona-container">
      <h2 className="como-funciona-subtitle">¿Cómo Funciona?</h2>
      
      {/* Barra de navegación de secciones */}
      <div className="seccion-navbar">
        <div 
          className="seccion-item" 
          onClick={() => scrollToSection(torneosRef)}
        >
          Torneos
        </div>
        <div 
          className="seccion-item" 
          onClick={() => scrollToSection(equiposRef)}
        >
          Equipos
        </div>
        <div 
          className="seccion-item" 
          onClick={() => scrollToSection(jornadasRef)}
        >
          Jornadas
        </div>
      </div>

      {/* Contenido de cada sección */}
      <div className="secciones-contenido">
        {/* Sección Torneos */}
        <div ref={torneosRef} className="seccion">
          <h3 className="seccion-title">Torneos</h3>
          <div className="seccion-content">
            <div className="seccion-text">
              <p>
                Los torneos son la base de nuestra plataforma. Desde esta pantalla, 
                los administradores pueden crear, seleccionar y eliminar torneos de forma sencilla e intuitiva.
                La creación de un torneo se realiza a través del botón “+”, donde se ingresa un nombre identificador
                y se confirma la acción presionando Enter o seleccionando el botón Guardar.
              </p>
              <p>
                Una vez creado, cada torneo mantiene su propia estructura de gestión, permitiendo centralizar toda la 
                operación competitiva desde un único punto de control. Esta pantalla está diseñada para ofrecer una 
                experiencia fluida en la administración de múltiples competencias, optimizando tiempos y reduciendo 
                errores operativos.
              </p>
            </div>
            <div className="seccion-image">
              <img 
                src={torneosImg}
                alt="Interfaz de torneos" 
                className="demo-image"
              />
            </div>
          </div>
        </div>

        {/* Sección Equipos */}
        <div ref={equiposRef} className="seccion">
          <h3 className="seccion-title">Equipos</h3>
          <div className="seccion-content">
            <div className="seccion-text">
              <p>
                La sección de Equipos ofrece una gestión integral de los participantes. Desde aquí, 
                los usuarios pueden crear nuevos equipos, visualizar información general y eliminarlos según sea necesario.
                El proceso de creación se inicia mediante el botón “+”, 
                donde se introduce el nombre del equipo y se procede a guardar la información.
              </p>
              <p>
                Cada equipo cuenta con su propio espacio dentro del sistema, 
                permitiendo visualizar datos clave que facilitan el seguimiento y control 
                organizativo. Esta funcionalidad es fundamental para mantener una base de datos clara y
                 estructurada de todos los actores involucrados en los torneos.
              </p>
            </div>
            <div className="seccion-image">
              <img 
                src={equiposImg}
                alt="Gestión de equipos" 
                className="demo-image"
              />
            </div>
          </div>
        </div>

        {/* Sección Jornadas */}
        <div ref={jornadasRef} className="seccion">
          <h3 className="seccion-title">Jornadas</h3>
          <div className="seccion-content">
            <div className="seccion-text">
              <p>
                La pantalla de Jornadas automatiza la planificación y el desarrollo 
                del torneo. Al iniciar un torneo, el sistema genera automáticamente el 
                calendario de enfrentamientos, definiendo qué equipos se enfrentarán, 
                en qué orden y en qué jornada.
              </p>
              <p>
                Además, esta sección permite ingresar y registrar los resultados de cada partido, 
                lo que garantiza una actualización en tiempo real de las clasificaciones y estadísticas 
                generales. Esta funcionalidad elimina la necesidad de programaciones manuales, asegurando 
                un flujo competitivo justo, ordenado y eficiente.
              </p>
            </div>
            <div className="seccion-image">
              <img 
                src={jornadasImg}
                alt="Calendario de jornadas" 
                className="demo-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona;