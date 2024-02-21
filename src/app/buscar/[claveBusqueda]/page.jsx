'use client'
import ArticuloPrincipal from "@/componentes/articuloPrincipal";
import Header from "@/componentes/header";
import { useEffect, useState } from "react";

export default function Leerid(props) {

    const [encontrado, setEncontrado] = useState([])

    async function  buscarEntradas (claveBusqueda) { 
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/buscarEntradas/${claveBusqueda}`)
      
        const resultado = await response.json()
        return resultado 
    }

    useEffect(() => {buscarEntradas(props.params.claveBusqueda).then((data)=>   setEncontrado(data) )}, [] )
  return (
    <>
      <Header  tipoEstilo={'styles1'}/>
      <main >
        {encontrado.map((entrada) => <ArticuloPrincipal key={entrada.id} {...entrada}  /> ) }
      </main>
    </>
)
}
