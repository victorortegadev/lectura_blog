'use client'
import { useRouter} from "next/navigation";
import { /*useEffect,*/ useRef, useState} from "react";
import Bajo2 from './bajo2'
//import { useQuill } from "react-quilljs"

import styles from './articulo.module.css'
import './articulo.css'

import stylesLeer from './articuloLeer.module.css'

export default function ArticuloLeer({titulo, textoplanovisible, id, fecha, listadoComentariosProp}) {

    const router = useRouter()

    /*const {quill, quillRef} = useQuill({
        modules: { toolbar: false },
        readOnly: true
    })*/
    const quillRef = useRef(null)
    
    //useEffect(() => { quill && texto? quill.setContents(JSON.parse(texto)) : '' }, [quill? quill : '', texto])


    return (
        <article className={`${styles.article} ${stylesLeer.article_leer}`}>
            <div className={styles.post}>
                <div className={stylesLeer.nota_leer}>
                    <h3 onClick={() => {router.push(`/leermas/${id}`)}} className={stylesLeer.h3}> {titulo} </h3>
                    <button className={styles.button}> icono </button>
                    <a onClick={() => {router.push('/leermas')}} className={styles.fecha} >{!fecha ? 'no fecha' : fecha}</a>
                    <div className={stylesLeer.texto}>

                    <div ref={quillRef} >
                        {textoplanovisible}
                    </div>

                    </div>
                </div>
                    <Bajo2 clave={id} listadoComentariosProp2={listadoComentariosProp}/>
            </div>
        </article>   
    );
}