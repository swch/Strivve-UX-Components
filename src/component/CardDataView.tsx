/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import CardDataForm from './CardDataForm';
import {mountCardDataViewProps} from '../types';
import withBase, { BaseProps } from './withBase';
import { CardDataState } from '../core/cardData';
import Header from './Header';
import CardDataCore from "../core/cardData";

export function CardDataView({ appearance, localization, core, options,
                                }: BaseProps & mountCardDataViewProps ) {
  const [state, setState] = useState<CardDataState>();
  const [cardDataCore, setCardDataCore] = useState<CardDataCore>();

  useEffect(() => {
    const cardData = core.createCardData(options);
    setCardDataCore(cardData);
  }, []);

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event?.preventDefault();

    if (options?.onSubmit) {
      options?.onSubmit(state?.values);
    } else {
      cardDataCore?.submit();
    }
  }

  const handleClickCancel = () => {
    options?.onCancel?.();
  };

  return (
    <div
      data-testid="cardDataView"
      className="cardDataView"
      css={appearance.elements?.cardDataForm}
    >
      <Header/>
      <CardDataForm
        fields={cardDataCore?.fields || []}
        disabled={state?.submitting}
        submit={handleSubmit}
        change={(name, value) => cardDataCore?.change(name, value)}
        values={state?.values}
        onCancel={() => {
          core?.sendEvent({
            action: 'close'
          });
        }}
        core={core}
      />
    </div>
  );
}

export default withBase(CardDataView);
