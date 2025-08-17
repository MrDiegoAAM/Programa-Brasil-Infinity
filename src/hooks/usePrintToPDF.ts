import { useCallback } from 'react';

interface PrintOptions {
  title?: string;
  filename?: string;
  excludeSelectors?: string[];
}

export const usePrintToPDF = () => {
  const printToPDF = useCallback((options: PrintOptions = {}) => {
    const {
      title = 'Relatório',
      // filename = 'relatorio.pdf', // Removido - não utilizado
      excludeSelectors = []
    } = options;

    // Criar uma nova janela para impressão
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Por favor, permita pop-ups para imprimir o relatório.');
      return;
    }

    // Clonar o conteúdo atual da página
    const currentContent = document.documentElement.cloneNode(true) as HTMLElement;
    
    // Remover elementos que não devem aparecer no PDF
    const elementsToRemove = [
      'nav',
      'footer',
      '.print-button',
      '.menu',
      '.navigation',
      ...excludeSelectors
    ];
    
    elementsToRemove.forEach(selector => {
      const elements = currentContent.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // Criar o HTML da página de impressão
    const printHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background: white;
              padding: 20px;
            }
            
            h1, h2, h3 {
              color: #1B187A;
              margin-bottom: 15px;
            }
            
            h1 {
              font-size: 24px;
              text-align: center;
              border-bottom: 2px solid #1B187A;
              padding-bottom: 10px;
              margin-bottom: 30px;
            }
            
            .container {
              max-width: 800px;
              margin: 0 auto;
            }
            
            .card {
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
              background: #f9f9f9;
            }
            
            .info-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 15px;
              margin-bottom: 15px;
            }
            
            .info-item {
              display: flex;
              flex-direction: column;
            }
            
            .info-label {
              font-weight: bold;
              color: #555;
              margin-bottom: 5px;
            }
            
            .info-value {
              color: #333;
              padding: 5px 0;
            }
            

            
            img {
              max-width: 100px;
              height: auto;
              border-radius: 50%;
              margin: 10px auto;
              display: block;
            }
            
            @media print {
              body {
                padding: 0;
              }
              
              .card {
                break-inside: avoid;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            ${currentContent.querySelector('main')?.innerHTML || currentContent.querySelector('.container')?.innerHTML || document.body.innerHTML}
          </div>
        </body>
      </html>
    `;

    // Escrever o conteúdo na nova janela
    printWindow.document.write(printHTML);
    printWindow.document.close();

    // Aguardar o carregamento e imprimir
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
  }, []);

  return { printToPDF };
};