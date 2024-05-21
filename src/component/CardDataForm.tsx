/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { Field } from '../core/cardDataCore';
import CardDataInput from './CardDataInput';
import Button from './Button';
import { useBase } from './withBase';
import StrivveCore from '../core/strivveCore';

export interface CardDataFormProps {
  displayGrid: any[];
  fields: Field[];
  submit: React.FormEventHandler<HTMLFormElement>;
  change: (name: string, value: any) => void;
  disabled?: boolean;
  values?: { [key: string]: any };
  onCancel?: () => void;
  core?: StrivveCore;
}

function CardDataForm({
                        displayGrid,
                        fields,
                        submit,
                        change,
                        disabled,
                        values,
                        onCancel,
                        core,
                      } : CardDataFormProps) {
  const { appearance, localization } = useBase();

  return (
    <form
      className="cardDataForm"
      css={appearance.elements?.cardDataForm}
      onSubmit={(e) => {
        e.preventDefault();
        submit(e);
        core?.sendEvent({
          component: 'card_data_form',
          action: 'submit'
        });
      }}
    >
      <p
        className="cardDataHeaderDescription"
        css={appearance.elements?.cardDataHeaderDescription}
      >
        Enter your card and billing information once to update the payment method on all of the sites you've selected.
      </p>

{/*
     {displayGrid.map((row: any[], rowIndex) => { return (
        <div key={rowIndex}>
          { row.map((item: Field, index: number) => { return (
            <CardDataInput
              id={`cardDataInput-${item.name}`}
              key={item.name}
              name={item.name}
              autocomplete={item.name}
              type={item.type}
              secret={item.secret}
              placeholder={item.label}
              // required={item.required ? 'true' : 'false'}
              onChange={(e) => {
                change?.(item.name, e.target.value);
              }}
              value=""
              autoFocus={index === 0}
            />
            ) } )}
        </div>
      ) } )}
*/}

      {fields?.map((item, index) => {
        return (
          <CardDataInput
            id={`cardDataInput-${item.name}`}
            key={item.name}
            name={item.name}
            autocomplete={item.name}
            type={item.type}
            secret={item.secret}
            placeholder={item.label}
            // required={item.required ? 'true' : 'false'}
            onChange={(e) => {
              change?.(item.name, e.target.value);
            }}
            value=""
            autoFocus={index === 0}
          />
        );
      })}

      <div
        css={appearance.elements?.cardDataFooter}
        className="cardDataFooter"
      >
        <Button
          type="submit"
          title={localization.card_data_submit_btn_link}
          disabled={disabled}
        />
      </div>
    </form>
  );
}

export default CardDataForm;