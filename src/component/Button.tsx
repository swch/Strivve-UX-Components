/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';

interface ButtonProps {
  id?: string;
  disabled?: boolean;
  title?: string;
  dataTestId?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  type?: 'button' | 'submit' | 'reset';
}

function Button({
  dataTestId,
  disabled,
  title,
  onClick,
  id,
  variant = 'primary',
  type = 'button',
}: ButtonProps) {
  const { appearance } = useBase();
  return (
    <button
      id={id}
      type={type}
      data-testid={dataTestId}
      onClick={onClick}
      css={
        variant === 'text'
          ? appearance.elements?.textButton
          : variant === 'secondary'
          ? appearance.elements?.secondaryButton
          : variant === 'outlined'
          ? appearance.elements?.outlinedButton
          : appearance.elements?.button
      }
      disabled={disabled}
      className="button"
    >
      {title}
    </button>
  );
}

export default Button;
