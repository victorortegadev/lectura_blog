'use client'
import { useRouter} from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Bajo1 from './bajo1'

import './articulo.css'
import styles from './articulo.module.css'

import stylesPrincipal from './articuloPrincipal.module.css'

export default function ArticuloPrincipal({titulo, id, fecha, textoplanovisible, ultimoArticuloProp}) {

    const router = useRouter()

    const alturaRef = useRef(null)
    const textoPost = useRef(null)

    const [numeroComentarios, setNumeroComentarios]  = useState('')

    async function  pedirNumeroDeComentarios(id) { 
        const response = await fetch(`http://localhost:3001/api/comentarios/numero/${id}`)
      
        const numeroComentarios = await response.json()
        return numeroComentarios
    }

    useEffect(()=> {pedirNumeroDeComentarios(id).then((n)=> {setNumeroComentarios(n[0].count) }), []})

    return (
        <article  className={styles.article} style={{marginBottom:  ultimoArticuloProp == 'ultimoArticulo'? '' : '1rem'}} >
            <div className={styles.post}>
                <h3 onClick={() => {router.push(`/leermas/${id}`)}} className={stylesPrincipal.h3}> {titulo} </h3>
                <button className={styles.button}> icono </button>
                <a /*onClick={() => {router.push('/leermas')}}*/ className={styles.fecha} >{!fecha ? 'no fecha' : fecha}</a>
                <div ref={textoPost} className={stylesPrincipal.texto}>

                  <div className={stylesPrincipal.quill} ref={alturaRef} >
                    {textoplanovisible}
                  </div>

                    <p  style={{display: alturaRef.current && textoPost.current? alturaRef.current.clientHeight > textoPost.current.clientHeight? 'block' : 'none' : 'none'}}
                        onClick={() => {router.push(`/leermas/${id}`)}} 
                        className={styles.puntos}
                    >
                    </p>
                </div>
                <Bajo1 id = {id} numeroProp= {numeroComentarios}/>
            </div>
        </article>   
    );
}