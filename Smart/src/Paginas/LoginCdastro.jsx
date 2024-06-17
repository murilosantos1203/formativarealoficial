import React from 'react';
import axios from 'axios';

import estilos from './Login.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Importe a imagem
import paisagem from '../assets/paisagem.svg';

export function LoginCD() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function cadastrarNovoUsuario(data) {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://murilosantos.pythonanywhere.com/api/create_user', {
                username: data.usuario,
                email: data.email,
                password: data.senha
            }, 
        {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

            // Você pode fazer alguma ação após o cadastro bem-sucedido, como redirecionar para outra página
            console.log('Usuário cadastrado com sucesso!');
            navigate('/inicial'); // Redireciona para a página de login
        } catch (error) {
            console.error('Erro ao cadastrar o usuário', error);
        }
    }

    return (
        <div className={estilos.conteiner}>
            <form className={estilos.formulario} onSubmit={handleSubmit(cadastrarNovoUsuario)}>
                <p className={estilos.titulo}>Connect</p>
                <p className={estilos.titulo1}>Map</p>

                <input
                    {...register('email')}
                    className={estilos.campo}
                    placeholder="Email"
                />

                <input
                    {...register('usuario')}
                    className={estilos.campo}
                    placeholder="User"
                />

                <input
                    {...register('senha')}
                    type="password"
                    className={estilos.campo}
                    placeholder="Password"
                />

                <button className={estilos.botao}>Cadastrar</button>
            </form>
            <img src={paisagem} alt="React Logo" className={estilos.logo} />
        </div>
    );
}