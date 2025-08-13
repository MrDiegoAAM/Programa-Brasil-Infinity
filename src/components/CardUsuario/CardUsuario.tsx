import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext/SupabaseAuthContext";
import { useData } from "../../contexts/authContext/DataContext";
import { CardUser, ButtonSalvar, ButtonEditar, ButtonCancelar } from "./style";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IRegisterPerson as IRegisterPersonComplete } from "../ModalRegister/ModalRegister";

export default function CardUsuario() {
  const { user } = useAuth();
  const { userProfile, updateInstitution, updateHomeless, institutions, loadInstitutions } = useData();
  const [save, setSave] = useState(false);
  
  const isInstitution = userProfile && 'cnpj' in userProfile;
  const isAbrigado = userProfile && 'cpf' in userProfile;
  
  console.log('CardUsuario - user:', user);
  console.log('CardUsuario - userProfile:', userProfile);

  const { register, handleSubmit, setValue, watch } = useForm<IRegisterPersonComplete>();

  // Carregar instituições quando o componente for montado
  useEffect(() => {
    if (isAbrigado) {
      loadInstitutions();
    }
  }, [isAbrigado, loadInstitutions]);

  // Atualizar os valores do formulário quando os dados do usuário chegarem
  useEffect(() => {
    if (userProfile && Object.keys(userProfile).length > 0) {
      console.log("🔄 Atualizando valores do formulário com dados do usuário:", userProfile);
      setValue("name", userProfile.name || "");
      setValue("email", userProfile.email || "");
      setValue("picture", userProfile.picture || "");
      setValue("telephone", userProfile.telephone || "");
      
      if (isInstitution) {
        setValue("cnpj", userProfile.cnpj || "");
        setValue("address", userProfile.address || "");
      } else {
        setValue("age", userProfile.age || "");
        setValue("cpf", userProfile.cpf || "");
        setValue("description", userProfile.description || "");
        setValue("institutionId", userProfile.institution_id || "");
      }
    }
  }, [userProfile, isInstitution, setValue]);

  const onSubmitForm = async (data: IRegisterPersonComplete) => {
    console.log('🔄 FRONTEND - Iniciando envio do formulário');
    console.log('📝 Dados do formulário:', data);
    console.log('🖼️ Campo picture no formulário:', data.picture);
    
    if (!userProfile) {
      toast.error("Perfil do usuário não encontrado");
      return;
    }

    try {
      if (isInstitution) {
        console.log('📤 Atualizando dados da instituição via Supabase');
        await updateInstitution(userProfile.id, data);
        
        toast.success("Instituição atualizada com sucesso!", {
          autoClose: 1500,
        });
        setTimeout(() => {
          setSave(false);
        }, 2000);
      } else {
        console.log('📤 Atualizando dados do abrigado via Supabase');
        await updateHomeless(userProfile.id, data);
        
        toast.success("Dados atualizados com sucesso!", {
          autoClose: 1500,
        });
        setTimeout(() => {
          setSave(false);
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
      toast.error("Erro ao atualizar perfil", { autoClose: 1500 });
    }
  };

  return (
    <>
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
          background: userProfile?.picture ? 'transparent' : '#007bff',
          border: '3px solid #ddd',
          marginBottom: '10px'
        }}>
          {userProfile?.picture ? (
            <img
              src={userProfile.picture} 
              alt={`Foto de ${userProfile?.name || 'usuário'}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.style.background = '#007bff';
                e.currentTarget.parentElement!.innerHTML = `<span style="color: white; font-weight: 600; font-size: 2rem">${userProfile?.name?.charAt(0).toUpperCase() || 'U'}</span>`;
              }}
            />
          ) : (
            <span style={{
              color: 'white',
              fontWeight: '600',
              fontSize: '2rem'
            }}>
              {userProfile?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          )}
        </div>
        <h4 style={{ margin: '0', color: '#374c5a' }}>{userProfile?.name || 'Usuário'}</h4>
        <p style={{ margin: '5px 0 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
          {isInstitution ? 'Instituição' : 'Abrigado'}
        </p>
      </div>

      <CardUser>
        <div>
          <h3>Meus dados</h3>
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
              Instituição:{" "}
              <select
                value={watch("institutionId") || ""}
                disabled={!save}
                {...register("institutionId")}
              >
                <option value="">Selecione uma instituição</option>
                {institutions.map((institution) => (
                  <option key={institution.id} value={institution.id}>
                    {institution.name}
                  </option>
                ))}
              </select>
              Descrição:{" "}
              <textarea
                value={watch("description") || ""}
                placeholder="Não informado"
                readOnly={!save && true}
                rows={3}
                {...register("description")}
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
    </>
  );
}
