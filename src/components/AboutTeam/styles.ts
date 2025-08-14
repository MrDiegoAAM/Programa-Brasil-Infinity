import styled from 'styled-components';

export const DeveloperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  margin: 40px auto;
  max-width: 500px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(16, 185, 129, 0.4);
  }
`;

export const DeveloperTitle = styled.h2`
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #10b981, #3b82f6);
    border-radius: 2px;
  }
`;

export const DeveloperInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
`;

export const DeveloperLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #10b981;
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
  padding: 15px 25px;
  background: rgba(16, 185, 129, 0.1);
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ffffff;
    background: linear-gradient(135deg, #10b981, #3b82f6);
    border-color: transparent;
    transform: scale(1.05);
    text-decoration: none;
  }
`;

export const DeveloperBadge = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 15px;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
`;