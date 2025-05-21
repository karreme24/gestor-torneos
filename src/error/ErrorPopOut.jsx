import React from 'react'
import './ErrorPopOut.css'
import errorImg from '../img/error.jpg'

export default function ErrorPopOut({onClose, error}) {
  return (
    <div className='error-overlay'>
        <div className='error-content'>
            <button className='close-btn' onClick={onClose}>x</button>
            <img src={errorImg} alt="Error" className='error-image' />
            <p>{error}</p>
        </div>
    </div>
  )
}
