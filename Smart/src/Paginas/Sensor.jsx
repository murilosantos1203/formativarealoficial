import React, { useEffect, useState } from 'react';
import axios from 'axios';
import estilos from './Sensor.module.css';
import { Link } from 'react-router-dom'; 
import { Menu } from '../Componentes/Menu';
import { Filtro } from './Filtro';

export function Sensor() {
    const [sensores, setSensores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const atualizarSensoresFiltrados = (sensoresFiltrados) => {
        setSensores(sensoresFiltrados); 
    };
  
    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://murilosantos.pythonanywhere.com/api/sensores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSensores(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        fetchSensores();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    return (
        <div>
            <Menu />
            <div className={estilos.container}>
                <p className={estilos.logolista}>Lista de Sensores</p>

                <Filtro atualizarSensoresFiltrados={atualizarSensoresFiltrados} className={estilos.conteinerFiltro}/> 
                <div className={estilos.btnConteiner}>
                    <a href="cadsensor" className={estilos.botao}>Cadastrar sensor</a>
                     
                </div>
                  
               
                <table className={estilos.table}>
                    <thead>
                        <tr className={estilos.headerRow}>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Localização</th>
                            <th>Responsável</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                            <th>Alterar Dados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensores.map(sensor => (
                            <tr key={sensor.id}>
                                <td>{sensor.id}</td>
                                <td>{sensor.tipo}</td>
                                <td>{sensor.localizacao}</td>
                                <td>{sensor.responsavel}</td>
                                <td>{sensor.longitude}</td>
                                <td>{sensor.latitude}</td>
                                <td><Link to={`alterar-sensor/${sensor.id}`}>Alterar</Link></td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
