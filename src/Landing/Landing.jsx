import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
import { useAuth } from '../context/aunthContext';
import Header from './Header';
import ComoFunciona from './ComoFunciona';

export default function Landing() {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    useEffect(() => {
        console.log(user);
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = () => {
        if (user != null) {
            navigate('/torneos');
        } else {
            navigate('/login');
        }
    };

    const scrollToComoFunciona = () => {
        const comoFuncionaSection = document.getElementById('como-funciona-section');
        if (comoFuncionaSection) {
            comoFuncionaSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Header />
            <div className='landing'>
                <h1 className='titulo'>Crea Y Gestiona Tus Propios Torneos</h1>
                <div className='landing-buttons'>
                    <button onClick={handleLogin} className='login-button'>Comenzar</button>
                    <button onClick={scrollToComoFunciona} className='como-funciona-button'>Cómo Funciona</button>
                </div>
            </div>
            
            <div id="como-funciona-section">
                <ComoFunciona />
            </div>
        </>
    );
}