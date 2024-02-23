'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './bajo2.module.css'
import Respuestas from './respuestas';

export default function Comentario({id, fecha, texto, idcomentarioP, clave, scrollCom, focusTextareaBajo2Prop, focusTextareaComentarioProp}) {

    const [idcomentario, setIdComentario] = idcomentarioP
    const textoCRef = useRef(null)
    const [listaRespuestas, setListaRespuestas] = useState([])
    const [nuevaRespuesta, setNuevaRespuesta] = useState(false)

    const [scrollRes, setScrollRes] = useState('')
    const [publicarIniciado, setPublicarIniciado] = useState(false)

    const comentarioRef = useRef(null)

    const [focusTextareaComentario, setFocusTextareaComentario] = focusTextareaComentarioProp
    const [focusTextareaBajo2, setFocusTextareaBajo2] = focusTextareaBajo2Prop

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


   // useEffect(()=> { id? pedirRespuestas(id).then( (comentarios)=> {setListaRespuestas(comentarios); setNuevaRespuesta(false)} ) : ''}, [nuevaRespuesta, id])

    useEffect(() => {if(publicarIniciado && listaRespuestas.length > 0){ setScrollRes(listaRespuestas[listaRespuestas.length - 1].id ) }}, [listaRespuestas])

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
    //{  listaRespuestas.map((respuesta) => <Respuestas scrollRes={scrollRes}  key={respuesta.id} {...respuesta} /> )}
    return (
        <div ref={comentarioRef}  className={styles.comentario}>
            <div className={styles.cuadro}>
                <div className={styles.nota}>
                    <p>Anónimo{id} - <span>{fecha}</span></p>
                    <p>{texto}</p>
                </div>
                <div  className={listaRespuestas.length > 0 ? styles.respuestas : ''}>

               

                </div>
            </div>
            
                  
            <div style={{display: id == idcomentario? 'grid' : 'none'}} className={ `${styles.caja} ${styles.caja_comentario}`}>
                <div className={styles.div_img}>
                    <img className={styles.img} src='https://resources.blogblog.com/img/anon36.png'/>
                </div>
                
                <div className={styles.div_text_btpublicar}>
                    <div 
                        style={{display:  focusTextareaComentario? 'block' : 'none'}} 
                        className={styles.relleno}
                    >
                    </div>
                    <textarea onFocus={()=> {setFocusTextareaBajo2(false), setFocusTextareaComentario(true) } } rows="1" ref={textoCRef} className={styles.text}>
                    </textarea>
                    <button 
                        style={{display: focusTextareaComentario? 'block' : 'none'}} 
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
                                    ) 
                                    textoCRef.current.value = ''
                                    setIdComentario('') 
                                    setPublicarIniciado(true)
                                    setNuevaRespuesta(true)
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
                onClick={()=> { if(id == idcomentario){setIdComentario('')}else{setIdComentario(id), setFocusTextareaComentario(false), setFocusTextareaBajo2(false)} } } 
                className={styles.responder}
            >
                RESPONDER
            </button>
        </div>
    );
}