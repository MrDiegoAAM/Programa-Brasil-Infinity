import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AnimatedPage from "../../components/AnimatedPage";
import ResetPage from "../../components/ResetPage/ResetPage";
import { Container } from "./Profile.styles";
import { useData } from "../../contexts/authContext/DataContext";
import { useState } from "react";
import { toast } from "react-toastify";

import { usePrintToPDF } from "../../hooks/usePrintToPDF";

export default function Profile() {
  const { userProfile, homeless, institutions, updateInstitution, updateHomeless } = useData();
  const { printToPDF } = usePrintToPDF();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    cnpj: '',
    email: '',
    address: '',
    telephone: '',
    cpf: '',
    age: '',
    institution_id: '',
    description: ''
  });
  
  // Determinar tipo de usuário baseado no userProfile
  const isAbrigado = userProfile && 'cpf' in userProfile;
  const isInstitution = userProfile && 'cnpj' in userProfile;

  // Inicializar dados de edição quando entrar no modo de edição
  const handleEditClick = () => {
    if (!isEditing && userProfile) {
      if (isInstitution) {
        setEditData({
          cnpj: (userProfile as any).cnpj || '',
          email: (userProfile as any).email || '',
          address: (userProfile as any).address || '',
          telephone: (userProfile as any).telephone || '',
          cpf: '',
          age: '',
          institution_id: '',
          description: ''
        });
      } else if (isAbrigado) {
        setEditData({
          cnpj: '',
          email: (userProfile as any).email || '',
          address: (userProfile as any).address || '',
          telephone: (userProfile as any).telephone || '',
          cpf: (userProfile as any).cpf || '',
          age: (userProfile as any).age || '',
          institution_id: (userProfile as any).institution_id || '',
          description: (userProfile as any).description || ''
        });
      }
    }
    setIsEditing(!isEditing);
  };

  // Salvar alterações
  const handleSave = async () => {
    if (!userProfile) return;
    try {
      if (isInstitution) {
        await updateInstitution(userProfile.id, {
          cnpj: editData.cnpj,
          email: editData.email,
          address: editData.address,
          telephone: editData.telephone
        });
      } else if (isAbrigado) {
        await updateHomeless(userProfile.id, {
          cpf: editData.cpf,
          age: editData.age,
          email: editData.email,
          address: editData.address,
          telephone: editData.telephone,
          institution_id: editData.institution_id,
          description: editData.description
        });
      }
      setIsEditing(false);
      toast.success('Informações atualizadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar informações');
      console.error('Erro:', error);
    }
  };

  // Cancelar edição
  const handleCancel = () => {
    setIsEditing(false);
    if (userProfile) {
      if (isInstitution) {
        setEditData({
          cnpj: (userProfile as any).cnpj || '',
          email: (userProfile as any).email || '',
          address: (userProfile as any).address || '',
          telephone: (userProfile as any).telephone || '',
          cpf: '',
          age: '',
          institution_id: '',
          description: ''
        });
      } else if (isAbrigado) {
        setEditData({
          cnpj: '',
          email: (userProfile as any).email || '',
          address: (userProfile as any).address || '',
          telephone: (userProfile as any).telephone || '',
          cpf: (userProfile as any).cpf || '',
          age: (userProfile as any).age || '',
          institution_id: (userProfile as any).institution_id || '',
          description: (userProfile as any).description || ''
        });
      }
    }
  };

  // Formatação de CNPJ
  const formatCNPJ = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  // Formatação de telefone
  const formatPhone = (value: string): string => {
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

  // Formatação de CPF
  const formatCPF = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  return (
    <>
      <Header />
      <AnimatedPage>
        <Container>
          
          <div className="profile-container">
            {/* Layout para Abrigados */}
            {isAbrigado && (
              <>
                <div className="institution-profile-header">
                  {userProfile && (
                    <div className="institution-info-card">
                      <div className="institution-header-content">
                        <div className="institution-logo">
                          {userProfile.picture ? (
                            <img
                              src={userProfile.picture}
                              alt={userProfile.name || 'Usuário'}
                              className="institution-avatar"
                            />
                          ) : (
                            <div className="institution-avatar">
                              <span className="institution-initial">
                                {userProfile.name?.charAt(0).toUpperCase() || 'U'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="institution-details">
                          <h2 className="institution-name">{userProfile.name || 'Nome não informado'}</h2>
                          <div className="institution-meta">
                            <span className="institution-type">Pessoa em Situação de Rua</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="institution-stats">
                        <div className="stat-item">
                          <div className="stat-icon">🆔</div>
                          <div className="stat-content">
                            <span className="stat-label">CPF</span>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editData.cpf}
                                onChange={(e) => setEditData({...editData, cpf: formatCPF(e.target.value)})}
                                className="stat-input"
                                placeholder="Digite o CPF"
                              />
                            ) : (
                               <span className="stat-value">{(userProfile as any).cpf || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-icon">🎂</div>
                          <div className="stat-content">
                            <span className="stat-label">Idade</span>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editData.age}
                                onChange={(e) => setEditData({...editData, age: e.target.value})}
                                className="stat-input"
                                placeholder="Digite a idade"
                              />
                            ) : (
                               <span className="stat-value">{(userProfile as any).age || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-icon">🏢</div>
                          <div className="stat-content">
                            <span className="stat-label">Instituição</span>
                            {isEditing ? (
                              <select
                                value={editData.institution_id}
                                onChange={(e) => setEditData({...editData, institution_id: e.target.value})}
                                className="stat-input"
                              >
                                <option value="">Selecione uma instituição</option>
                                {institutions.map(institution => (
                                  <option key={institution.id} value={institution.id}>
                                    {institution.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                               <span className="stat-value">{(userProfile as any).institution_name || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-icon">📧</div>
                          <div className="stat-content">
                            <span className="stat-label">E-mail</span>
                            {isEditing ? (
                              <input
                                type="email"
                                value={editData.email}
                                onChange={(e) => setEditData({...editData, email: e.target.value})}
                                className="stat-input"
                                placeholder="Digite o e-mail"
                              />
                            ) : (
                               <span className="stat-value">{(userProfile as any).email || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-icon">📍</div>
                          <div className="stat-content">
                            <span className="stat-label">Localização</span>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editData.address}
                                onChange={(e) => setEditData({...editData, address: e.target.value})}
                                className="stat-input"
                                placeholder="Digite o endereço"
                              />
                            ) : (
                               <span className="stat-value">{(userProfile as any).address || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-icon">📞</div>
                          <div className="stat-content">
                            <span className="stat-label">Contato</span>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editData.telephone}
                                onChange={(e) => setEditData({...editData, telephone: formatPhone(e.target.value)})}
                                className="stat-input"
                                placeholder="Digite o telefone"
                              />
                            ) : (
                               <span className="stat-value">{(userProfile as any).telephone || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-icon">📝</div>
                          <div className="stat-content">
                            <span className="stat-label">Descrição</span>
                            {isEditing ? (
                              <textarea
                                value={editData.description}
                                onChange={(e) => setEditData({...editData, description: e.target.value})}
                                className="stat-input"
                                placeholder="Digite uma descrição"
                                rows={3}
                                style={{resize: 'vertical', minHeight: '60px'}}
                              />
                            ) : (
                               <span className="stat-value">{(userProfile as any).description || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Botões de ação para abrigados */}
                <div className="institution-actions" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                  marginTop: '30px',
                  flexWrap: 'wrap'
                }}>
                  {!isEditing ? (
                    <>
                      <button 
                        onClick={handleEditClick}
                        className="edit-institution-btn"
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                        }}
                      >
                        Editar Informações
                      </button>
                      <button 
                        onClick={() => printToPDF({ 
                          title: 'Perfil do Usuário',
                          filename: 'perfil-usuario.pdf',
                          excludeSelectors: ['.print-button', 'header', 'footer', 'button[type="submit"]', '.edit-button', '.save-button', '.cancel-button']
                        })}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                        }}
                      >
                        Imprimir PDF
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={handleSave}
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        Salvar Alterações
                      </button>
                      <button 
                        onClick={handleCancel}
                        style={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

            {/* Layout para Instituições */}
            {isInstitution && (
              <>
                <div className="institution-profile-header">
                  <div className="institution-welcome-section">
                    <div className="institution-icon">
                      🏢
                    </div>
                    <div className="institution-welcome-content">
                      <h1 className="institution-title">Painel da Instituição</h1>
                      <p className="institution-subtitle">Gerencie as informações da sua organização</p>
                    </div>
                  </div>
                  
                  {userProfile && (
                    <div className="institution-info-card">
                      <div className="institution-header-content">
                        <div className="institution-logo">
                          {userProfile.picture ? (
                            <img
                              src={userProfile.picture}
                              alt={userProfile.name || 'Instituição'}
                              className="institution-avatar"
                            />
                          ) : (
                            <div className="institution-avatar">
                              <span className="institution-initial">
                                {userProfile.name?.charAt(0).toUpperCase() || 'I'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="institution-details">
                          <h2 className="institution-name">{userProfile.name || 'Nome da Instituição'}</h2>
                          <div className="institution-meta">
                            <span className="institution-type">Organização Social</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="institution-stats">
                        <div className="stat-item">
                          <div className="stat-icon">👥</div>
                          <div className="stat-content">
                            <span className="stat-label">Pessoas Atendidas</span>
                            <span className="stat-value">
                              {homeless ? homeless.filter(abrigado => abrigado.institution_id === userProfile.id).length : 0}
                            </span>
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-icon">🏢</div>
                          <div className="stat-content">
                            <span className="stat-label">CNPJ</span>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editData.cnpj}
                                onChange={(e) => setEditData({...editData, cnpj: formatCNPJ(e.target.value)})}
                                className="stat-input"
                                placeholder="Digite o CNPJ"
                              />
                            ) : (
                               <span className="stat-value">{(userProfile as any).cnpj || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-icon">📧</div>
                          <div className="stat-content">
                            <span className="stat-label">E-mail</span>
                            {isEditing ? (
                              <input
                                type="email"
                                value={editData.email}
                                onChange={(e) => setEditData({...editData, email: e.target.value})}
                                className="stat-input"
                                placeholder="Digite o e-mail"
                              />
                            ) : (
                               <span className="stat-value">{(userProfile as any).email || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-icon">📍</div>
                          <div className="stat-content">
                            <span className="stat-label">Localização</span>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editData.address}
                                onChange={(e) => setEditData({...editData, address: e.target.value})}
                                className="stat-input"
                                placeholder="Digite o endereço"
                              />
                            ) : (
                               <span className="stat-value">{(userProfile as any).address || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-icon">📞</div>
                          <div className="stat-content">
                            <span className="stat-label">Contato</span>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editData.telephone}
                                onChange={(e) => setEditData({...editData, telephone: formatPhone(e.target.value)})}
                                className="stat-input"
                                placeholder="Digite o telefone"
                              />
                            ) : (
                               <span className="stat-value">{(userProfile as any).telephone || 'Não informado'}</span>
                             )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Botões de ação para instituições */}
                <div className="institution-actions" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px',
                  marginTop: '30px',
                  flexWrap: 'wrap'
                }}>
                  {!isEditing ? (
                    <button 
                      onClick={handleEditClick}
                      className="edit-institution-btn"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                      }}
                    >
                      Editar Informações
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={handleSave}
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        ✅ Salvar Alterações
                      </button>
                      <button 
                        onClick={handleCancel}
                        style={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        ❌ Cancelar
                      </button>
                    </>
                  )}
                </div>

              </>
            )}
          </div>
        </Container>
        <Footer color={"#354A59"} />
        <ResetPage />
      </AnimatedPage>
    </>
  );
}