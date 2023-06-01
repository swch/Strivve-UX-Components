/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import AccountLinkForm from './AccountLinkForm';
import AccountLinkContainer from './AccountLinkContainer';
import { mountAccountLinkViewProps } from '../types';
import withBase, { BaseProps } from './withBase';
import AccountLinkCore, { AccountLinkState } from '../core/accountLink';
import SecurityIcon from './SecurityIcon';
import ModalStatus from './ModalStatus';

function AccountLinkView({ options, core, appearance }: mountAccountLinkViewProps & BaseProps) {
  const [state, setState] = useState<AccountLinkState>();
  const [accountLinkCore, setAccountLinkCore] = useState<AccountLinkCore>()

  useEffect(() => {
    const accountLink = core.createAccountLink(options);
    accountLink.subscribe((state: AccountLinkState) => {
      setState(state);
      options?.subscribe?.(state);
    });
    setAccountLinkCore(accountLink);
  }, []);

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event?.preventDefault();
    if (options.onSubmit) {
      options.onSubmit(state?.values);
    } else {
      accountLinkCore?.submit();
    }
  }

  if (state?.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 120,
        }}
      >
        <Loader />
      </div>
    );
  }

  if (state?.linking || state?.success || state?.failed) {
    return (
      <AccountLinkContainer site={accountLinkCore?.merchant_site}>
        <div data-testid="accountLinkProgress" className='accountLinkProgress' css={appearance.elements?.accountLinkProgress}>
          <p className='accountLinkProgressTitle' css={appearance.elements?.accountLinkProgressTitle}>Logging in...</p>
          <SecurityIcon />
          <div className='accountLinkProgressFooter' css={appearance.elements?.accountLinkProgressFooter}></div>
        </div>
        <ModalStatus
          open={state.success}
          title='Success!'
          description='Your card details were successfully placed on this site.'
          buttonText='Browse More Sites'
          onClickButton={options.onCancel}
          onClickClose={options.onCancel}
        />
      </AccountLinkContainer>
    )
  }

  return (
    <div data-testid="accountLinkView" className='accountLinkView' css={appearance.elements?.accountLinkView}>
      <AccountLinkContainer site={accountLinkCore?.merchant_site}>
        {state?.message?.status_message && <p className='accountLinkStatusMessage'>{state?.message?.status_message}</p>}
        {state?.errors?.map((item: any) => (
          <p key={item.message} className='accountLinkErrorMessage' style={{ color: 'red', marginTop: 4 }}>{item.message}</p>
        ))}
        <AccountLinkForm
          fields={accountLinkCore?.fields || []}
          disabled={state?.submitting}
          submit={handleSubmit}
          change={(name, value) => accountLinkCore?.change(name, value)}
          values={state?.values}
          components={options.components}
          onCancel={options.onCancel}
        />
      </AccountLinkContainer>
    </div>
  );
}

export default withBase(AccountLinkView);