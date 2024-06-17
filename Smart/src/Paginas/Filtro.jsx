import React, { useState } from 'react';
import axios from 'axios';
import estilos from './Filtro.module.css';

export function Filtro({atualizarSensoresFiltrados}) {
    const [filters, setFilters] = useState({
        responsavel: '',
        status_operacional: false,
        tipo: '',
        localizacao: '',
    });

  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFilters({
            ...filters,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://murilosantos.pythonanywhere.com/api/sensor_filter/', filters, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            atualizarSensoresFiltrados(response.data);
        } catch (error) {
            console.error('Error fetching sensors:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={estilos.container}>
            <form onSubmit={handleSubmit} className={estilos.formulario}>

                    <label>Responsável:</label>
                    <input type="text" name="responsavel" value={filters.responsavel} onChange={handleChange} />

                    <label>Status Operacional</label>
                    <input type="checkbox" name="status_operacional" checked={filters.status_operacional} onChange={handleChange} />

                    <label>Tipo:</label>
                    <input type="text" name="tipo" value={filters.tipo} onChange={handleChange} />

                    <label>Localização:</label>
                    <input type="text" name="localizacao" value={filters.localizacao} onChange={handleChange} />
                    <button className={estilos.botao} type="submit">Filtrar</button>
                
            </form>


            {loading && <div className={estilos.conteiner}><h1>Carregando...</h1></div>}
            {error && <div className={estilos.conteiner}><h1>Erro ao buscar sensores: {error.message}</h1></div>}
            
        </div>
    );
};


