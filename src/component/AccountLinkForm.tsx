/** @jsxImportSource @emotion/react */
import React from 'react';
import { Field } from '../core/accountLink';
import AccountInput from './AccountInput';
import Button from './Button';
import { useBase } from './withBase';
import { customComponentToReact } from './parser';
import { mountAccountLinkViewComponents } from '../types';

export interface AccountLinkFormProps {
  fields: Field[]
  submit: React.FormEventHandler<HTMLFormElement>
  change: (name: string, value: any) => void
  disabled?: boolean
  values?: { [key: string]: any }
  components?: mountAccountLinkViewComponents
  onCancel?: () => void
}

function AccountLinkForm({ fields, submit, change, disabled, values, components, onCancel }: AccountLinkFormProps) {
  const { appearance } = useBase();

  return (
    <form
      className='accountLinkForm'
      css={appearance.elements?.accountLinkForm}
      onSubmit={(e) => {
        e.preventDefault()
        submit(e)
      }}
    >
      {
        fields?.map((item, index) => {
          const element = components?.input?.({ ...item, change });

          if (element) {
            return customComponentToReact(element)
          }
          return (
            <AccountInput
              id={`accountInput-${item.name}`}
              key={item.name}
              name={item.name}
              autocomplete="off"
              type={item.type}
              placeholder={item.label}
              required={item.required ? "true" : "false"}
              onChange={(e) => {
                change?.(item.name, e.target.value);
              }}
              value={values?.[item.name] || ""}
              autoFocus={index === 0}
            />
          )
        })
      }
      <div
        css={appearance.elements?.accountLinkFooter}
        className='accountLinkFooter'
      >
        {onCancel && (<Button onClick={onCancel} type='button' title={'Cancel'} variant='outlined' />)}
        <Button type='submit' title={'Link Account'} disabled={disabled} />
      </div>
    </form>
  );
}

export default AccountLinkForm;