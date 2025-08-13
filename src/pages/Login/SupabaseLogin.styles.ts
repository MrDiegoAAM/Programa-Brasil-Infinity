import styled from "styled-components";

export const DivBack = styled.div`
  margin-top: 70px;
  width: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../teaser_unfpa-debates_pop-sit-rua_interno 1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  box-sizing: border-box;

  .container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    display: flex;
    width: 100%;
    max-width: 900px;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    min-height: 500px;

    @media (max-width: 768px) {
      flex-direction: column;
      max-width: 400px;
    }
  }

  .content-left-side {
    flex: 1;
    background: linear-gradient(135deg, #0057FF, #4285F4);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: white;

    @media (max-width: 768px) {
      padding: 30px 20px;
    }
  }

  .content-left-side-text {
    text-align: center;
    max-width: 300px;

    h1 {
      font-size: 2rem;
      margin-bottom: 20px;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 15px;
      }
    }

    p {
      font-size: 1rem;
      line-height: 1.6;
      opacity: 0.9;

      @media (max-width: 768px) {
        font-size: 0.9rem;
      }
    }
  }

  .content-right-side {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 768px) {
      padding: 30px 20px;
    }
  }

  .content-right-side-text {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 10px;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    p {
      color: #666;
      font-size: 0.95rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .input-container {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        color: #333;
        font-size: 0.9rem;
        font-weight: 500;
      }

      input {
        padding: 12px 16px;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
        background-color: #fff;

        &:focus {
          outline: none;
          border-color: #0057FF;
        }

        &::placeholder {
          color: #999;
        }
      }

      .error {
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 4px;
      }
    }

    button[type="submit"] {
      background-color: #0057FF;
      color: white;
      border: none;
      padding: 14px 20px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: 10px;

      &:hover:not(:disabled) {
        background-color: #0041CC;
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }

  .register-link {
    text-align: center;
    margin-top: 20px;

    p {
      color: #666;
      font-size: 0.9rem;

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
`;