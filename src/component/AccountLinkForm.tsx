/** @jsxImportSource @emotion/react */
import React from 'react';
import { Field } from '../core/accountLink';
import AccountInput from './AccountInput';
import Button from './Button';
import { useBase } from './withBase';
import StrivveCore from '../core/core';

export interface AccountLinkFormProps {
  fields: Field[];
  submit: React.FormEventHandler<HTMLFormElement>;
  change: (name: string, value: any) => void;
  disabled?: boolean;
  values?: { [key: string]: any };
  onCancel?: () => void;
  forgotLink?: string;
  core?: StrivveCore;
}

function AccountLinkForm({
  fields,
  submit,
  change,
  disabled,
  values,
  onCancel,
  forgotLink,
  core,
}: AccountLinkFormProps) {
  const { appearance } = useBase();

  return (
    <form
      className="accountLinkForm"
      css={appearance.elements?.accountLinkForm}
      onSubmit={(e) => {
        e.preventDefault();
        submit(e);
      }}
    >
      {fields?.map((item, index) => {
        return (
          <AccountInput
            id={`accountInput-${item.name}`}
            key={item.name}
            name={item.name}
            autocomplete="off"
            type={item.type}
            secret={item.secret}
            placeholder={item.label}
            required={item.required ? 'true' : 'false'}
            onChange={(e) => {
              change?.(item.name, e.target.value);
            }}
            value={values?.[item.name] || ''}
            autoFocus={index === 0}
          />
        );
      })}

      {forgotLink && (
        <a
          target="_blank"
          className="accountLinkForgotLink"
          css={appearance.elements?.accountLinkForgotLink}
          href={forgotLink}
          rel="noreferrer"
          onClick={() => {
            core?.sendEvent('click_forgot_password');
          }}
        >
          Forgot your sign-in? Let’s go find it.
        </a>
      )}
      <div
        css={appearance.elements?.accountLinkFooter}
        className="accountLinkFooter"
      >
        {onCancel && (
          <Button
            onClick={() => {
              onCancel();
              core?.sendEvent('click_cancel_account_link');
            }}
            type="button"
            title={'Cancel'}
            variant="outlined"
          />
        )}
        <Button type="submit" title={'Link Account'} disabled={disabled} />
      </div>
    </form>
  );
}

export default AccountLinkForm;
