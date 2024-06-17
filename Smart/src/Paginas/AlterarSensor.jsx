import React, { useEffect } from 'react';
import axios from 'axios';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import estilos from './AlterarSensor.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Menu } from '../Componentes/Menu';

const schemaAlterarSensor = z.object({
    tipo: z.string().optional(), 
    mac_address: z.string().max(25, "Deve ter no máximo 25 caracteres").nullable(),
    latitude: z.number().refine(val => !isNaN(parseFloat(val)), 'Latitude inválida'),
    longitude: z.number().refine(val => !isNaN(parseFloat(val)), 'Longitude inválida'),
    localizacao: z.string().max(100, 'Deve ter no máximo 100 caracteres'),
    responsavel: z.string().max(100, 'Deve ter no máximo 100 caracteres'),
    unidade_medida: z.string().max(20, 'Deve ter no máximo 20 caracteres'),
    status_operacional: z.boolean(),
    observacao: z.string().nullable()
});

export function AlterarSensor() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schemaAlterarSensor)
    });

    const obterDadosSensor = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`https://murilosantos.pythonanywhere.com/api/sensores/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const sensorData = response.data;
            Object.keys(sensorData).forEach(key => {
                setValue(key, sensorData[key]);
            });
        } catch (err) {
            console.error('Erro ao obter o sensor', err);
        }
    };

    useEffect(() => {
        obterDadosSensor();
    }, [id]);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.put(`http://murilosantos.pythonanywhere.com/api/sensores/${id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Sensor alterado com sucesso!');
            navigate('/sensores');
        } catch (error) {
            console.error('Erro ao alterar o sensor', error);
        }
    };

    const excluirSensor = async () => {
        if (window.confirm("Tem certeza de que deseja excluir este sensor?")) {
            try {
                const token = localStorage.getItem('access_token');
                const url = `http://murilosantos.pythonanywhere.com/api/sensores/${id}/`;
                await axios.delete(url, { 
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                alert("Sensor excluído com sucesso!");
                navigate('/sensores');
            } catch (error) {
                console.error('Erro ao excluir o sensor: ', error);
                alert('Erro ao excluir o sensor: ', error);
            }
        }
    };

    return (
        <div>
            <div className={estilos.conteiner}>
                <form className={estilos.formulario} onSubmit={handleSubmit(onSubmit)}>
                    <label>Tipo</label>
                    <select {...register('tipo')} className={estilos.campo}>
                        <option value="">Selecione o tipo de sensor</option>
                        <option value="Temperatura">Temperatura</option>
                        <option value="Contador">Contador</option>
                        <option value="Luminosidade">Luminosidade</option>
                        <option value="Umidade">Umidade</option>
                    </select>
                    {errors.tipo && <p className={estilos.mensagem}>{errors.tipo.message}</p>}

                    <label>Mac Address</label>
                    <input {...register('mac_address')} className={estilos.campo} />
                    {errors.mac_address && <p className={estilos.mensagem}>{errors.mac_address.message}</p>}

                    <label>Latitude</label>
                    <input {...register('latitude')} className={estilos.campo} />
                    {errors.latitude && <p className={estilos.mensagem}>{errors.latitude.message}</p>}

                    <label>Longitude</label>
                    <input {...register('longitude')} className={estilos.campo} />
                    {errors.longitude && <p className={estilos.mensagem}>{errors.longitude.message}</p>}

                    <label>Localização</label>
                    <input {...register('localizacao')} className={estilos.campo} />
                    {errors.localizacao && <p className={estilos.mensagem}>{errors.localizacao.message}</p>}

                    <label>Responsável</label>
                    <input {...register('responsavel')} className={estilos.campo} />
                    {errors.responsavel && <p className={estilos.mensagem}>{errors.responsavel.message}</p>}

                    <label>Unidade Medida</label>
                    <input {...register('unidade_medida')} className={estilos.campo} />
                    {errors.unidade_medida && <p className={estilos.mensagem}>{errors.unidade_medida.message}</p>}

                    <label>Status Operacional</label>
                    <input {...register('status_operacional')} type="checkbox" defaultChecked={true} />

                    <label>Observação</label>
                    <textarea {...register('observacao')} className={estilos.campo}></textarea>
                    {errors.observacao && <p className={estilos.mensagem}>{errors.observacao.message}</p>}

                    <button type="submit" className={estilos.botao}>Salvar Alterações</button>
                    <button type="submit" onClick={excluirSensor} className={estilos.botaoExcluir}>Excluir Sensor</button>

                </form>
                <Outlet />
            </div>
        </div>
    );
}