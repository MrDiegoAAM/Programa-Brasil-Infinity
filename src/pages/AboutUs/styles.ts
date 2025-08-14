import styled, { keyframes } from "styled-components";

// Animações
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const DivBackground = styled.div`
  /* Design System Variables */
  --bg-primary: #0a0f1c;
  --bg-secondary: #1a1f2e;
  --surface: #252b3d;
  --surface-hover: #2d3548;
  --brand-cyan: #00d4ff;
  --brand-blue: #4a9eff;
  --accent: #22d3ee;
  --text-primary: #ffffff;
  --text-secondary: #b8c5d6;
  --text-muted: #8a96a8;
  --border: rgba(255, 255, 255, 0.1);
  --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 10px 25px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.3);
  --radius: 12px;
  --radius-lg: 20px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  width: 100%;
  min-height: 100vh;
  margin: 70px 0px 0px 0px;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(74, 158, 255, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  /* Container principal */
  .content-container {
    padding: 60px 0;
    
    @media (max-width: 768px) {
      padding: 40px 0;
    }
  }
  
  /* Header Hero */
  .hero-header {
    text-align: center;
    margin-bottom: 80px;
    animation: ${fadeInUp} 0.8s ease-out;
    
    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      background: linear-gradient(135deg, var(--brand-cyan), var(--brand-blue));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 20px;
      line-height: 1.1;
    }
    
    .hero-subtitle {
      font-size: clamp(1.1rem, 2vw, 1.4rem);
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto 40px;
      line-height: 1.6;
    }
    
    .hero-badges {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 40px;
      
      .badge {
        padding: 8px 20px;
        background: rgba(0, 212, 255, 0.1);
        border: 1px solid rgba(0, 212, 255, 0.3);
        border-radius: 25px;
        color: var(--brand-cyan);
        font-size: 0.9rem;
        font-weight: 600;
        transition: var(--transition);
        
        &:hover {
          background: rgba(0, 212, 255, 0.2);
          transform: translateY(-2px);
        }
      }
    }
    
    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 15px 30px;
      background: linear-gradient(135deg, var(--brand-cyan), var(--brand-blue));
      color: var(--bg-primary);
      text-decoration: none;
      border-radius: 50px;
      font-weight: 700;
      font-size: 1.1rem;
      box-shadow: var(--shadow-md);
      transition: var(--transition);
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg);
      }
      
      .icon {
        font-size: 1.2rem;
      }
    }
  }
  
  /* Grid de seções */
  .sections-grid {
    display: grid;
    gap: 40px;
    margin-bottom: 60px;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
  }
  
  /* Cards de seção */
  .section-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 40px;
    transition: var(--transition);
    animation: ${fadeInUp} 0.8s ease-out;
    animation-fill-mode: both;
    
    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.4s; }
    
    &:hover {
      background: var(--surface-hover);
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .section-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, var(--brand-cyan), var(--brand-blue));
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin-bottom: 20px;
      animation: ${float} 3s ease-in-out infinite;
    }
    
    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 15px;
    }
    
    .section-content {
      color: var(--text-secondary);
      line-height: 1.6;
      font-size: 1rem;
    }
  }
  
  /* Seção de funcionalidades */
  .features-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 50px;
    margin-bottom: 60px;
    animation: ${fadeInUp} 0.8s ease-out 0.5s both;
    
    .features-title {
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 40px;
      
      &::before {
        content: "⚡";
        display: block;
        font-size: 3rem;
        margin-bottom: 10px;
      }
    }
    
    .features-grid {
      display: grid;
      gap: 20px;
      
      @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      }
    }
    
    .feature-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 20px;
      background: rgba(0, 212, 255, 0.05);
      border: 1px solid rgba(0, 212, 255, 0.1);
      border-radius: var(--radius);
      transition: var(--transition);
      
      &:hover {
        background: rgba(0, 212, 255, 0.1);
        transform: translateX(5px);
      }
      
      .feature-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, var(--brand-cyan), var(--brand-blue));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        flex-shrink: 0;
      }
      
      .feature-text {
        color: var(--text-secondary);
        font-weight: 500;
      }
    }
  }
  

`;

export { DivBackground, Main };
