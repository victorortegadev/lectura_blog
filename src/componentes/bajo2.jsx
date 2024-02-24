'use client'
import {useRef, useState } from 'react'
import styles from './bajo2.module.css'
import Comentario from './comentario'

export default function Bajo2({clave, listadoComentariosProp2}) {

    const [listadoComentarios, setListadoComentarios] = listadoComentariosProp2 
    const textoCRef = useRef(null)

    const [scrollCom, setScrollCom] = useState('')

    const [ focusTextarea, setFocusTextarea] = useState(false)

   // const [focusTextareaComentario, setFocusTextareaComentario] = useState(false)

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
    
    const [idcomentario, setIdComentario] = useState('')

    const obtenerFecha = ()=> {

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
        <section style={{borderTop: {if(listadoComentarios){listadoComentarios.length > 0? 'dotted grey' : ''}} }} className={styles.section}>
            <div className={styles.listadoC}>

                { listadoComentarios == undefined?'' : listadoComentarios.map((comentario) =>  { return <Comentario key={comentario.id} focusTextareaProp= {[focusTextarea, setFocusTextarea]} scrollCom={scrollCom} {...comentario} idcomentarioP= {[idcomentario, setIdComentario]} clave={clave}/>} ) }
               
            </div>
            <div className={`${styles.caja} ${styles.caja_bajo2}`}>
                <div className={styles.div_img}>
                    <img className={styles.img} src='https://resources.blogblog.com/img/anon36.png'/>
                </div>
                
                <div className={styles.div_text_btpublicar}>
                    <div 
                        style={{display:  focusTextarea == 'focus comentario'? 'block' : 'none'}} 
                        className={styles.relleno}
                    >
                    </div>
                    <textarea onFocus={()=> { setFocusTextarea('focus comentario')} } rows="1" ref={textoCRef} className={styles.text}>
                    </textarea>
                    <button 
                        style={{display: focusTextarea == 'focus comentario'? 'block' : 'none'}} 
                        onClick={()=> {
                                if (textoCRef.current.value != '' )
                                {
                                    crearCometario(
                                        {
                                            texto: textoCRef.current.value,
                                            fecha: obtenerFecha(),
                                            clave_entrada: clave
                                        }
                                    ).then( nuevoComentario => { setListadoComentarios([...listadoComentarios, nuevoComentario ]); setScrollCom(nuevoComentario.id) })
                                    textoCRef.current.value = ''
                                }
                            }
                        } 
                        className={styles.publicar}
                    >
                        publicar
                    </button>
                </div>
            </div>
        </section>
    );
}