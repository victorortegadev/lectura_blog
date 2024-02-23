'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './bajo2.module.css'
import Comentario from './comentario'

export default function Bajo2({clave, listadoComentariosProp2}) {

    const [listadoCS, setListadoCS] = useState([])
    const textoCRef = useRef(null)
    const [nuevoComentario, setNuevoComentario] = useState(false)

    const [scrollCom, setScrollCom] = useState('')
    const [publicar2Iniciado, setPublicar2Iniciado] = useState(false)

    const [ focusTextareaBajo2, setFocusTextareaBajo2] = useState(false)

    const [focusTextareaComentario, setFocusTextareaComentario] = useState(false)

  /*  async function  pedirComentarios(clave) { 
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/comentarios/${clave}`)
      
        const comentarios = await response.json()
        return comentarios
    }*/
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

   // useEffect(()=> { clave? pedirComentarios(clave).then( comentarios=> {setListadoCS(comentarios); setNuevoComentario(false)}) : ''}, [nuevoComentario, clave])

    useEffect(() => {if(publicar2Iniciado && listadoCS.length > 0){ setScrollCom(listadoCS[listadoCS.length - 1].id ) }}, [listadoCS])
    
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
//{listadoComentariosProp2.map((comentario) =>  { return <Comentario key={comentario.id} focusTextareaComentarioProp= {[focusTextareaComentario, setFocusTextareaComentario]} focusTextareaBajo2Prop= {[focusTextareaBajo2, setFocusTextareaBajo2]} scrollCom={scrollCom} {...comentario} idcomentarioP= {[idcomentario, setIdComentario]} clave={clave}/>} ) }
    return (
        <section style={{borderTop:listadoCS.length > 0? 'dotted grey' : ''}} className={styles.section}>
            <div className={styles.listadoC}>

            { listadoComentariosProp2 == undefined?'' : listadoComentariosProp2.map((comentario) =>  { return <Comentario key={comentario.id} focusTextareaComentarioProp= {[focusTextareaComentario, setFocusTextareaComentario]} focusTextareaBajo2Prop= {[focusTextareaBajo2, setFocusTextareaBajo2]} scrollCom={scrollCom} {...comentario} idcomentarioP= {[idcomentario, setIdComentario]} clave={clave}/>} ) }
               
            </div>
            <div className={`${styles.caja} ${styles.caja_bajo2}`}>
                <div className={styles.div_img}>
                    <img className={styles.img} src='https://resources.blogblog.com/img/anon36.png'/>
                </div>
                
                <div className={styles.div_text_btpublicar}>
                    <div 
                        style={{display:  focusTextareaBajo2? 'block' : 'none'}} 
                        className={styles.relleno}
                    >
                    </div>
                    <textarea onFocus={()=> { setFocusTextareaComentario(false), setFocusTextareaBajo2(true)} } rows="1" ref={textoCRef} className={styles.text}>
                    </textarea>
                    <button 
                         style={{display: focusTextareaBajo2? 'block' : 'none'}} 
                        onClick={()=> {
                                if (textoCRef.current.value != '' )
                                {
                                    crearCometario(
                                        {
                                            texto: textoCRef.current.value,
                                            fecha: obtenerFecha(),
                                            clave_entrada: clave
                                        }
                                    ) 
                                    textoCRef.current.value = ''
                                    setPublicar2Iniciado(true)
                                    setNuevoComentario(true)

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