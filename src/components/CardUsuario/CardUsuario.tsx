import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext/SupabaseAuthContext";
import { useData } from "../../contexts/authContext/DataContext";
import { CardUser, ButtonSalvar, ButtonEditar, ButtonCancelar } from "./style";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IRegisterPerson as IRegisterPersonComplete } from "../ModalRegister/ModalRegister";

// Função de máscara
const formatPhone = (value: string) => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{1})(\d{4})(\d)/, '$1 $2-$3');
  }
};

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
      {/* Header do Perfil com Foto e Informações Principais */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '40px',
        padding: '50px 40px',
        background: 'linear-gradient(135deg, #2d9c8b 0%, #4ade80 50%, #22d3ee 100%)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(45, 156, 139, 0.25)',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}>
        {/* Padrão de fundo decorativo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cdefs%3E%3Cpattern id=\'hearts\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M20,25 C15,15 5,15 5,25 C5,35 20,45 20,45 C20,45 35,35 35,25 C35,15 25,15 20,25 Z\' fill=\'%23ffffff\' opacity=\'0.08\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23hearts)\'/%3E%3C/svg%3E")',
          zIndex: 0
        }}></div>
        {/* Avatar do usuário */}
        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: userProfile?.picture ? 'transparent' : 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
          border: '5px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25), inset 0 0 0 3px rgba(255, 255, 255, 0.15)',
          marginBottom: '30px',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1
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
                e.currentTarget.parentElement!.style.background = '#0057FF';
                e.currentTarget.parentElement!.innerHTML = `<span style="color: white; font-weight: 600; font-size: 2.5rem">${userProfile?.name?.charAt(0).toUpperCase() || 'U'}</span>`;
              }}
            />
          ) : (
            <span style={{
              color: 'white',
              fontWeight: '700',
              fontSize: '4rem',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}>
              {userProfile?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          )}
        </div>
        {/* Informações do usuário */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            color: 'white', 
            fontSize: '1.8rem', 
            fontWeight: '700',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            {userProfile?.name || 'Usuário'}
          </h2>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isInstitution ? '#34d399' : '#22d3ee',
              marginRight: '8px',
              boxShadow: '0 0 10px currentColor'
            }}></span>
            <span style={{ 
              color: 'rgba(255, 255, 255, 0.95)', 
              fontSize: '0.9rem', 
              fontWeight: '500',
              letterSpacing: '0.3px'
            }}>
              {isInstitution ? '🏢 Organização de Apoio' : '🤝 Pessoa Assistida'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Unificado de Informações */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <CardUser>
          <div className="card-header">
            <div className="header-icon">📋</div>
            <div style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <h3 style={{ margin: 0 }}>Suas Informações Completas</h3>
              <div className="header-subtitle">Mantenha todos os seus dados sempre atualizados</div>
            </div>
          </div>
          
          <div className="card-content">
          <div className={`form-container ux-fix ${isInstitution ? 'institution-form' : ''}`}>
            <div className="edit-button-container">
              {save ? (
                <ButtonEditar onClick={() => setSave(true)} disabled className="btn-edit">
                  Editar
                </ButtonEditar>
              ) : (
                <ButtonEditar onClick={() => setSave(true)} className="btn-edit">Editar</ButtonEditar>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="form-grid">
                
                {isInstitution && (
                  <>
                    <div className="field field-full">
                      <label className="label" htmlFor="organization-name">Nome da Organização*</label>
                      <input
                        className="input"
                        id="organization-name"
                        type="text"
                        autoComplete="organization"
                        maxLength={120}
                        value={watch("name") || ""}
                        placeholder="Digite o nome da sua organização"
                        readOnly={!save}
                        {...register("name")}
                      />
                    </div>
                  </>
                )}
              
                {isAbrigado && (
                  <>
                    <div className="field">
                      <label className="label" htmlFor="person-name">Seu Nome Completo*</label>
                      <input
                        className="input"
                        id="person-name"
                        type="text"
                        autoComplete="name"
                        value={watch("name") || ""}
                        placeholder="Digite seu nome completo"
                        readOnly={!save}
                        {...register("name")}
                      />
                    </div>
                    
                    <div className="field">
                      <label className="label" htmlFor="person-age">Sua Idade</label>
                      <input
                        className="input"
                        id="person-age"
                        type="number"
                        inputMode="numeric"
                        value={watch("age") || ""}
                        placeholder="Ex: 25"
                        readOnly={!save}
                        {...register("age")}
                      />
                      <p className="help">Informação importante para o atendimento adequado</p>
                    </div>
                    
                    <div className="field">
                      <label className="label" htmlFor="person-cpf">CPF</label>
                      <input
                        className="input"
                        id="person-cpf"
                        type="text"
                        inputMode="numeric"
                        value={watch("cpf") || ""}
                        placeholder="000.000.000-00"
                        readOnly={!save}
                        {...register("cpf")}
                      />
                      <p className="help">Documento para identificação (opcional)</p>
                    </div>
                    
                    <div className="field field-full">
                      <label className="label" htmlFor="person-institution">Organização de Apoio</label>
                      <select
                        className="input"
                        id="person-institution"
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
                      <p className="help">Local onde você recebe atendimento</p>
                    </div>
                    
                    <div className="field field-full">
                      <label className="label" htmlFor="person-description">Conte um Pouco Sobre Você</label>
                      <textarea
                        className="input"
                        id="person-description"
                        value={watch("description") || ""}
                        placeholder="Ex: Necessidades especiais, preferências, ou qualquer informação que considere importante..."
                        readOnly={!save}
                        rows={4}
                        {...register("description")}
                      />
                      <p className="help">Compartilhe informações que possam ajudar no seu atendimento (opcional)</p>
                    </div>
                  </>
                )}
                
                {isAbrigado && (
                  <>
                    <div className="field">
                      <label className="label" htmlFor="telephone">Telefone para Contato</label>
                      <input
                        className="input"
                        id="telephone"
                        type="tel"
                        inputMode="tel"
                        value={formatPhone(watch("telephone") || "")}
                        placeholder="(11) 99999-9999"
                        readOnly={!save}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          setValue("telephone", formatted);
                        }}
                      />
                    </div>
                    
                    <div className="field field-full">
                      <label className="label" htmlFor="email">Email</label>
                      <input
                        className="input"
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={watch("email") || ""}
                        placeholder="seu.email@exemplo.com"
                        readOnly={!save}
                        {...register("email")}
                      />
                      <p className="help">Para receber informações e atualizações (opcional)</p>
                    </div>
                  </>
                )}
              </div>
              
              {save && (
                <div className="button-group">
                  <ButtonSalvar type="submit">
                    Salvar Alterações
                  </ButtonSalvar>
                  <ButtonCancelar type="button" onClick={() => setSave(false)}>
                    Cancelar
                  </ButtonCancelar>
                </div>
              )}
            </form>
          </div>
        </div>
        </CardUser>
      </div>
    </>
  );
}
