import React, { useState, useEffect } from 'react';
import './ProfileForm.css';
import { useData } from '../../contexts/authContext/DataContext';

interface FormData {
  name: string;
  age: string;
  cpf: string;
  rg: string;
  address: string;
  description: string;
  telephone: string;
  email: string;
  document: string;
  organization: string;
  location: string;
  phone: string;
  emergencyContact: string;
  importantInfo: string;
}

interface FormErrors {
  [key: string]: string;
}

const ProfileForm: React.FC = () => {
  const { userProfile, institutions, loadInstitutions } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    cpf: '',
    rg: '',
    address: '',
    description: '',
    telephone: '',
    email: '',
    document: '',
    organization: '',
    location: '',
    phone: '',
    emergencyContact: '',
    importantInfo: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Máscaras
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{1})(\d{4})(\d)/, '$1 $2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  // Validações
  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(numbers)) return false;
    
    // Validação dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(10))) return false;
    
    return true;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório.';
    }

    if (formData.cpf && !validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido. Verifique os dígitos.';
    }

    if (formData.age && (parseInt(formData.age) < 0 || parseInt(formData.age) > 120)) {
      newErrors.age = 'Idade deve estar entre 0 e 120 anos.';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido. Verifique o formato.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Carregar instituições quando o componente for montado
  useEffect(() => {
    loadInstitutions();
  }, [loadInstitutions]);

  // Carregar dados do usuário quando userProfile estiver disponível
  useEffect(() => {
    if (userProfile && 'cpf' in userProfile) {
      console.log('📋 Carregando dados do usuário no ProfileForm:', userProfile);
      setFormData({
        name: userProfile.name || '',
        age: userProfile.age?.toString() || '',
        cpf: userProfile.cpf || '',
        rg: userProfile.rg || '',
        address: userProfile.address || '',
        description: userProfile.description || '',
        telephone: userProfile.telephone || '',
        email: userProfile.email || '',
        document: userProfile.rg || '',
        organization: userProfile.institution_id || '',
        location: userProfile.address || '',
        phone: userProfile.telephone || '',
        emergencyContact: '',
        importantInfo: ''
      });
    }
  }, [userProfile]);

  // Função para verificar se um campo deve ser exibido (só exibe se tem dados)
  const shouldShowField = (fieldValue: string) => {
    return fieldValue && fieldValue.trim() !== '';
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value;
    
    if (field === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (field === 'telephone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    setHasChanges(true);
    
    // Limpa erro do campo quando usuário digita
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simula salvamento
      setIsEditing(false);
      setHasChanges(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      // Foca no primeiro campo com erro
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setHasChanges(false);
    setErrors({});
  };



  return (
    <div className="profile-form-container">
      {showSuccess && (
        <div className="success-banner" role="alert">
          Informações atualizadas com sucesso.
        </div>
      )}
      
      <div className="form-grid">
        {/* Card 1: Informações Pessoais */}
        <div className="form-card">
          <div className="card-header">
            <h2>Informações Pessoais</h2>
            {!isEditing && (
              <button 
                type="button" 
                className="btn-edit"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit}>
            {shouldShowField(formData.name) && (
              <div className="field">
                <label htmlFor="name">Nome completo*</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  maxLength={120}
                  autoComplete="name"
                  readOnly={!isEditing}
                  className={errors.name ? 'invalid' : ''}
                />
                <p className="help">Como está no documento.</p>
                {errors.name && <p className="error" role="alert">{errors.name}</p>}
              </div>
            )}

            {shouldShowField(formData.age) && (
              <div className="field">
                <label htmlFor="age">Idade</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="25"
                  min="0"
                  max="120"
                  inputMode="numeric"
                  readOnly={!isEditing}
                  className={errors.age ? 'invalid' : ''}
                />
                <p className="help">Somente números.</p>
                {errors.age && <p className="error" role="alert">{errors.age}</p>}
              </div>
            )}

            {shouldShowField(formData.cpf) && (
              <div className="field">
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  inputMode="numeric"
                  readOnly={!isEditing}
                  className={errors.cpf ? 'invalid' : ''}
                />
                <p className="help">Formato 000.000.000-00.</p>
                {errors.cpf && <p className="error" role="alert">{errors.cpf}</p>}
              </div>
            )}

            {shouldShowField(formData.document) && (
              <div className="field">
                <label htmlFor="document">Documento de identificação (opcional)</label>
                <input
                  id="document"
                  name="document"
                  type="text"
                  value={formData.document}
                  onChange={(e) => handleInputChange('document', e.target.value)}
                  placeholder="RG, CNH ou outro"
                  maxLength={30}
                  readOnly={!isEditing}
                />
                <p className="help">RG, CNH ou outro.</p>
              </div>
            )}

            {shouldShowField(formData.organization) && (
              <div className="field">
                <label htmlFor="organization">Organização de apoio</label>
                <select
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">Selecione uma instituição</option>
                  {institutions.map(institution => (
                    <option key={institution.id} value={institution.id}>
                      {institution.name}
                    </option>
                  ))}
                </select>
                <p className="help">Selecione a instituição que lhe acompanha.</p>
              </div>
            )}

            {shouldShowField(formData.description) && (
              <div className="field">
                <label htmlFor="description">Conte um pouco sobre você</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Você decide o que compartilhar"
                  maxLength={500}
                  readOnly={!isEditing}
                />
                <div className="textarea-footer">
                  <p className="help">Você decide o que compartilhar (opcional).</p>
                  <span className="char-counter">{formData.description.length}/500</span>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Card 2: Informações de Contato */}
        <div className="form-card">
          <div className="card-header">
            <h2>Informações de Contato</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            {shouldShowField(formData.phone) && (
              <div className="field">
                <label htmlFor="phone">Telefone para contato</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(11) 9 9999-9999"
                  inputMode="tel"
                  autoComplete="tel"
                  readOnly={!isEditing}
                />
                <p className="help">Usado para retornos e avisos.</p>
              </div>
            )}

            {shouldShowField(formData.emergencyContact) && (
              <div className="field">
                <label htmlFor="emergencyContact">Contato de emergência</label>
                <input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="(11) 9 9999-9999"
                  inputMode="tel"
                  readOnly={!isEditing}
                />
                <p className="help">Para recados urgentes.</p>
              </div>
            )}

            {shouldShowField(formData.email) && (
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  readOnly={!isEditing}
                  className={errors.email ? 'invalid' : ''}
                />
                <p className="help">Para receber atualizações (opcional).</p>
                {errors.email && <p className="error" role="alert">{errors.email}</p>}
              </div>
            )}

            {shouldShowField(formData.importantInfo) && (
              <div className="field">
                <label htmlFor="importantInfo">Informação importante para o atendimento</label>
                <textarea
                  id="importantInfo"
                  name="importantInfo"
                  value={formData.importantInfo}
                  onChange={(e) => handleInputChange('importantInfo', e.target.value)}
                  placeholder="Alergias, restrições, preferências"
                  readOnly={!isEditing}
                />
                <p className="help">Alergias, restrições, preferências (opcional).</p>
              </div>
            )}

            {isEditing && (
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={!hasChanges}
                >
                  Salvar
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;