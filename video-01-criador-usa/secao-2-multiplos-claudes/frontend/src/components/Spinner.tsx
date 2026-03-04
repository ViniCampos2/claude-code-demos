import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

/**
 * Componente Spinner para indicar carregamento
 *
 * @example
 * ```tsx
 * <Spinner size="medium" color="#3b82f6" />
 * ```
 */
export function Spinner({
  size = 'medium',
  color = '#3b82f6',
  className = ''
}: SpinnerProps) {

  // Mapeamento de tamanhos em pixels
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 40
  };

  const dimension = sizeMap[size];

  return (
    <div
      className={`spinner ${className}`}
      role="status"
      aria-label="Carregando"
      style={{
        width: dimension,
        height: dimension,
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}
    >
      <span style={{
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>
        Carregando...
      </span>
    </div>
  );
}

// CSS-in-JS para a animação (ou adicionar em CSS global)
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Injeta estilos no head (apenas para demo)
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Spinner;
