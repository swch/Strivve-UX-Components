/** @jsxImportSource @emotion/react */
import React from 'react';
import { useBase } from './withBase';
import Button from './Button';
import { Field } from '../core/accountLink';
import AccountInput from './AccountInput';
import { MerchantSite } from '../types';

type PendingModalProps = {
  open?: boolean;
  title: string;
  description: string;
  buttonText: string;
  onClickClose?: () => void;
  fields: Field[];
  values?: { [key: string]: any };
  disabled?: boolean;
  change: (name: string, value: any) => void;
  submit: React.FormEventHandler<HTMLFormElement>;
  site?: MerchantSite;
};

function PendingModal({
  open,
  title,
  description,
  buttonText,
  onClickClose,
  fields,
  change,
  values,
  submit,
  site,
}: PendingModalProps) {
  const { appearance } = useBase();

  const image = site?.images?.find((item: any) => item.width === 128);

  if (!open) {
    return null;
  }

  return (
    <div data-testid="modal" className="modal" css={appearance.elements?.modal}>
      <div className="modalStatus" css={appearance.elements?.modalStatus}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(e);
          }}
        >
          {image ? (
            <img
              alt="Site Logo"
              src={image.url}
              css={appearance.elements?.accountLinkHeaderImage}
              className="accountLinkHeaderImage"
            />
          ) : null}
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

          <h3>{title}</h3>
          <p>{description}</p>
          {fields?.map((item, index) => {
            return (
              <AccountInput
                id={`accountInput-${item.name}`}
                key={item.name}
                name={item.name}
                autocomplete="off"
                type={item.type}
                placeholder={item.label}
                required={item.required ? 'true' : 'false'}
                onChange={(e) => change?.(item.name, e.target.value)}
                value={values?.[item.name] || ''}
                autoFocus={index === 0}
              />
            );
          })}
          <div style={{ display: 'inline-block' }}>
            <Button title={buttonText} type="submit" variant="secondary" />
            <Button title="Cancel" variant="text" onClick={onClickClose} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PendingModal;
