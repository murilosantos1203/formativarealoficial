import estilos from './Menu.module.css'


export function Menu(){
    return (
        <div className={estilos.menu}>
          <div className={estilos.logowebsite}>
            <p className={estilos.titulo}>Connect</p>
            <p className={estilos.titulo1}>Map</p>
          </div>
          <ul>
            <li><a href="inicial">Inicial</a></li>
            <li><a href="localizacao">Mapa</a></li>
            <li><a href="sensores">Sensores</a></li>
            <li><a href="graficos">Gráficos</a></li>
            <li><a href="caduser">Cadastro</a></li>
            <li><a href="/">Sair</a></li>
          </ul>
        </div>
      );
    }
