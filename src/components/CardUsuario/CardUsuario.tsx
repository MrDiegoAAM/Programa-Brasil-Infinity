import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { CardUser, ButtonSalvar, ButtonEditar, ButtonCancelar } from "./style";
import { useForm } from "react-hook-form";
import api from "../../server/api";
import { toast } from "react-toastify";
import { IRegisterPerson as IRegisterPersonComplete } from "../ModalRegister/ModalRegister";

export default function CardUsuario() {
  const {
    user,
    setIsLogin,
    isInstitution,
    isAbrigado,
    setIsInstitution,
    setIsAbrigado,
  } = useContext(AuthContext);
  const [save, setSave] = useState(false);
  console.log(user);

  const { register, handleSubmit, setValue, watch } = useForm<IRegisterPersonComplete>();

  useEffect(() => {
    const type = localStorage.getItem("@type");

    if (type !== undefined) {
      if (type === "institution") {
        setIsAbrigado(false);
        setIsInstitution(true);
      } else {
        setIsInstitution(false);
        setIsAbrigado(true);
      }
    }
  }, []);

  // Atualizar os valores do formulário quando os dados do usuário chegarem
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      console.log("🔄 Atualizando valores do formulário com dados do usuário:", user);
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("picture", user.picture || "");
      setValue("telephone", user.telephone || "");
      
      if (isInstitution) {
        setValue("cnpj", user.cnpj || "");
        setValue("address", user.address || "");
      } else {
        setValue("age", user.age || "");
        setValue("cpf", user.cpf || "");
        setValue("description", user.description || "");
      }
    }
  }, [user, isInstitution, setValue]);

  const onSubmitForm = (data: IRegisterPersonComplete) => {
    console.log('🔄 FRONTEND - Iniciando envio do formulário');
    console.log('📝 Dados do formulário:', data);
    console.log('🖼️ Campo picture no formulário:', data.picture);
    
    const type = localStorage.getItem("@type");
    console.log('👤 Tipo de usuário:', type);

    if (type === "institution") {
      setIsAbrigado(false);
      setIsInstitution(true);

      console.log('📤 Enviando dados para /register/institution/profile');
      api.patch("/register/institution/profile", data).then((res) => {
        console.log('📥 Resposta recebida:', res);
        if (res.status === 200) {
          toast.success("Usuário atualizado com sucesso!", {
            autoClose: 1500,
          });
          setTimeout(() => {
            setIsLogin(true);
            setSave(false);
          }, 2000);
        } else {
          toast.error("Ops, algo deu errado", { autoClose: 1500 });
        }
      }).catch((error) => {
        console.error('❌ Erro na requisição:', error);
        toast.error("Erro ao atualizar perfil", { autoClose: 1500 });
      });
    } else {
      setIsInstitution(false);
      setIsAbrigado(true);
      
      console.log('📤 Enviando dados para /abrigados/profile');
      api.patch("/abrigados/profile", data).then((res) => {
        console.log('📥 Resposta recebida:', res);
        console.log('📝 Dados enviados:', data);
        if (res.status === 200) {
          toast.success("Usuário atualizado com sucesso!", {
            autoClose: 1500,
          });
          setTimeout(() => {
            setIsLogin(true);
            setSave(false);
          }, 2000);
        } else {
          toast.error("Ops, algo deu errado", { autoClose: 1500 });
        }
      }).catch((error) => {
        console.error('❌ Erro na requisição:', error);
        toast.error("Erro ao atualizar perfil", { autoClose: 1500 });
      });
    }
  };

  return (
    <CardUser>
      <div>
        <h3>Meus dados</h3>
      </div>
      
      {/* Seção da foto do usuário */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: user.picture ? 'transparent' : '#007bff',
          border: '3px solid #ddd',
          marginBottom: '10px'
        }}>
          {user.picture ? (
            <img 
              src={user.picture} 
              alt={`Foto de ${user.name}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.style.background = '#007bff';
                e.currentTarget.parentElement!.innerHTML = `<span style="color: white; font-weight: 600; font-size: 2rem">${user.name?.charAt(0).toUpperCase()}</span>`;
              }}
            />
          ) : (
            <span style={{
              color: 'white',
              fontWeight: '600',
              fontSize: '2rem'
            }}>
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <h4 style={{ margin: '0', color: '#374c5a' }}>{user.name}</h4>
        <p style={{ margin: '5px 0 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
          {isInstitution ? 'Instituição' : 'Abrigado'}
        </p>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          {save ? (
            <ButtonEditar onClick={() => setSave(true)} disabled>
              Editar
            </ButtonEditar>
          ) : (
            <ButtonEditar onClick={() => setSave(true)}>Editar</ButtonEditar>
          )}
          {isInstitution && (
            <>
              Nome Instituição:{" "}
              <input
                type="text"
                value={watch("name") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("name")}
              />
              CNPJ:{" "}
              <input
                type="text"
                value={watch("cnpj") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("cnpj")}
              />
              Endereço:{" "}
              <input
                type="text"
                value={watch("address") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("address")}
              />
              Telefone:{" "}
              <input
                type="text"
                value={watch("telephone") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("telephone")}
              />
              Email:{" "}
              <input
                type="text"
                value={watch("email") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("email")}
              />
              Foto:{" "}
              <input
                type="url"
                value={watch("picture") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("picture")}
              />
              Descrição:{" "}
              <textarea
                value={watch("description") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                rows={3}
                {...register("description")}
              />
            </>
          )}{" "}
          {isAbrigado && (
            <>
              Nome Abrigado:{" "}
              <input
                type="text"
                value={watch("name") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("name")}
              />
              Idade:{" "}
              <input
                type="text"
                value={watch("age") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("age")}
              />
              CPF:{" "}
              <input
                type="text"
                value={watch("cpf") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("cpf")}
              />
              Telefone:{" "}
              <input
                type="text"
                value={watch("telephone") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("telephone")}
              />
              Email:{" "}
              <input
                type="text"
                value={watch("email") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("email")}
              />
              Foto:{" "}
              <input
                type="url"
                value={watch("picture") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                {...register("picture")}
              />
            </>
          )}
          {save && (
            <div>
              <ButtonSalvar type="submit" className="save">
                Salvar
              </ButtonSalvar>

              <ButtonCancelar onClick={() => setSave(false)}>
                Cancelar
              </ButtonCancelar>
            </div>
          )}
        </form>
      </div>
    </CardUser>
  );
}
