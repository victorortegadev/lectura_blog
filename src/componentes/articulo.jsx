'use client'
import { useRouter} from "next/navigation";
import { useEffect, useRef } from "react";
import styles from './articulo.module.css'
import Bajo1 from './bajo1'
import Bajo2 from './bajo2'

import { useQuill } from "react-quilljs"
import './articulo.css'

//import 'quill/dist/quill.snow.css'

export default function Articulo({tipoDeBajo, titulo, texto, id, fecha, textoplano, textoplanovisible}) {

    let bajo = tipoDeBajo == 'bajo1'? <Bajo1 id = {id}/> : <Bajo2 clave={id}/>
    let h3B = tipoDeBajo == 'bajo1'? styles.h3B1 : styles.h3B2
    let textoB = tipoDeBajo == 'bajo1'? styles.textoB1 : styles.textoB2

    const router = useRouter()

    const {quill, quillRef} = useQuill({
        modules: { toolbar: false },
        readOnly: true
    })

    const alturaRef = useRef(null)
    const textoPost = useRef(null)
    
    useEffect(() => { quill && texto? quill.setContents(JSON.parse(texto)) : '' }, [quill? quill : '', texto])

    return (
        <article className={styles.article}>
            <div className={styles.post}>
                <h3 onClick={() => {router.push(`/leermas/${id}`)}} className={h3B}> {titulo} </h3>
                <button className={styles.button}> icono </button>
                <a onClick={() => {router.push('/leermas')}} className={styles.fecha} >{!fecha ? 'no fecha' : fecha}</a>
                <div ref={textoPost} className={textoB}>

                  <div className={ tipoDeBajo == 'bajo1'? styles.quillRef : ''} ref={tipoDeBajo == 'bajo1'? alturaRef : quillRef} >
                    {tipoDeBajo == 'bajo1'? textoplanovisible : ''}
                  </div>

                    <p  style={{display: tipoDeBajo == 'bajo1' && alturaRef.current && textoPost.current? alturaRef.current.clientHeight > textoPost.current.clientHeight? 'block' : 'none' : 'none' }}
                        onClick={() => {router.push(`/leermas/${id}`)}} 
                        className={styles.puntos}
                    >
                    </p>
                </div>
                {bajo}
            </div>
        </article>   
    );
}