import React from 'react';
import { FaPrint } from 'react-icons/fa';
import styled from 'styled-components';

interface PrintButtonProps {
  onPrint: () => void;
  disabled?: boolean;
}

const PrintButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PrintBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #1B187A, #2563eb);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(27, 24, 122, 0.3);

  &:hover {
    background: linear-gradient(135deg, #2563eb, #1B187A);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(27, 24, 122, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  svg {
    font-size: 18px;
  }
`;

export default function PrintButton({ onPrint, disabled = false }: PrintButtonProps) {
  return (
    <PrintButtonContainer>
      <PrintBtn onClick={onPrint} disabled={disabled}>
        <FaPrint />
        Imprimir PDF
      </PrintBtn>
    </PrintButtonContainer>
  );
}