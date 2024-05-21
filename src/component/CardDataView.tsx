/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import Loader from './Loader';
import AccountLinkForm from './AccountLinkForm';
import AccountLinkContainer from './AccountLinkContainer';
import {mountCardDataViewProps} from '../types';
import withBase, { BaseProps } from './withBase';
import SecurityIcon from './SecurityIcon';
import StatusModal from './StatusModal';
import PendingModal from './PendingModal';
import Button from './Button';
import WarningModal from './WarningModal';
import Header from './Header';
import CardDataCore, {CardDataState} from "../core/cardDataCore";
import CardDataForm from "./CardDataForm";

export function CardDataView({
                                  options,
                                  core,
                                  appearance,
                                  localization,
                                }: mountCardDataViewProps & BaseProps) {
  const [state, setState] = useState<CardDataState>();
  const [cardDataCore, setCardDataCore] = useState<CardDataCore>();

  useEffect(() => {
    const cardData = core.createCardData(options);
    cardData.subscribe((state: CardDataState) => {
      setState(state);
      options?.subscribe?.(state);
    });
    setCardDataCore(cardData);
  }, []);

  // useEffect(() => {
  //   if (state?.pending) {
  //     core?.sendEvent({
  //       component: 'pending_form_modal',
  //       action: 'view',
  //       site: host,
  //     });
  //   }
  // }, [state?.pending]);

  // useEffect(() => {
  //   if (state?.success || state?.failed) {
  //     core?.sendEvent({
  //       component: 'status_modal',
  //       action: 'view',
  //       site: host,
  //     });
  //   }
  // }, [state?.success, state?.failed]);
  //
  // useEffect(() => {
  //   if (showProgress) {
  //     core?.sendEvent({
  //       component: 'account_link_progress',
  //       action: 'view',
  //       site: host,
  //     });
  //   }
  // }, [showProgress]);

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
      css={appearance.elements?.cardDataView}
    >
      <Header/>
      <CardDataForm
        displayGrid={cardDataCore?.displayGrid || []}
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
