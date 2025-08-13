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
`;