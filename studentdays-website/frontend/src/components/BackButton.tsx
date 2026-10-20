import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  to,
  label = '← Back',
  style,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (to) {
      navigate(to);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <a
      href={to || '/'}
      onClick={handleClick}
      className={`glass back ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '20px',
        fontSize: '14px',
        padding: '10px 18px',
        borderRadius: '999px',
        color: '#ffffff',
        cursor: 'pointer',
        ...style
      }}
      aria-label="Go back"
    >
      {label}
    </a>
  );
};
