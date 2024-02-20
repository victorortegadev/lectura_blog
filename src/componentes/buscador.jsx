'use client'
import {useRef} from 'react'
import { useRouter } from 'next/navigation'
import styles2 from './buscador.module.css'

export default function Buscador({abrirProp}) {

    const router = useRouter()
    
    const [abrir, setAbrir] = abrirProp
    const buscadorRef = useRef(null)

    return (
      <>
      <div style={{display:abrir? 'block' : 'none'}}  onClick={()=> { setAbrir(false)}} className={styles2.detector_clicks}></div>
      <div  
          onClick={() => {if(!abrir) {setAbrir(true), buscadorRef.current.focus()} }} 
          className={`${styles2.div_capa2_buscador} no_cerrar`} 
          style={{width: !abrir? 'calc(1.7rem)' :'calc(100%)', cursor: abrir? 'default' : 'pointer'}} 
      >
        <div className={`${styles2.div_buscador} no_cerrar`}>
          <div className={styles2.div_icon_buscador}>
            <div className={`${styles2.icon_buscador} no_cerrar`}>
              <svg className={`no_cerrar`} focusable="false" viewBox="0 0 24 24">
                <path className='no_cerrar' d= { "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}>
                </path>
              </svg>
            </div>
          </div>
          <div  className= {`${styles2.div_input} no_cerrar`}>

            <input className={`${styles2.buscador } no_cerrar`} ref={buscadorRef} 
              type="text" 
              name="buscador" 
            />
            <div 
              /*style={{opacity: ? 1 :  .7}}*/
              className={`${styles2.empujar_buscador} no_cerrar`}
              onClick={() => {buscadorRef.current.value != ''? router.push(`/buscar/${buscadorRef.current.value.replaceAll('\\', '')}`) : ''}} 
            >
              BUSCAR
            </div>
          </div>
        </div>
      </div> 
    </>

    );
}