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
        margin-bottom: 24px;
      }

      /* Estilos UX Fix */
      &.ux-fix * {
        box-sizing: border-box;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      }

      &.ux-fix .field {
        margin-bottom: 16px;
      }

      &.ux-fix .field label.label {
        display: block !important;
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #0F172A;
        line-height: 1.35;
        word-break: keep-all;
      }

      &.ux-fix .field input.input,
      &.ux-fix .field select,
      &.ux-fix .field textarea {
        display: block;
        width: 100%;
        min-height: 44px;
        padding: 10px 12px;
        border: 1px solid #CBD5E1;
        border-radius: 10px;
        background: #FFFFFF;
        color: #0F172A;
        outline: none;
        font-size: 16px;
        font-weight: 400;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
        line-height: 1.5;
        box-sizing: border-box;
        transition: all 0.2s ease;
      }

      &.ux-fix .field input.input::placeholder {
        color: #94A3B8;
      }

      &.ux-fix .field input.input:focus,
      &.ux-fix .field select:focus,
      &.ux-fix .field textarea:focus {
        border-color: #10B981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
      }

      &.ux-fix .field input.input:read-only {
        background: #f9fafb;
        cursor: default;
        color: #6b7280;
        border-color: #CBD5E1;
      }

      &.ux-fix .help {
        margin-top: 6px;
        font-size: 12px;
        color: #64748B;
        line-height: 1.3;
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
        height: 40px;
        padding: 0 16px;
        border-radius: 10px;
        background: #10B981;
        color: #fff;
        font-weight: 600;
        border: 1px solid transparent;
        cursor: pointer;
      }

      &.ux-fix .btn-edit:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.35);
      }

      &.ux-fix .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-bottom: 32px;
        align-items: start;

        @media (max-width: 968px) {
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .full-width {
          grid-column: 1 / -1;
        }
      }

      .button-group {
        display: flex;
        gap: 25px;
        justify-content: center;
        margin-top: 50px;
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
  padding: 18px 36px;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 160px;
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
  padding: 18px 36px;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 160px;
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
