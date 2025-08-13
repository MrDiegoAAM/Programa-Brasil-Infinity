import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100vh - 140px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  .register-container {
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

    @media (max-width: 768px) {
      padding: 30px 20px;
      margin: 20px;
    }
  }

  .register-header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
      font-size: 2.5rem;
      color: #1B187A;
      margin-bottom: 10px;
      font-weight: 700;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    p {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }
  }

  .user-type-selector {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 40px;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 15px;
    }

    .type-button {
      padding: 15px 30px;
      border: 2px solid #e1e5e9;
      background: white;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #666;
      min-width: 150px;

      &:hover {
        border-color: #0057FF;
        color: #0057FF;
        transform: translateY(-2px);
      }

      &.active {
        background: #0057FF;
        border-color: #0057FF;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 87, 255, 0.3);
      }

      @media (max-width: 480px) {
        min-width: 100%;
        padding: 12px 20px;
      }
    }
  }

  .register-form {
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px;
      margin-bottom: 30px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .full-width {
        grid-column: 1 / -1;
      }
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        color: #333;
        font-size: 0.95rem;
        font-weight: 600;
        margin-bottom: 5px;
      }

      input,
      select,
      textarea {
        padding: 14px 16px;
        border: 2px solid #e1e5e9;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background-color: #fff;
        font-family: inherit;

        &:focus {
          outline: none;
          border-color: #0057FF;
          box-shadow: 0 0 0 3px rgba(0, 87, 255, 0.1);
        }

        &::placeholder {
          color: #999;
        }
      }

      textarea {
        resize: vertical;
        min-height: 80px;
      }

      select {
        cursor: pointer;
      }

      .error {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 4px;
        font-weight: 500;
      }
    }

    .form-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      margin-top: 30px;

      .submit-button {
        background: linear-gradient(135deg, #0057FF, #4285F4);
        color: white;
        border: none;
        padding: 16px 40px;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        min-width: 200px;
        box-shadow: 0 8px 20px rgba(0, 87, 255, 0.3);

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(0, 87, 255, 0.4);
        }

        &:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @media (max-width: 480px) {
          width: 100%;
          min-width: auto;
        }
      }

      .login-link {
        text-align: center;

        p {
          color: #666;
          font-size: 0.95rem;
          margin: 0;

          span {
            color: #0057FF;
            cursor: pointer;
            font-weight: 600;
            text-decoration: underline;
            transition: color 0.3s ease;

            &:hover {
              color: #0041CC;
            }
          }
        }
      }
    }
  }

  .select-type-message {
    text-align: center;
    padding: 60px 20px;
    color: #666;
    font-size: 1.1rem;
    background: #f8f9fa;
    border-radius: 12px;
    border: 2px dashed #ddd;

    p {
      margin: 0;
      font-style: italic;
    }
  }
`;