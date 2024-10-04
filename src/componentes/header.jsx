'use client'
import {useRef, useState } from 'react'
import styles from './header1.module.css'
import styles2 from './header2.module.css'
import Buscador from './buscador'
import { useRouter } from 'next/navigation'

export default function Header({tipoEstilo}) {

  const router = useRouter()

  let estilo = tipoEstilo == 'styles1' ? styles : styles2

  const [abrir, setAbrir] = useState(false)
  const divIconRef = useRef(null)
  const [animacionExpansion, setAnimacionExpansion] = useState({})

  function porcentajeClick (e, n) {
    let porcentajeX = (( Math.floor(e.clientX) - Math.floor(n.getBoundingClientRect().x)) * 100) / (n.getBoundingClientRect().width )
    let porcentajeY = (( Math.floor(e.clientY) - Math.floor(n.getBoundingClientRect().y)) * 100) / (n.getBoundingClientRect().height -1)
    
    setAnimacionExpansion({  animation: ''})
    setAnimacionExpansion(
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
            onClick={()=> {router.push('/')}} 
            onMouseDown={(e)=> {
              console.log (porcentajeClick(e, divIconRef.current)) 
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
    </header>
  );
}
