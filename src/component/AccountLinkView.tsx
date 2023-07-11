/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import Loader from './Loader';
import AccountLinkForm from './AccountLinkForm';
import AccountLinkContainer from './AccountLinkContainer';
import { mountAccountLinkViewProps } from '../types';
import withBase, { BaseProps } from './withBase';
import AccountLinkCore, { AccountLinkState } from '../core/accountLink';
import SecurityIcon from './SecurityIcon';
import StatusModal from './StatusModal';
import PendingModal from './PendingModal';
import Button from './Button';

export function AccountLinkView({
  options,
  core,
  appearance,
}: mountAccountLinkViewProps & BaseProps) {
  const [state, setState] = useState<AccountLinkState>();
  const [accountLinkCore, setAccountLinkCore] = useState<AccountLinkCore>();

  const pendingMessage: any = {
    PENDING_NEWCREDS: 'Enter valid credentials',
    PENDING_TFA: 'Enter One-Time Passcode',
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

  let percent = state?.message?.auth_percent_complete || 0;
  if (typeof state?.message?.auth_percent_complete === 'undefined') {
    percent = state?.message?.percent_complete || 0;
  }

  const dynamicBarStyle = useMemo(() => {
    const style: any = {};
    const barStyle: any = appearance.elements?.accountLinkProgressBar || {};
    Object.keys(barStyle).forEach((key) => {
      if (
        typeof barStyle[key] === 'string' &&
        barStyle[key].includes('{percent}')
      ) {
        style[key] = barStyle[key].replace('{percent}', percent);
      }
    });

    return style;
  }, [appearance.elements?.accountLinkProgressBar, percent]);

  if (state?.loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 120,
        }}
      >
        <Loader />
      </div>
    );
  }

  if (state?.linking || state?.success || state?.failed || state?.pending) {
    return (
      <AccountLinkContainer hide_title site={accountLinkCore?.site}>
        <div
          data-testid="accountLinkProgress"
          className="accountLinkProgress"
          css={appearance.elements?.accountLinkProgress}
        >
          <div
            className="accountLinkProgressCard"
            css={appearance.elements?.accountLinkProgressCard}
          >
            <p
              className="accountLinkProgressTitle"
              css={appearance.elements?.accountLinkProgressTitle}
            >
              {'Logging in...'}
            </p>
            <SecurityIcon />
            <p
              className="accountLinkProgressDescription"
              css={appearance.elements?.accountLinkProgressDescription}
            >
              {state?.message?.status_message}
            </p>
          </div>
          <div
            style={dynamicBarStyle}
            className="accountLinkProgressBar"
            css={appearance.elements?.accountLinkProgressBar}
          />
        </div>
        <div
          className="accountLinkProgressFooter"
          css={appearance.elements?.accountLinkProgressFooter}
        >
          <Button variant="text" onClick={options.onCancel} title="Cancel" />
        </div>
        <StatusModal
          open={state?.success}
          title="Success!"
          description={state?.message?.status_message}
          buttonText="Browse More Sites"
          onClickButton={options.onCancel}
          onClickClose={options.onCancel}
        />
        <StatusModal
          open={state?.failed}
          variant="error"
          title="Error!"
          description={state?.message?.status_message}
          buttonText="Try a Different Site"
          onClickButton={options.onCancel}
          onClickClose={options.onCancel}
        />
        <PendingModal
          open={Boolean(state?.pending)}
          title={pendingMessage[state?.message?.status] || ''}
          description={state?.message?.status_message}
          buttonText="Verify"
          onClickClose={options.onCancel}
          fields={accountLinkCore?.fields || []}
          disabled={state?.submitting}
          submit={handleSubmit}
          change={(name, value) => accountLinkCore?.change(name, value)}
          values={state?.values}
          site={accountLinkCore?.site}
        />
      </AccountLinkContainer>
    );
  }

  return (
    <div
      data-testid="accountLinkView"
      className="accountLinkView"
      css={appearance.elements?.accountLinkView}
    >
      <AccountLinkContainer site={accountLinkCore?.site}>
        {state?.message?.status_message && (
          <p className="accountLinkStatusMessage">
            {state?.message?.status_message}
          </p>
        )}
        {state?.errors?.map((item: any) => (
          <p
            key={item.message}
            className="accountLinkErrorMessage"
            style={{ color: 'red', marginTop: 4 }}
          >
            {item.message}
          </p>
        ))}
        <AccountLinkForm
          fields={accountLinkCore?.fields || []}
          disabled={state?.submitting}
          submit={handleSubmit}
          change={(name, value) => accountLinkCore?.change(name, value)}
          values={state?.values}
          onCancel={options.onCancel}
        />
      </AccountLinkContainer>
    </div>
  );
}

export default withBase(AccountLinkView);
