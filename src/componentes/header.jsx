'use client'
import {useState } from 'react'
import styles from './header1.module.css'
import styles2 from './header2.module.css'
import Buscador from './buscador'
import { useRouter } from 'next/navigation'

export default function Header({tipoEstilo}) {

  const router = useRouter()

  let estilo = tipoEstilo == 'styles1' ? styles : styles2

  const [abrir, setAbrir] = useState(false)

  return (
    <header className={estilo.header}>  
      <div className={estilo.navbar}>
        <div className={estilo.div_s1}> 
          <div className={styles.div_icon_tres_flecha} onClick={()=> {router.push('/')}}>
            <svg className={styles.icon_tres_flecha} focusable="false" viewBox="0 0 24 24">
              <path d= { tipoEstilo == 'styles1' ? "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" : "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}>
              </path>
            </svg>
          </div>

         {tipoEstilo == 'styles1' ? <Buscador  abrirProp= {[abrir, setAbrir]}/> : '' }

        </div>
        <h1 className={`${estilo.h1} ${abrir?  estilo.desaparecer : ''}`}> Titulo del blog </h1>

        {tipoEstilo != 'styles1' ? <Buscador  abrirProp= {[abrir, setAbrir]}/> : '' }

      </div>
    </header>
  );
}