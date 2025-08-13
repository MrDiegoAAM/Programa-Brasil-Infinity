import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/authContext/SupabaseAuthContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ModalRegister from '../../components/ModalRegister/ModalRegister';
import { DivBack } from './styles';
import { ToastContainer } from 'react-toastify';
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
  const [isRegister, setIsRegister] = useState(false);

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
                <h1>Bem-vindo de volta!</h1>
                <p>
                  Faça login para acessar sua conta e continuar ajudando pessoas
                  em situação de vulnerabilidade.
                </p>
              </div>
            </div>
            <div className="content-right-side">
              <div className="content-right-side-text">
                <h1>Entrar</h1>
                <p>Digite suas credenciais para acessar sua conta</p>
              </div>
              <form onSubmit={handleSubmit(onSubmitFunction)}>
                <div className="input-container">
                  <label htmlFor="email">Email</label>
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
                  <label htmlFor="password">Senha</label>
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
                  <span onClick={() => setIsRegister(true)}>Cadastre-se</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DivBack>
      <Footer />
      {isRegister && (
        <ModalRegister
          isRegister={isRegister}
          setIsRegister={setIsRegister}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}