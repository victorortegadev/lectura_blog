'use client'
import ArticuloLeer from "@/componentes/articuloLeer";
import Header from "@/componentes/header";
import { useEffect, useState } from "react";
import styles from "./pageLeermas.module.css"

export default function Leerid(props) {

  const [entrada, setEntrada] = useState();
  const [listadoComentarios, setListadoComentarios] = useState()

  async function  pedirEntrada (id) { 
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/entrada/${id}`)
  
    const entradaRespuesta = await response.json()
    return entradaRespuesta 
  }
  async function  pedirComentarios(id) { 
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comentarios/${id}`)
  
    const comentarios = await response.json()
    return comentarios
}

useEffect(()=> {pedirEntrada(props.params.idEntrada).then(entradaRespuesta => setEntrada(entradaRespuesta)) },[]) 

useEffect(()=> {pedirComentarios(props.params.idEntrada).then( comentarios=> {setListadoComentarios(comentarios)}) }, [])

  return (
    <>
      <Header tipoEstilo={'styles2'}/>
      <div  style={{display:entrada && listadoComentarios? 'block' : 'none'}}>
        <main>
          <ArticuloLeer {...entrada} listadoComentariosProp= {[listadoComentarios, setListadoComentarios] } /> 
        </main>
        <footer className={styles.footer}>
            <p className={styles.footer_p}>Con la tecnología de nextjs</p>
            <h5 className={styles.footer_h5}>Imágenes del tema: <span>Michael Elkan</span> </h5>
        </footer>
      </div>
    </>
  );
}
/*
        <div style={{border:'solid greenyellow'}}>

          <p style={{border:'solid blue', padding: '.5rem'}} >Entradas populares de este blog</p>

          <div style={{border:'solid red'}}>
            <Articulo tipoDeBajo={'bajo1'} {...entrada}/>
          </div>

        </div>
*/