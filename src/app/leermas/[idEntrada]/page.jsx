'use client'
import ArticuloLeer from "@/componentes/articuloLeer";
import Header from "@/componentes/header";
import { useEffect, useState } from "react";

import styles from './leerid.module.css'


export default function Leerid(props) {

  async function  pedirEntrada (id) { 
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/entrada/${id}`)
  
    const entrada = await response.json()
    return entrada 
  }

  const [entrada, setEntrada] = useState();
  useEffect(()=> {pedirEntrada(props.params.idEntrada).then(entrada2 => setEntrada(entrada2)) },[]) 
  

  return (
    <>
      <Header tipoEstilo={'styles2'}/>
      <main className={styles.main}>
        { <ArticuloLeer {...entrada}/> }
      </main>
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