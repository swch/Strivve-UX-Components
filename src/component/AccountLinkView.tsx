/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import AccountLinkForm from './AccountLinkForm';
import AccountLinkContainer from './AccountLinkContainer';
import { mountAccountLinkViewProps } from '../types';
import withBase, { BaseProps } from './withBase';
import AccountLinkCore, { AccountLinkState } from '../core/accountLink';
import SecurityIcon from './SecurityIcon';
import StatusModal from './StatusModal';
import PendingModal from './PendingModal';

function AccountLinkView({ options, core, appearance }: mountAccountLinkViewProps & BaseProps) {
  const [state, setState] = useState<AccountLinkState>();
  const [accountLinkCore, setAccountLinkCore] = useState<AccountLinkCore>();

  const pendingMessage: any = {
    'PENDING_NEWCREDS': 'Enter valid credentials',
    'PENDING_TFA': 'Enter One-Time Passcode'
  };

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


  const percent = state?.message?.percent_complete || 0;

  if (state?.linking || state?.success || state?.failed || state?.pending) {
    return (
      <AccountLinkContainer site={accountLinkCore?.site}>
        <div style={{ position: 'relative' }} data-testid="accountLinkProgress" className='accountLinkProgress' css={appearance.elements?.accountLinkProgress}>
          <p className='accountLinkProgressTitle' css={appearance.elements?.accountLinkProgressTitle}>Logging in...</p>
          <SecurityIcon />
          <div style={{ height: `${percent}%`, position: 'absolute', bottom: 0, width: '8px', left: 0, background: 'var(--colorSecondary)', zIndex: 1 }} />
          <div style={{ height: `${percent}%`, position: 'absolute', bottom: 0, width: '8px', right: 0, background: 'var(--colorSecondary)', zIndex: 1 }} />
          <div style={{ height: `${percent < 8 ? percent : 8}px`, background: 'var(--colorSecondary)', position: 'absolute', bottom: 0, width: '100%', transitionDuration: '0.5s' }} />
          <div style={{ height: percent === 100 ? '8px' : 0, background: 'var(--colorSecondary)', position: 'absolute', top: 0, width: '100%', transitionDuration: '0.5s' }} />
        </div>
        <StatusModal
          open={state?.success}
          title='Success!'
          description='Your card details were successfully placed on this site.'
          buttonText='Browse More Sites'
          onClickButton={options.onCancel}
          onClickClose={options.onCancel}
        />
        <StatusModal
          open={state?.failed}
          variant='error'
          title='Error!'
          description={state?.message?.status_message}
          buttonText='Try a Different Site'
          onClickButton={options.onCancel}
          onClickClose={options.onCancel}
        />
        <PendingModal
          open={Boolean(state?.pending)}
          title={pendingMessage[state?.message?.status] || ''}
          description={state?.message?.status_message}
          buttonText='Verify'
          onClickButton={options.onCancel}
          onClickClose={options.onCancel}
          fields={accountLinkCore?.fields || []}
          disabled={state?.submitting}
          submit={handleSubmit}
          change={(name, value) => accountLinkCore?.change(name, value)}
          values={state?.values}
          site={accountLinkCore?.site}
        />
      </AccountLinkContainer>
    )
  }

  return (
    <div data-testid="accountLinkView" className='accountLinkView' css={appearance.elements?.accountLinkView}>
      <AccountLinkContainer site={accountLinkCore?.site}>
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