import styled from "styled-components";

export const CardUser = styled.div`
  width: 100%;
  max-width: 100%;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    background: linear-gradient(135deg, #2d9c8b 0%, #4ade80 50%, #22d3ee 100%);
    color: white;
    padding: 40px 30px;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hearts" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M20,25 C15,15 5,15 5,25 C5,35 20,45 20,45 C20,45 35,35 35,25 C35,15 25,15 20,25 Z" fill="%23ffffff" opacity="0.08"/></pattern></defs><rect width="100" height="100" fill="url(%23hearts)"/></svg>') repeat;
      opacity: 0.4;
    }

    .header-icon {
      font-size: 2.5rem;
      margin-bottom: 12px;
      display: block;
      position: relative;
      z-index: 1;
    }

    h3 {
      margin: 0;
      font-size: 1.9rem;
      font-weight: 600;
      position: relative;
      z-index: 1;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      letter-spacing: -0.3px;
      line-height: 1.3;
    }

    .header-subtitle {
      margin-top: 8px;
      font-size: 0.95rem;
      opacity: 0.9;
      font-weight: 400;
      position: relative;
      z-index: 1;
    }
  }

  .card-content {
    padding: 40px;

    @media (max-width: 768px) {
      padding: 24px;
    }

    .form-container {
      .edit-button-container {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 32px;
        padding: 0 24px;
      }

      /* Estilos UX Fix */
      &.ux-fix * {
        box-sizing: border-box;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      }

      &.ux-fix .field {
        margin-bottom: 32px;
        padding: 0;
        display: flex;
        flex-direction: column;
      }

      &.ux-fix .field label.label {
        display: block !important;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 600;
        color: #374151;
        line-height: 1.4;
        text-align: left;
        letter-spacing: 0.025em;
      }

      &.ux-fix .field input.input,
      &.ux-fix .field select,
      &.ux-fix .field textarea {
        display: block;
        width: 100%;
        min-height: 56px;
        padding: 16px 20px;
        border: 2px solid #D1D5DB;
        border-radius: 12px;
        background: #FFFFFF;
        color: #111827;
        outline: none;
        font-size: 16px;
        font-weight: 400;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
        line-height: 1.5;
        box-sizing: border-box;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Estilos específicos para instituições */
      &.institution-form .field {
        margin-bottom: 28px;
        position: relative;
      }

      &.institution-form .field label.label {
        font-size: 15px;
        font-weight: 700;
        color: #1e40af;
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          border-radius: 1px;
        }
      }

      &.institution-form .field input.input,
      &.institution-form .field select,
      &.institution-form .field textarea {
        border: 2px solid #e2e8f0;
        border-radius: 16px;
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        padding: 18px 24px;
        font-size: 15px;
        font-weight: 500;
        color: #1e293b;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        &::placeholder {
          color: #94a3b8;
          font-style: italic;
        }
      }

      &.institution-form .field input.input:focus,
      &.institution-form .field select:focus,
      &.institution-form .field textarea:focus {
        border-color: #3b82f6;
        background: #ffffff;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12), 0 8px 24px rgba(59, 130, 246, 0.15);
        transform: translateY(-2px);
      }

      &.institution-form .field input.input:read-only,
      &.institution-form .field select:disabled,
      &.institution-form .field textarea:read-only {
        background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
        border-color: #cbd5e1;
        color: #64748b;
        cursor: not-allowed;
        transform: none;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
      }

      &.ux-fix .field input.input::placeholder {
        color: #94A3B8;
      }

      &.ux-fix .field input.input:focus,
      &.ux-fix .field select:focus,
      &.ux-fix .field textarea:focus {
        border-color: #10B981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        background: #FEFFFE;
      }

      &.ux-fix .field input.input:read-only,
      &.ux-fix .field select:disabled,
      &.ux-fix .field textarea:read-only {
        background: #F9FAFB;
        cursor: default;
        color: #6B7280;
        border-color: #E5E7EB;
      }

      &.ux-fix .help {
        margin-top: 8px;
        font-size: 14px;
        color: #6B7280;
        line-height: 1.4;
        font-style: italic;
      }

      &.ux-fix .error {
        margin-top: 6px;
        font-size: 12px;
        color: #DC2626;
        display: none;
      }

      &.ux-fix .input.invalid {
        border-color: #DC2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.20);
      }

      &.ux-fix .btn-edit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        padding: 0 20px;
        border-radius: 8px;
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        border: none;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
      }

      &.ux-fix .btn-edit:hover:not(:disabled) {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      }

      &.ux-fix .btn-edit:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
      }

      &.ux-fix .btn-edit:disabled {
        background: #9CA3AF;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }

      &.ux-fix .form-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px;
        margin-bottom: 50px;
        padding: 32px;
        
        @media (min-width: 768px) {
          grid-template-columns: 1fr 1fr;
          gap: 32px 40px;
        }
        
        .field-full {
          grid-column: 1 / -1;
        }
      }

      .button-group {
        display: flex;
        gap: 20px;
        justify-content: center;
        margin-top: 80px;
        padding-top: 40px;
        border-top: 2px solid #f3f4f6;
        position: relative;
        
        &::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 2px;
          background: linear-gradient(135deg, #2d9c8b, #4ade80);
          border-radius: 2px;
        }

        @media (max-width: 768px) {
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
      }
    }
  }
`;

export const ButtonSalvar = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #059669 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 130px;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.3px;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &::before {
    content: '✓';
    font-size: 1.2rem;
    margin-right: 4px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 12px 30px rgba(16, 185, 129, 0.35);
    background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);
    
    &::after {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }

  &:disabled {
    background: linear-gradient(135deg, #bdc3c7, #95a5a6);
    cursor: default;
    transform: none;
    box-shadow: none;
    opacity: 0.6;
  }
`;

export const ButtonEditar = styled.button`
  background: linear-gradient(135deg, #0057FF, #4285F4);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  box-shadow: 0 4px 12px rgba(0, 87, 255, 0.3);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0041CC, #3367D6);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 87, 255, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ButtonCancelar = styled.button`
  background: linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #475569 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 130px;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.3px;
  box-shadow: 0 8px 25px rgba(100, 116, 139, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &::before {
    content: '↶';
    font-size: 1.2rem;
    margin-right: 4px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 12px 30px rgba(100, 116, 139, 0.3);
    background: linear-gradient(135deg, #475569 0%, #64748b 50%, #94a3b8 100%);
    
    &::after {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }

  &:disabled {
    background: linear-gradient(135deg, #bdc3c7, #95a5a6);
    cursor: default;
    transform: none;
    box-shadow: none;
    opacity: 0.6;
  }
`;
