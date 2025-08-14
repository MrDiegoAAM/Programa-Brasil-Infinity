import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100vh - 140px);
  background: linear-gradient(135deg, #f8fffe 0%, #e8f5f3 50%, #d4f1ec 100%);
  padding: 60px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  .profile-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 32px;
    box-shadow: 0 20px 60px rgba(45, 156, 139, 0.08), 0 8px 32px rgba(45, 156, 139, 0.04);
    border: 1px solid rgba(45, 156, 139, 0.1);
    padding: 80px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #2d9c8b 0%, #4ade80 50%, #22d3ee 100%);
    }

    @media (max-width: 768px) {
      padding: 40px 25px;
      margin: 20px;
      border-radius: 24px;
    }
  }

  .profile-header {
    text-align: center;
    margin-bottom: 60px;
    position: relative;

    .welcome-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #2d9c8b 0%, #4ade80 100%);
      color: white;
      padding: 12px 24px;
      border-radius: 50px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 24px;
      box-shadow: 0 4px 16px rgba(45, 156, 139, 0.2);
    }

    h1 {
      color: #1a202c;
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 20px;
      letter-spacing: -1px;
      line-height: 1.1;
      background: linear-gradient(135deg, #1a202c 0%, #2d9c8b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      @media (max-width: 768px) {
        font-size: 2.4rem;
        letter-spacing: -0.5px;
      }
    }

    p {
      color: #4a5568;
      font-size: 1.25rem;
      line-height: 1.7;
      max-width: 700px;
      margin: 0 auto;
      font-weight: 400;

      @media (max-width: 768px) {
        font-size: 1.1rem;
      }
    }
  }

  .profile-info-card {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 30px;
    border: 2px solid #e1e5e9;
    transition: all 0.3s ease;

    &:hover {
      border-color: #0057FF;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 87, 255, 0.1);
    }

    h2 {
      color: #1B187A;
      font-size: 1.5rem;
      margin-bottom: 15px;
      font-weight: 600;
      text-align: center;
    }

    p {
      color: #666;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 10px;
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .profile-form-wrapper {
    margin-top: 20px;
  }

  .user-profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
    background: linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%);
    border: 2px solid #a7f3d0;
    border-radius: 24px;
    padding: 32px;
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
    }

    &.institution-header {
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border: 2px solid #93c5fd;

      &::before {
        background: linear-gradient(90deg, #0057FF 0%, #4285F4 100%);
      }

      .user-name {
        color: #1e40af;
      }

      .user-subtitle {
        color: #2563eb;
      }

      .user-avatar {
        border-color: #0057FF;
        box-shadow: 0 4px 16px rgba(0, 87, 255, 0.3);

        &:hover {
          box-shadow: 0 6px 24px rgba(0, 87, 255, 0.4);
        }
      }
    }

    .user-photo {
      flex-shrink: 0;
    }

    .user-avatar {
      width: 156px;
      height: 156px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #10b981;
      box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 24px rgba(16, 185, 129, 0.4);
      }
    }

    .user-info {
      flex: 1;
    }

    .user-name {
      color: #065f46;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
      line-height: 1.2;
    }

    .user-subtitle {
      color: #047857;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
    }

    @media (max-width: 768px) {
      gap: 20px;
      padding: 24px;
      margin-bottom: 32px;

      .user-avatar {
        width: 130px;
        height: 130px;
      }

      .user-name {
        font-size: 1.7rem;
      }

      .user-subtitle {
        font-size: 1rem;
      }
    }
  }

  .profile-form-wrapper {
    margin-top: 20px;
  }

  /* Estilos específicos para Instituições */
  .institution-profile-header {
    margin-bottom: 40px;
  }

  .institution-welcome-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    text-align: center;
    margin-bottom: 40px;
    padding: 40px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%);
    border-radius: 24px;
    border: 2px solid #93c5fd;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #0057FF 0%, #4285F4 100%);
    }

    .institution-icon {
      font-size: 4rem;
      filter: drop-shadow(0 4px 8px rgba(0, 87, 255, 0.2));
    }

    .institution-title {
      color: #1e40af;
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 12px;
      letter-spacing: -1px;
      line-height: 1.1;
      background: linear-gradient(135deg, #1e40af 0%, #0057FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      @media (max-width: 768px) {
        font-size: 2.2rem;
      }
    }

    .institution-subtitle {
      color: #2563eb;
      font-size: 1.2rem;
      font-weight: 500;
      margin: 0;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
      padding: 32px 24px;

      .institution-icon {
        font-size: 3rem;
      }
    }
  }

  .institution-info-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border: 2px solid #e2e8f0;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 10px 40px rgba(0, 87, 255, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 50px rgba(0, 87, 255, 0.12);
      border-color: #0057FF;
    }

    .institution-header-content {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 2px solid #f1f5f9;

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 20px;
      }
    }

    .institution-logo {
      flex-shrink: 0;
    }

    .institution-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #0057FF;
      box-shadow: 0 4px 16px rgba(0, 87, 255, 0.2);
      transition: all 0.3s ease;
      background: linear-gradient(135deg, #0057FF 0%, #4285F4 100%);
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 24px rgba(0, 87, 255, 0.3);
      }

      .institution-initial {
        color: white;
        font-size: 2.5rem;
        font-weight: 700;
      }
    }

    .institution-details {
      flex: 1;
    }

    .institution-name {
      color: #1e293b;
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
      line-height: 1.2;
    }

    .institution-meta {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .institution-cnpj {
        color: #475569;
        font-size: 1rem;
        font-weight: 500;
        font-family: 'Monaco', 'Menlo', monospace;
      }

      .institution-type {
        color: #0057FF;
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .institution-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 30px;
      padding: 20px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      border-radius: 16px;
      border: 1px solid #cbd5e1;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }

      .stat-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
        transition: all 0.3s ease;
        border: 1px solid #e2e8f0;
        min-height: 70px;
        max-width: 100%;
        overflow: hidden;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
          border-color: #3b82f6;
        }

        .stat-icon {
          font-size: 1.2rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          flex-shrink: 0;
          margin-top: 2px;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
          min-width: 0;
          overflow: hidden;

          .stat-label {
            font-size: 0.65rem;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            line-height: 1.1;
          }

          .stat-value {
            font-size: 0.75rem;
            font-weight: 700;
            color: #1e293b;
            line-height: 1.2;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .stat-input {
            font-size: 0.75rem;
            font-weight: 600;
            color: #1e293b;
            background: white;
            border: 2px solid #3b82f6;
            border-radius: 6px;
            padding: 6px 8px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            transition: all 0.3s ease;
            outline: none;
            line-height: 1.2;

            &:focus {
              border-color: #1d4ed8;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }

            &::placeholder {
              color: #94a3b8;
              font-weight: 400;
            }
          }
        }
      }
    }
  }

  .institution-form-wrapper {
    margin-top: 20px;
  }
`;