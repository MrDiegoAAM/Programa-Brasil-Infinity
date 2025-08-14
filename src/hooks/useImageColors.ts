import { useState, useEffect } from 'react';

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

export const useImageColors = (imageSrc: string): ColorPalette | null => {
  const [colors, setColors] = useState<ColorPalette | null>(null);

  useEffect(() => {
    const extractColors = async () => {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) return;
          
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Extrair cores dominantes
          const colorMap = new Map<string, number>();
          
          for (let i = 0; i < data.length; i += 16) { // Amostragem para performance
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            if (a > 128) { // Ignorar pixels transparentes
              const colorKey = `${Math.floor(r/32)*32},${Math.floor(g/32)*32},${Math.floor(b/32)*32}`;
              colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
            }
          }
          
          // Ordenar cores por frequência
          const sortedColors = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([color]) => {
              const [r, g, b] = color.split(',').map(Number);
              return { r, g, b };
            })
            .filter(color => {
              // Filtrar cores muito claras ou muito escuras
              const brightness = (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
              return brightness > 50 && brightness < 200;
            });
          
          if (sortedColors.length >= 3) {
            const primary = sortedColors[0];
            const secondary = sortedColors[1];
            const accent = sortedColors[2];
            
            setColors({
              primary: `rgb(${primary.r}, ${primary.g}, ${primary.b})`,
              secondary: `rgb(${secondary.r}, ${secondary.g}, ${secondary.b})`,
              accent: `rgb(${accent.r}, ${accent.g}, ${accent.b})`
            });
          } else {
            // Cores padrão caso não consiga extrair
            setColors({
              primary: '#0057FF',
              secondary: '#00D4FF', 
              accent: '#4285F4'
            });
          }
        };
        
        img.onerror = () => {
          // Cores padrão em caso de erro
          setColors({
            primary: '#0057FF',
            secondary: '#00D4FF',
            accent: '#4285F4'
          });
        };
        
        img.src = imageSrc;
      } catch (error) {
        console.error('Erro ao extrair cores da imagem:', error);
        setColors({
          primary: '#0057FF',
          secondary: '#00D4FF',
          accent: '#4285F4'
        });
      }
    };
    
    if (imageSrc) {
      extractColors();
    }
  }, [imageSrc]);
  
  return colors;
};