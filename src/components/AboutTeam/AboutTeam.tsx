import { DeveloperContainer, DeveloperTitle, DeveloperInfo, DeveloperLink, DeveloperBadge } from './styles';

export default function AboutTeam() {
  return (
    <DeveloperContainer id="team">
      <DeveloperTitle>O desenvolvedor</DeveloperTitle>
      <DeveloperInfo>
        <DeveloperLink 
          href="https://www.linkedin.com/in/diego-madeira-9aa920282/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Diego Madeira
        </DeveloperLink>
        <DeveloperBadge>Desenvolvedor Full-Stack</DeveloperBadge>
      </DeveloperInfo>
    </DeveloperContainer>
  );
}