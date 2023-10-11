/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';
import Button from './Button';
import PendingIcon from './icons/PendingIcon';

type StatusModalProps = {
  open?: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  onClickButton?: () => void;
  onClickClose?: () => void;
  variant?: 'success' | 'error' | 'pending';
};

function StatusModal({
  open,
  variant = 'success',
  title,
  description,
  buttonText,
  onClickButton,
  onClickClose,
}: StatusModalProps) {
  const { appearance } = useBase();

  if (!open) {
    return null;
  }

  return (
    <div data-testid="modal" className="modal" css={appearance.elements?.modal}>
      <div className="modalStatus" css={appearance.elements?.modalStatus}>
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            cursor: 'pointer',
          }}
          role="button"
          onClick={onClickClose}
        >
          <svg
            width="12"
            height="13"
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.353553"
              y1="0.646447"
              x2="16.3536"
              y2="16.6464"
              stroke="black"
            />
            <line
              x1="16.3536"
              y1="1.35355"
              x2="0.353554"
              y2="17.3536"
              stroke="black"
            />
          </svg>
        </div>
        {variant === 'success' && (
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="17.4681" cy="17.2667" r="16.6075" stroke="#6BBF00" />
            <path
              d="M25.2442 12.601L15.7261 21.9323L11.2471 17.5411"
              stroke="#6BBF00"
            />
          </svg>
        )}

        {variant === 'error' && (
          <svg
            width="36"
            height="35"
            viewBox="0 0 36 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="25.8536"
              y1="9.35355"
              x2="10.8536"
              y2="24.3536"
              stroke="#FF0000"
            />
            <line
              x1="26.1464"
              y1="24.3536"
              x2="11.1464"
              y2="9.35355"
              stroke="#FF0000"
            />
            <circle cx="18.0297" cy="17.2416" r="16.7416" stroke="#FF0000" />
          </svg>
        )}
        {variant === 'pending' && <PendingIcon />}
        <h3 className="modalTitle" css={appearance.elements?.modalTitle}>
          {title}
        </h3>
        <p
          className="modalDescription"
          css={appearance.elements?.modalDescription}
        >
          {description}
        </p>
        <div style={{ display: 'inline-block' }}>
          {onClickButton && (
            <Button title={buttonText} onClick={onClickButton} />
          )}
        </div>
      </div>
    </div>
  );
}

export default StatusModal;
