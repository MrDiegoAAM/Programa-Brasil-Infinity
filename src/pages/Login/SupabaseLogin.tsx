import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/authContext/SupabaseAuthContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { DivBack } from './SupabaseLogin.styles';

import 'react-toastify/dist/ReactToastify.css';

interface ILoginForm {
  email: string;
  password: string;
}

const formSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SupabaseLogin() {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = async (data: ILoginForm) => {
    try {
      await signIn(data.email, data.password);
      navigate('/home');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <>
      <Header />
      <DivBack>
        <div className="container">
          <div className="content">
            <div className="content-left-side">
              <div className="content-left-side-text">
                <h1>Bem-vindo!</h1>
                <p>
                  Faça login para acessar o sistema de cadastro de pessoas em
                  situação de vulnerabilidade social.
                </p>
              </div>
            </div>
            <div className="content-right-side">
              <div className="content-right-side-text">
                <h1>Login</h1>
                <p>Entre com suas credenciais</p>
              </div>
              <form onSubmit={handleSubmit(onSubmitFunction)}>
                <div className="input-container">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Digite seu email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="error">{errors.email.message}</span>
                  )}
                </div>
                <div className="input-container">
                  <label htmlFor="password">Senha:</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Digite sua senha"
                    {...register('password')}
                  />
                  {errors.password && (
                    <span className="error">{errors.password.message}</span>
                  )}
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
              <div className="register-link">
                <p>
                  Não tem uma conta?{' '}
                  <span onClick={() => navigate('/register')}>Cadastre-se</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DivBack>
      <Footer />


    </>
  );
}