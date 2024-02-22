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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/entradas`)
  
    const entradas = await response.json()
    return entradas
  }


  const pru = (inicio, final)=> {
   
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
  let pagina = params? params.pagina : 1
  let resta = cantidad - 1
  useEffect(() =>{pedirEntradas().then((entradas) => {setEntrada(entradas); console.log('pedirentardas main')} )},[])
  useEffect(()=> { entrada.length > 0 ? pru((cantidad * pagina) - resta, cantidad * pagina ) : ''}, [entrada])

  return (
    <>
      <main>    
        {nueva.map((entrada) => <ArticuloPrincipal key={entrada.id} {...entrada} ultimoArticuloProp={ nueva[nueva.length - 1].id == entrada.id ? 'ultimoArticulo' : ''}/> ) }
        <div className={styles.mas}  style={{display: displayS? 'flex' : 'none'}} onClick={() => { router.push(`/mas/${cantidad}/${parseInt(pagina) + 1}`)} }> <a  className={styles.mas_a}  >MÁS ENTRADAS</a></div>
      </main>
    </>
  );
}