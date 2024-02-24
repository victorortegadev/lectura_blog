'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './bajo2.module.css'
import Respuestas from './respuestas';

export default function Comentario({id, fecha, texto, idcomentarioP, clave, scrollCom, focusTextareaProp}) {

    const [idcomentario, setIdComentario] = idcomentarioP
    const textoCRef = useRef(null)
    const [listaRespuestas, setListaRespuestas] = useState([])

    const [scrollRes, setScrollRes] = useState('')

    const comentarioRef = useRef(null)

    const [focusTextarea, setFocusTextarea] = focusTextareaProp

    async function  crearCometario (comentario) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/comentarios/comentario`, 
            {   
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(comentario)
            }
        )
    
        const comentarioCreado = await response.json()
        return comentarioCreado
    }

    async function  pedirRespuestas(clave) { 
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/comentarios/respuestas/${clave}`)
      
        const comentarios = await response.json()
        return comentarios
    }


    useEffect(()=> { id? pedirRespuestas(id).then( (respuestas)=> {setListaRespuestas(respuestas)} ) : ''}, [id])

    useEffect(() => { scrollCom == id ? comentarioRef.current.scrollIntoView(/*{behavior: 'instant'}*/) : ''}, [scrollCom])
 
    const obtenerFecha2 = ()=> {

        const date = new Date()

        const [month, day, year] = [
            new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date()),
            new Date().getDate(),
            new Date().getFullYear(),
        ];
        const [hour, minutes] = [
            new Date().getHours(),
            new Date().getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
        ];

        return(`${day} de ${month} de ${year}, ${hour}:${minutes}`)
    }
    
    return (
        <div ref={comentarioRef}  className={styles.comentario}>
            <div>
                <div className={styles.nota}>
                    <p>Anónimo{id} - <span>{fecha}</span></p>
                    <p>{texto}</p>
                </div>
                <div  className={listaRespuestas.length > 0 ? styles.respuestas : ''}>

                   {  listaRespuestas.map((respuesta) => <Respuestas scrollRes={scrollRes}  key={respuesta.id} {...respuesta} /> )}

                </div>
            </div>
                  
            <div style={{display: id == idcomentario? 'grid' : 'none'}} className={ `${styles.caja} ${styles.caja_comentario}`}>
                <div className={styles.div_img}>
                    <img className={styles.img} src='https://resources.blogblog.com/img/anon36.png'/>
                </div>
                
                <div className={styles.div_text_btpublicar}>
                    <div 
                        style={{display:  focusTextarea == 'focus respuesta'? 'block' : 'none'}} 
                        className={styles.relleno}
                    >
                    </div>
                    <textarea onFocus={()=> {setFocusTextarea('focus respuesta') } } rows="1" ref={textoCRef} className={styles.text}>
                    </textarea>
                    <button 
                        style={{display: focusTextarea == 'focus respuesta'? 'block' : 'none'}} 
                        onClick={()=> {
                                if (textoCRef.current.value != '' )
                                {
                                    crearCometario(
                                        {
                                            texto: textoCRef.current.value,
                                            fecha:  obtenerFecha2(),
                                            clave_entrada: clave,
                                            clave_respuesta: id
                                        }
                                    ).then( nuevoRespuesta => { setListaRespuestas([...listaRespuestas, nuevoRespuesta ]); setScrollRes(nuevoRespuesta.id)}) 
                                    textoCRef.current.value = ''
                                    setIdComentario('') 
                                }
                            
                            }
                        } 
                        className={styles.publicar}
                    >
                        publicar
                    </button>
                </div>
            </div>

            <button 
                onClick={()=> { 
                        if(id == idcomentario) {setIdComentario('')} 
                        else{setIdComentario(id), setFocusTextarea(false)} 
                    } 
                } 
                className={styles.responder}
            >
                RESPONDER
            </button>
        </div>
    );
}