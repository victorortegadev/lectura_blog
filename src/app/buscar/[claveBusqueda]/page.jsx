'use client'
import ArticuloPrincipal from "@/componentes/articuloPrincipal";
import Header from "@/componentes/header";
import { useEffect, useState } from "react";
import styles from "./pageBuscar.module.css"

export default function Leerid(props) {

    const [encontrado, setEncontrado] = useState([])

    async function  buscarEntradas (claveBusqueda) { 
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/buscarEntradas/${claveBusqueda}`)
      
        const resultado = await response.json()
        return resultado 
    }

    useEffect(() => {buscarEntradas(props.params.claveBusqueda).then((data)=>   {setEncontrado(data); } )}, [] )
  return (
    <>
      <Header  tipoEstilo={'styles1'}/>
      <div style={{display:encontrado.length > 0? 'block' : 'none'}}>
        <main >
          {encontrado.map((entrada) => <ArticuloPrincipal key={entrada.id} {...entrada}  /> ) }
        </main>
        <footer className={styles.footer}>
            <p className={styles.footer_p}>Con la tecnología de nextjs</p>
            <h5 className={styles.footer_h5}>Imágenes del tema: <span>Michael Elkan</span> </h5>
        </footer>
      </div>
    </>
)
}
