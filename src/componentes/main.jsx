'use client'
import styles from './main.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticuloPrincipal from './articuloPrincipal';

export default function Main({params}) {

  const router = useRouter()

  const [entrada, setEntrada] = useState([])
  const [nueva, setNueva] = useState([])

  const [displayS, setDisplayS] = useState(true)

  async function  pedirEntradas  () { 
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/entradas`)
  
    const entradas = await response.json()
    return entradas
  }


  const preparador = (inicio, final)=> {
   
    if(final > entrada.length){
      final = entrada.length 
    }

    let suma = []

    for (let i= inicio - 1; i < final; i++) {
      suma.push(entrada[i])
    }
    setNueva(suma)

    if(final >= entrada.length){
      setDisplayS(false)
    }
    return
  }

  let cantidad= params? params.cantidad : 4
  let pagina = params? parseInt(params.pagina) : 1
  let resta = cantidad - 1
  useEffect(() =>{pedirEntradas().then((entradas) => {setEntrada(entradas)} )},[])
  useEffect(()=> { entrada.length > 0 ? preparador((cantidad * pagina) - resta, cantidad * pagina ) : ''}, [entrada])

  return (
    <>
      <div style={{display:nueva.length > 0? 'block' : 'none'}}>
        <main className={styles.main}>    
          {nueva.map((entrada) => <ArticuloPrincipal key={entrada.id} {...entrada} ultimoArticuloProp={ nueva[nueva.length - 1].id == entrada.id ? 'ultimoArticulo' : ''}/> ) }
          <div className={styles.mas}  style={{display: displayS? 'flex' : 'none'}} onClick={() => { router.push(`/mas/${cantidad}/${pagina + 1}`)} }> <p className={styles.mas_a}>MÁS ENTRADAS</p></div>
        </main>
        <footer className={styles.footer}>
            <p className={styles.footer_p}>Con la tecnología de nextjs</p>
            <h5 className={styles.footer_h5}>Imágenes del tema: <span>Michael Elkan</span> </h5>
        </footer>
      </div>
      <div className={styles.reemplazo} style={{display:nueva.length <= 0? 'block' : 'none'}}>
        cargando...
      </div>
    </>
  )
}