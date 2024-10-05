'use client'
import {useRef, useState } from 'react'
import styles from './header1.module.css'
import styles2 from './header2.module.css'
import Buscador from './buscador'
import { useRouter } from 'next/navigation'
import redireccionar from './redireccionar.png'

export default function Header({tipoEstilo}) {

  const router = useRouter()

  let estilo = tipoEstilo == 'styles1' ? styles : styles2

  const [abrir, setAbrir] = useState(false)
  const divIconRef = useRef(null)
  const [animacionExpansion, setAnimacionExpansion] = useState({})

  const [animacionBarra, setAnimacionBarra] = useState('')
  const barraIconRef = useRef(null)
  const [animacionExpansionBarra, setAnimacionExpansionBarra] = useState({})

  function porcentajeClick (e, n, estadoAnimacion) {
    let porcentajeX = (( Math.floor(e.clientX) - Math.floor(n.getBoundingClientRect().x)) * 100) / (n.getBoundingClientRect().width )
    let porcentajeY = (( Math.floor(e.clientY) - Math.floor(n.getBoundingClientRect().y)) * 100) / (n.getBoundingClientRect().height -1)
    
    estadoAnimacion({  animation: ''})
    estadoAnimacion(
      {
        left: `${porcentajeX}%`,
        top: `${porcentajeY}%`,
        animation: 'header1_expansivo__93RU_ .3s'
      }
    )

    return (
        `pocentajeX= ${porcentajeX},  porcentajeY= ${porcentajeY}`
    )
  }
  

  return (
    <header>  
      <div className={estilo.navbar}>
        <div className={estilo.div_s1}> 
          <div 
            className={styles.div_icon_tres_flecha} 
            ref={divIconRef} 
            onClick={()=> {tipoEstilo == 'styles1'? setAnimacionBarra('salir') : router.push('/')}} 
            onMouseDown={(e)=> {
              porcentajeClick(e, divIconRef.current, setAnimacionExpansion)
              setTimeout(()=> {setAnimacionExpansion({animation:''})}, 300)
            }} 
          >
            <svg className={styles.icon_tres_flecha} focusable="false" viewBox="0 0 24 24">
              <path d= { tipoEstilo == 'styles1' ? "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" : "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}>
              </path>
            </svg>       
            <div className={styles.efecto_icon} style={animacionExpansion}/>
          </div>

         {tipoEstilo == 'styles1' ? <Buscador  abrirProp= {[abrir, setAbrir]}/> : '' }

        </div>
        <h1 className={`${estilo.h1} ${abrir?  estilo.desaparecer : ''}`}> Mi primer blog </h1>

        {tipoEstilo != 'styles1' ? <Buscador  abrirProp= {[abrir, setAbrir]}/> : '' }

      </div>

      <div className={`${styles.barra_lateral} ${animacionBarra == 'salir'? styles.barra_salir :
        animacionBarra == 'entrar'? styles.barra_entrar : ''}`}
      >
         <div 
            className={`${styles.div_icon_tres_flecha} ${styles.barra_icon}`}
            ref={barraIconRef}
            onClick={()=> setAnimacionBarra('entrar')} 
            onMouseDown={(e)=> {
              porcentajeClick(e, barraIconRef.current, setAnimacionExpansionBarra)
              setTimeout(()=> {setAnimacionExpansionBarra({animation:''})}, 300)
            }} 
          >
            <svg className={`${styles.icon_tres_flecha} ${styles.barra_icon_tres_flecha}`} focusable="false" viewBox="0 0 24 24">
              <path d= {"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}>
              </path>
            </svg>       
            <div className={`${styles.efecto_icon} ${styles.barra_efecto_icon}`} style={animacionExpansionBarra}/>
          </div>  
          <div className={styles.div_enlace}>
            <a className={styles.div_a_enlace} href={process.env.NEXT_PUBLIC_URL_CONFIGURADOR} target="_blank" > <div className={styles.div_redireccionar}><img className={styles.redireccionar} src= {redireccionar.src}></img></div> <p>Editar blog</p> </a> 
          </div>    
      </div>
      <div 
        className={styles.cubierta_barra} 
        style={{display:animacionBarra == 'salir'? 'block' : 'none'}}
        onClick={()=> setAnimacionBarra('entrar')} 
      >
      </div>
    </header>
  );
}
