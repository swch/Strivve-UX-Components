/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';

interface ButtonProps {
  id?: string; 
  disabled?: boolean;
  title?: string;
  dataTestId?: string;
  onClick?: () => void
  style?: React.CSSProperties
}

function Button({ dataTestId, disabled, title, onClick, id  }: ButtonProps) {
  const  { appearance } = useBase();
  return (
    <input
      id={id}
      type="submit"
      data-testid={dataTestId}
      onClick={onClick}
      css={appearance.elements?.button}
      value={title}
      disabled={disabled}
      className='button'
    />
  );
}

export default Button;
