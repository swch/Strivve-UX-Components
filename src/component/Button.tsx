/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';

interface ButtonProps {
  id?: string; 
  disabled?: boolean;
  title?: string;
  dataTestId?: string;
  onClick?: () => void;
  style?: React.CSSProperties
  secondary?: boolean;
  type?: string
}

function Button({ dataTestId, disabled, title, onClick, id, secondary, type  }: ButtonProps) {
  const  { appearance } = useBase();
  return (
    <input
      id={id}
      type={type}
      data-testid={dataTestId}
      onClick={onClick}
      css={secondary ? appearance.elements?.secondaryButton : appearance.elements?.button}
      value={title}
      disabled={disabled}
      className='button'
    />
  );
}

export default Button;
