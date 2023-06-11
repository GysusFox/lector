import React, { useState, useRef } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import './app.css'

import Play from './assets/img/play.svg'
import Stop from './assets/img/pause.svg'
import Resume from './assets/img/resume.svg'

const App = () => {
  const [texto, setTexto] = useState("")
  const [posicion, setPosicion] = useState(0)
  const [posicionSleccionada, setPosicionSeleccionada] = useState(0)

  var mensaje = new SpeechSynthesisUtterance();



  
  const handleSpeak = () => {
    mensaje.text = texto;
    mensaje.lang = 'es-ES';
    mensaje.addEventListener('boundary', (event) => {
      const { charIndex } = event;
      setPosicion(charIndex)
      console.log('Posición actual:', charIndex);
    });
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(mensaje)

    } else {
      console.log('Este navegador no acepta este servicio')
    }
  };

  const handlePause = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    } else {
      console.log('Este navegador no acepta este servicio')
    }
  };

  const handleResume = () => {
    var nuevoMensaje = new SpeechSynthesisUtterance();
    if ('speechSynthesis' in window) {
      console.log(texto.slice(posicion))
      nuevoMensaje.text = texto.slice(posicion);
      nuevoMensaje.lang = 'es-ES';
      nuevoMensaje.addEventListener('boundary', (event) => {
        const { charIndex } = event;
        setPosicion(posicion + charIndex)
      });
      if ('speechSynthesis' in window) {
        window.speechSynthesis.speak(nuevoMensaje);
  
      } else {
        console.log('Este navegador no acepta este servicio')
      }
    }
  };

  const handleResumeOfPosition = () => {
    var mensajeWithPosition = new SpeechSynthesisUtterance();
    if ('speechSynthesis' in window) {
      mensajeWithPosition.text = texto.slice(posicionSleccionada);
      mensajeWithPosition.lang = 'es-ES';
      if ('speechSynthesis' in window) {
        window.speechSynthesis.speak(mensajeWithPosition);
  
      } else {
        console.log('Este navegador no acepta este servicio')
      }
    }
  };

  const textareaRef = useRef(null);

  const handleSelectionChange = () => {
    if (textareaRef.current) {
      const selectionStart = textareaRef.current.selectionStart;
      console.log('Posición seleccionada:', selectionStart);
      setPosicionSeleccionada(selectionStart)
    }
  };

  return (
    <div className='Content'>
      <div className='Container'>
        <div className='ContentInputText'>
          <textarea ref={textareaRef} value={texto} onChange={(value) => setTexto(value.target.value)} onSelect={handleSelectionChange} ></textarea>
          <p>Posición del narrador en el texto: {posicion}</p>
          <p>Posición seleccionada: {posicionSleccionada}</p>
        </div>
        <div className='ContentSpeech'>
          <div className='ContentButtons'>
            <button onClick={handleSpeak}><img alt='' src={Play} /></button>
            <button onClick={handlePause}><img alt='' src={Stop} /></button>
            <button onClick={handleResume}><img alt='' src={Resume} /></button>
          </div>
          <div className='ContentMoreButtons'>
            <button onClick={handleResumeOfPosition} >Comenzar desde la ubicacion seleccionada</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App