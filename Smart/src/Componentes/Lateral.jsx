import estilos from './Lateral.module.css'
import { Link } from 'react-router-dom'


export function Lateral(){
    return(
        <aside className={estilos.conteiner}>

            <section>
                <Link 
                    className={estilos.botao}
                    to='/inicial'>
                    Lista Sensores
                </Link>

                <Link 

                    className={estilos.botao}
                    to='/inicial/cadsensor'
                >Cadastrar Sensor
                </Link>
                <Link 
                    className={estilos.botao}
                    to='/inicial/localizacao'
                >Mapa
                </Link>
                <Link 
                    className={estilos.botao}
                    to='/inicial/filtro'
                >Filtros
                </Link>
            </section>
        </aside>
    )
}