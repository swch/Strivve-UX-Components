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
  autoFocus?: boolean
}

function AccountLinkForm({ fields, submit, change, disabled, values, components, autoFocus }: AccountLinkFormProps) {
  const { style } = useBase();

  return (
    <form
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
              id={`account-link-${item.name}`}
              key={item.name}
              name={item.name}
              autocomplete="off"
              type={item.type}
              placeholder={item.label}
              required={item.required ? "true" : "false"}
              onChange={(e) => change?.(item.name, e.target.value)}
              value={values?.[item.name]}
              autoFocus={index === 0}
            />
          )
        })
      }
      <div
        style={{
          marginTop: style?.spacing_unit,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {
          components?.button ? customComponentToReact(components?.button({ disabled, submit })) : <Button title={'Link'} disabled={disabled} />
        }
      </div>
    </form>
  );
}

export default AccountLinkForm;