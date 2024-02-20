import { useRouter } from 'next/navigation';
import styles from './bajo1.module.css'

export default function Bajo1({id, numeroProp}) {

    const router = useRouter()

    return (
        <div className={styles.bajo}>
            <div className={styles.boton_comentar} onClick={() => {router.push(`/leermas/${id}`)}}><a>{numeroProp > 0?  `${numeroProp} comentarios` : 'Publicar un comentario' }</a></div>
            <a className={styles.boton_leer_mas} onClick={() => {router.push(`/leermas/${id}`)}}>LEER MAS</a>
        </div>
    );
}