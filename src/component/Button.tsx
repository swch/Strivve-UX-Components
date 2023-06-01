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
  type?: "button" | "submit" | "reset"
}

function Button({ dataTestId, disabled, title, onClick, id, secondary, type = 'button'  }: ButtonProps) {
  const  { appearance } = useBase();
  return (
    <button
      id={id}
      type={type}
      data-testid={dataTestId}
      onClick={onClick}
      css={secondary ? appearance.elements?.secondaryButton : appearance.elements?.button}
      disabled={disabled}
      className='button'
    >{title}</button>
  );
}

export default Button;
