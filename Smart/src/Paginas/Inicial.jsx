import React from 'react';
import estilos from './Inicial.module.css';
import bannerhome from '../assets/bannerhome.svg';
import { Outlet } from 'react-router-dom';
import styles from './Inicial.module.css'

export function Inicial() {
   const Menu = () => {
    return (
      <div className={estilos.menu}>
        <div className={estilos.logowebsite}>
          <p className={estilos.titulo}>Connect</p>
          <p className={estilos.titulo1}>Map</p>
        </div>
        <ul>
            <li><a href="localizacao">Mapa</a></li>
            <li><a href="sensores">Sensores</a></li>
            <li><a href="caduser">Cadastro</a></li>
          <li><a href="/">Sair</a></li>
        </ul>
      </div>
    );
  }

  const Banner = () => {
    return (
      <img src={bannerhome} alt="React Logo" className={estilos.banner} />
    );
  }

  return (
    <div className={styles.conteiner}>
      <Menu />
      <Banner />
      <Outlet/>
    </div>
  );
}

