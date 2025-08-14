import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useImageColors } from '../../hooks/useImageColors';
import Logo from '../../img/Logo.png';

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
}

// Animações
const colorShift = keyframes`
  0% { filter: hue-rotate(0deg) brightness(1) saturate(1); }
  25% { filter: hue-rotate(90deg) brightness(1.1) saturate(1.2); }
  50% { filter: hue-rotate(180deg) brightness(1.2) saturate(1.4); }
  75% { filter: hue-rotate(270deg) brightness(1.1) saturate(1.2); }
  100% { filter: hue-rotate(360deg) brightness(1) saturate(1); }
`;

const textGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
  50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor; }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const StyledTitle = styled.h1<{ $colors: { primary: string; secondary: string; accent: string } | null }>`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.1;
  position: relative;
  display: inline-block;
  
  ${({ $colors }) => {
    if ($colors) {
      return css`
        background: linear-gradient(
          135deg,
          ${$colors.primary} 0%,
          ${$colors.secondary} 35%,
          ${$colors.accent} 70%,
          ${$colors.primary} 100%
        );
        background-size: 300% 300%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: ${gradientMove} 4s ease-in-out infinite;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            ${$colors.primary}20 0%,
            ${$colors.secondary}20 35%,
            ${$colors.accent}20 70%,
            ${$colors.primary}20 100%
          );
          background-size: 300% 300%;
          border-radius: 15px;
          z-index: -1;
          animation: ${gradientMove} 4s ease-in-out infinite;
          filter: blur(20px);
          opacity: 0.6;
        }
        
        &:hover {
          animation: ${gradientMove} 2s ease-in-out infinite, ${textGlow} 2s ease-in-out infinite;
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
      `;
    } else {
      return css`
        background: linear-gradient(135deg, #0057FF, #00D4FF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: ${colorShift} 3s ease-in-out infinite;
      `;
    }
  }}
  
  transition: all 0.3s ease;
  cursor: default;
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 3rem);
  }
`;

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ children, className }) => {
  const colors = useImageColors(Logo);
  
  return (
    <StyledTitle $colors={colors} className={className}>
      {children}
    </StyledTitle>
  );
};

export default AnimatedTitle;