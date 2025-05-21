import React from 'react';
import './header.css'

const Header = () => {

    return (
       
            <header className="header">
      <div className="header-overlay">
        <div className="header-content">
          <h1 className="site-title">Compefut</h1>
          <nav className="nav">
            <a href="/login"   className="nav-link">Inicio de sesión</a>
            <a  href="/registrar" className="nav-link">Registrarse</a>
          </nav>
        </div>
      </div>
    </header>
        
    );
};

export default Header;