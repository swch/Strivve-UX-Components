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
import WarningModal from './WarningModal';
import AccountLinkCarousel from './AccountLinkCarousel';
import Header from './Header';

export function AccountLinkView({
  options,
  core,
  appearance,
}: mountAccountLinkViewProps & BaseProps) {
  const [state, setState] = useState<AccountLinkState>();
  const [accountLinkCore, setAccountLinkCore] = useState<AccountLinkCore>();
  const [cvvModal, setCvvModal] = useState<boolean>(false);
  const [openWarning, setOpenWarning] = useState<boolean>(false);

  const showProgress =
    state?.linking || state?.success || state?.failed || state?.pending;
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

  useEffect(() => {
    if (state?.pending) {
      core?.sendEvent({
        component: 'pending_form_modal',
        action: 'view',
        site: host,
      });
    }
  }, [state?.pending]);

  useEffect(() => {
    if (state?.success || state?.failed) {
      core?.sendEvent({
        component: 'status_modal',
        action: 'view',
        site: host,
      });
    }
  }, [state?.success, state?.failed]);

  useEffect(() => {
    if (showProgress) {
      core?.sendEvent({
        component: 'account_link_progress',
        action: 'view',
        site: host,
      });
    }
  }, [showProgress]);

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event?.preventDefault();

    if (cvvModal) {
      accountLinkCore?.submitCvv();
      setCvvModal(false);
    } else if (!state?.cvv) {
      setCvvModal(true);
      core?.sendEvent({
        component: 'cvv_form_modal',
        action: 'view',
        site: host,
      });
    } else if (options.onSubmit) {
      options.onSubmit(state?.values);
    } else {
      accountLinkCore?.submit();
    }
  }

  const handleClickCancel = () => {
    options.onCancel?.();
  };

  const percent = state?.percent || 0;
  const host = accountLinkCore?.site?.host || '';

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

  if (showProgress) {
    return (
      <>
        <Header />
        <AccountLinkContainer hide_title site={accountLinkCore?.site}>
          <div
            data-testid="accountLinkProgress"
            className="accountLinkProgress"
            css={appearance.elements?.accountLinkProgress}
          >
            {(options.messages?.length || 0) > 1 ? (
              <AccountLinkCarousel messages={options.messages} />
            ) : (
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
            )}
            <div
              style={dynamicBarStyle}
              className="accountLinkProgressBar"
              css={appearance.elements?.accountLinkProgressBar}
            >
              <div css={appearance.elements?.accountLinkLoadingBackground} />
            </div>
          </div>
          <div
            className="accountLinkProgressFooter"
            css={appearance.elements?.accountLinkProgressFooter}
          >
            <Button
              variant="text"
              onClick={() => {
                setOpenWarning(true);
                core?.sendEvent({
                  component: 'account_link_progress',
                  action: 'close',
                  site: host,
                });
              }}
              title="Cancel"
            />
          </div>
          <StatusModal
            open={state?.success}
            variant="pending"
            title="We’re Still Finishing Up"
            description={
              'This might take a minute. Select another site to update while you wait.'
            }
            buttonText="Browse More Sites"
            onClickButton={() => {
              options.onCancel?.();
              core?.sendEvent({
                component: 'status_modal',
                action: 'submit',
                site: host,
              });
            }}
            onClickClose={() => {
              setOpenWarning(true);
              core?.sendEvent({
                component: 'status_modal',
                action: 'close',
                site: host,
              });
            }}
          />
          <StatusModal
            open={state?.failed}
            variant="error"
            title="Error!"
            description={state?.message?.status_message}
            buttonText="Try a Different Site"
            onClickButton={() => {
              options.onCancel?.();
              core?.sendEvent({
                component: 'status_modal',
                action: 'submit',
                site: host,
              });
            }}
            onClickClose={() => {
              handleClickCancel();
              core?.sendEvent({
                component: 'status_modal',
                action: 'close',
                site: host,
              });
            }}
          />
          <PendingModal
            open={Boolean(state?.pending)}
            title={pendingMessage[state?.pending?.status] || ''}
            description={state?.message?.status_message}
            buttonText="Verify"
            onClickClose={() => {
              core?.sendEvent({
                component: 'pending_form_modal',
                action: 'close',
                site: host,
              });
              setOpenWarning(true);
            }}
            fields={accountLinkCore?.fields || []}
            disabled={state?.submitting}
            submit={(e) => {
              handleSubmit(e);
              core?.sendEvent({
                component: 'pending_form_modal',
                action: 'submit',
                site: host,
              });
            }}
            change={(name, value) => accountLinkCore?.change(name, value)}
            values={state?.values}
            site={accountLinkCore?.site}
          />
          <WarningModal
            open={openWarning}
            site={accountLinkCore?.site}
            onClickLeave={options.onCancel}
            onClickStay={() => setOpenWarning(false)}
          />
        </AccountLinkContainer>
      </>
    );
  }

  return (
    <div
      data-testid="accountLinkView"
      className="accountLinkView"
      css={appearance.elements?.accountLinkView}
    >
      <Header />
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
          forgotLink={accountLinkCore?.site?.forgot_password_page}
          core={core}
          site={accountLinkCore?.site}
        />
      </AccountLinkContainer>
      <PendingModal
        open={cvvModal}
        title={'Enter the CVV'}
        description={
          'To help keep your card secure, enter the CVV on the back of your card'
        }
        buttonText="Confirm"
        onClickClose={() => {
          setOpenWarning(true);
          core?.sendEvent({
            component: 'cvv_form_modal',
            action: 'close',
            site: host,
          });
        }}
        fields={[
          {
            name: 'cvv',
            label: 'CVV',
            required: true,
            secret: true,
            type: 'number',
          },
        ]}
        disabled={state?.submitting}
        submit={(e) => {
          handleSubmit(e);
          core?.sendEvent({
            component: 'cvv_form_modal',
            action: 'submit',
            site: host,
          });
        }}
        change={(name, value) => accountLinkCore?.change(name, value)}
        values={state?.values}
      />
    </div>
  );
}

export default withBase(AccountLinkView);
