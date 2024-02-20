import { useEffect, useRef } from 'react';
import styles from './bajo2.module.css'

export default function Respuestas({id, fecha, texto, scrollRes}) {

    const respuestaoRef = useRef(null)

    useEffect(() => { scrollRes == id ? respuestaoRef.current.scrollIntoView(/*{behavior: 'instant'}*/) : ''}, [scrollRes])

    return (

        <div ref={respuestaoRef} className={styles.respuesta}>
            <p>Anónimo{id} - <span>{fecha}</span></p>
            <p>{texto}</p>
        </div>
           
    );
}