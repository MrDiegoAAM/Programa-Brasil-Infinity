import React, { useState, useEffect } from 'react';
import './ProfileForm.css';

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
}

interface FormErrors {
  [key: string]: string;
}

const ProfileForm: React.FC = () => {
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
    emergencyContact: ''
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

  const organizationOptions = [
    'Casa de Acolhimento São José',
    'Centro de Referência Especializado',
    'Fundação Assistência Social',
    'Instituto Vida Nova',
    'Projeto Esperança'
  ];

  const locationOptions = [
    'Unidade Centro',
    'Unidade Norte',
    'Unidade Sul',
    'Unidade Leste',
    'Unidade Oeste'
  ];

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

            <div className="field">
              <label htmlFor="organization">Organização de apoio</label>
              <select
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                disabled={!isEditing}
              >
                <option value="">Selecione…</option>
                {organizationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <p className="help">Selecione a instituição que lhe acompanha.</p>
            </div>

            <div className="field">
              <label htmlFor="location">Local de atendimento</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                disabled={!isEditing}
              >
                <option value="">Selecione…</option>
                {locationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <p className="help">Ex.: Unidade Centro.</p>
            </div>

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
          </form>
        </div>

        {/* Card 2: Informações de Contato */}
        <div className="form-card">
          <div className="card-header">
            <h2>Informações de Contato</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
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

            <div className="field">
              <label htmlFor="importantInfo">Informação importante para o atendimento</label>
              <textarea
                id="importantInfo"
                name="importantInfo"
                placeholder="Alergias, restrições, preferências"
                readOnly={!isEditing}
              />
              <p className="help">Alergias, restrições, preferências (opcional).</p>
            </div>

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