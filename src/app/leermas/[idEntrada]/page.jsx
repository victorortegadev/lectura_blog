'use client'
import ArticuloLeer from "@/componentes/articuloLeer";
import Header from "@/componentes/header";
import { useEffect, useState } from "react";
import styles from "./pageLeermas.module.css"

export default function Leerid(props) {

  async function  pedirEntrada (id) { 
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/entrada/${id}`)
  
    const entradaRespuesta = await response.json()
    return entradaRespuesta 
  }

  const [entrada, setEntrada] = useState();
  useEffect(()=> {pedirEntrada(props.params.idEntrada).then(entradaRespuesta => setEntrada(entradaRespuesta)) },[]) 
  

  return (
    <>
      <Header tipoEstilo={'styles2'}/>
      <div  style={{display:entrada? 'block' : 'none'}}>
        <main>
          { <ArticuloLeer {...entrada}/> }
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