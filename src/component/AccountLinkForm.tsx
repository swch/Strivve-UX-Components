/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { Field } from '../core/accountLink';
import AccountInput from './AccountInput';
import Button from './Button';
import { useBase } from './withBase';
import StrivveCore from '../core/core';
import { MerchantSite } from '../types';

export interface AccountLinkFormProps {
  fields: Field[];
  submit: React.FormEventHandler<HTMLFormElement>;
  change: (name: string, value: any) => void;
  disabled?: boolean;
  values?: { [key: string]: any };
  onCancel?: () => void;
  forgotLink?: string;
  core?: StrivveCore;
  site?: MerchantSite;
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
  site,
}: AccountLinkFormProps) {
  const { appearance } = useBase();

  const host = site?.host || '';

  useEffect(() => {
    if (host) {
      core?.sendEvent({
        component: 'account_link_form',
        action: 'view',
        site: host,
      });
    }
  }, [host]);

  return (
    <form
      className="accountLinkForm"
      css={appearance.elements?.accountLinkForm}
      onSubmit={(e) => {
        e.preventDefault();
        submit(e);
        core?.sendEvent({
          component: 'account_link_form',
          action: 'submit',
          site: host,
        });
      }}
    >
      <p
        className="accountLinkHeaderDescription"
        css={appearance.elements?.accountLinkHeaderDescription}
      >
        Log into {site?.name}
      </p>
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
            core?.sendEvent({
              component: 'account_link_form',
              action: 'forgot_password',
              site: host,
            });
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
              core?.sendEvent({
                component: 'account_link_form',
                action: 'cancel',
                site: host,
              });
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
