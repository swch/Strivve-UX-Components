/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';

interface ButtonProps {
  id?: string; 
  disabled?: boolean;
  title?: string;
  onClick?: () => void
  style?: React.CSSProperties
}

function Button({ disabled, title, onClick, style, id  }: ButtonProps) {
  const  { style:  baseStyle } = useBase();
  return (
    <input
      id={id}
      type="submit"
      onClick={onClick}
      css={{
        background: baseStyle?.primary_color || '',
        border: 'none',
        color: 'white',
        fontFamily: baseStyle?.font_family || '',
        fontSize: baseStyle?.font_size || '',
        borderRadius: baseStyle?.border_radius || '',
        padding: '12px 16px',
        cursor: 'pointer',
        '&:disabled': {
          background: 'gray'
        },
      }}
      style={style}
      value={title}
      disabled={disabled}
    />
  );
}

export default Button;
