import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import estilos from './CadastrarSensor.module.css'
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Menu } from "../Componentes/Menu";

const schemaSensor = z.object({
    tipo: z.string()
        .nonempty("Não é permitido estar em branco."),
    mac_address: z.string()
        .nullable(),
    latitude: z.string()
        .refine(val => !isNaN(parseFloat(val)), 'Latitude inválida'),
    longitude: z.string()
        .refine(val => !isNaN(parseFloat(val)), 'Longitude inválida'),
    localizacao: z.string()
        .min(10, 'Deve ter no mínimo 10 caracteres.')
        .max(100, "Deve ter no máximo 100 caracteres."),
    responsavel: z.string()
        .min(1, 'Deve ter no mínimo 1 caracteres.')
        .max(100, "Deve ter no máximo 100 caracteres."),
    unidade_medida: z.string()
        .min(1, 'Deve ter no mínimo 1 caracteres.')
        .max(20, "Deve ter no máximo 20 caracteres."),
    status_operacional: z.boolean(),
    observacao: z.string()
        .nullable(),
});

export function CadastrarSensor() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaSensor)
    });

    async function obterDadosFormulario(data) {
        console.log(data);
        if (data.mac_address === '') {
            data.mac_address = null;
        }

        try {
            const token = localStorage.getItem('access_token');
            await axios.post('http://murilosantos.pythonanywhere.com/api/sensores/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Sensor cadastrado com sucesso!")
            navigate('/sensores')
        } catch (error) {
            if (error.response) {
                console.error("Resposta do servidor:", error.response.data);
                alert(`Erro: ${error.response.data.detail}`);
            } else if (error.request) {
                console.error("Nenhuma resposta recebida:", error.request);
            } else {
                console.error("Erro ao configurar a solicitação:", error.message);
            }
        }
    }

    return (
        <div>
            <Menu/>
            <div className={estilos.container}>
                <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
               

                    
                    <select {...register('tipo')} className={estilos.campo}>
                        <option value="">Selecione um Tipo</option>
                        <option value="Temperatura">Temperatura</option>
                        <option value="Contador">Contador</option>
                        <option value="Luminosidade">Luminosidade</option>
                        <option value="Umidade">Umidade</option>
                    </select>
                    {errors.tipo && <p className={estilos.mensagem}>{errors.tipo.message}</p>}

                    <input
                        {...register('mac_address')}
                        className={estilos.campo}
                        placeholder="mac_address"
                    />
                    {errors.mac_address && <p className={estilos.mensagem}>{errors.mac_address.message}</p>}

                    <input
                        {...register('latitude')}
                        className={estilos.campo}
                        placeholder="latitude"
                    />
                    {errors.latitude && <p className={estilos.mensagem}>{errors.latitude.message}</p>}

                    <input
                        {...register('longitude')}
                        className={estilos.campo}
                        placeholder="longitude"
                    />
                    {errors.longitude && <p className={estilos.mensagem}>{errors.longitude.message}</p>}

                    <input
                        {...register('localizacao')}
                        className={estilos.campo}
                        placeholder="localizacao"
                    />
                    {errors.localizacao && <p className={estilos.mensagem}>{errors.localizacao.message}</p>}

                    <input
                        {...register('responsavel')}
                        className={estilos.campo}
                        placeholder="responsável"
                    />
                    {errors.responsavel && <p className={estilos.mensagem}>{errors.responsavel.message}</p>}

                    <input
                        {...register('unidade_medida')}
                        className={estilos.campo}
                        placeholder="unidade_medida"
                    />
                    {errors.unidade_medida && <p className={estilos.mensagem}>{errors.unidade_medida.message}</p>}

                    <textarea {...register('observacao')} className={estilos.campo} placeholder="Observação"></textarea>
                    {errors.observacao && <p className={estilos.mensagem}>{errors.observacao.message}</p>}

                    <label className={estilos.check}>
                        Satus Operacional:
                        <input {...register('status_operacional')} type="checkbox"></input>
                    </label>

                    <button type="submit" className={estilos.botao}>Cadastrar</button>
                </form>
            </div>
        </div>
        
    )
}