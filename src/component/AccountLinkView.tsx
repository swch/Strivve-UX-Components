/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import Loader from './Loader';
import AccountLinkForm from './AccountLinkForm';
import AccountLinkContainer from './AccountLinkContainer';
import { mountAccountLinkViewProps } from '../types';
import withBase, { BaseProps } from './withBase';
import AccountLinkCore, {
  AccountLinkState,
  failedStatus, Field,
} from '../core/accountLinkCore';
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
  localization,
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

  const isSuccessJob = state?.message?.termination_type === 'BILLABLE';
  const isFailedJob = failedStatus.includes(state?.message?.termination_type);

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

    // figure out if there is any missing card data (with or without grant)
    let card_id = core.card_id ?? core.card.id;
    if ( core.card && !card_id ) {
      // card data is present but no card ID... create a card
      let cardholder = core.service.cardholder;

      const address = core.card?.address;
      if (address) {
        address.cardholder_id = cardholder.id;
      }

      const createCardResponse = await core.service.createCard({
        ...core.card,
        cardholder_id: cardholder.id,
        address
      });

      card_id = createCardResponse.body.id;
    }

    if ( card_id ) {
      const selected_sites = core.selectSiteCore?.sites;
      const missing_fields = await core.service.getMissingCardDataFields(card_id, selected_sites!!);
      const sparse_data_fields = convertMissingFieldstoSparseFields(missing_fields);

      // add the missing fields to the local as well as the accountLinkCore state
      if ( state ) {
        state.missing_fields = missing_fields;
        state.sparse_data_fields = sparse_data_fields;
      }

      if ( accountLinkCore?.state ) {
        accountLinkCore.state.missing_fields = missing_fields
        accountLinkCore.state.sparse_data_fields = sparse_data_fields;
      }

      if (cvvModal) {
        accountLinkCore?.submitCvv(card_id);
        setCvvModal(false);
      } else if ( accountLinkCore?.state?.missing_fields && accountLinkCore?.state?.missing_fields?.length > 0 ) {
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
  }

  const handleClickCancel = () => {
    options.onCancel?.();
  };

  const convertMissingFieldstoSparseFields = (missing_fields: string[]) => {
    const sparse_fields : Field[] = [];

    if ( missing_fields?.includes("cvv") ) {
      sparse_fields?.push(
        {
          name: 'cvv',
          label: 'CVV',
          required: true,
          secret: true,
          type: 'number',
        }
      )
    }
    if ( missing_fields.includes( "phone_number" ) ) {
      sparse_fields?.push(
        {
          name: 'phone_number',
          label: 'Phone number',
          required: true,
          secret: false,
          type: 'number',
        },
      )
    }
    if ( missing_fields.includes("email" ) ) {
      sparse_fields?.push(
        {
          name: 'email',
          label: 'Email',
          required: true,
          secret: false,
          type: 'string',
        }
      )
    }

    return sparse_fields;
  }

  const getSparseFields = () : Field[] => {
    return state?.sparse_data_fields!;
  }

  const percent = state?.percent || 0;
  const host = accountLinkCore?.site?.host || '';

  // console.log('===', accountLinkCore?.site);

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
      <div
        data-testid="accountLinkView"
        className="accountLinkView"
        css={appearance.elements?.accountLinkView}
      >
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
          <StatusModal
            open={state?.success}
            variant={
              isFailedJob ? 'error' : isSuccessJob ? 'success' : 'pending'
            }
            title={
              isFailedJob
                ? 'Error!'
                : isSuccessJob
                ? 'Success!'
                : 'We’re Still Finishing Up'
            }
            description={
              isFailedJob
                ? state.message?.status_message
                : isSuccessJob
                ? localization.logon_card_placement_success_background
                : localization.logon_link_success_text
            }
            buttonText={localization.logon_link_success_btn_browse}
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
            title={localization.placement_error_details_title}
            description={state?.message?.status_message}
            buttonText={localization.logon_link_error_btn}
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
            buttonText={localization.logon_otp_btn_verify || ''}
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
            onClickLeave={() => {
              options.onCancel?.();
              core.cancelJob();
            }}
            onClickStay={() => setOpenWarning(false)}
          />
        </AccountLinkContainer>
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
            title={localization.logon_otp_cancel}
          />
        </div>
      </div>
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
          onCancel={() => {
            setOpenWarning(true);
            core?.sendEvent({
              component: 'cvv_form_modal',
              action: 'close',
              site: host,
            });
          }}
          forgotLink={
            accountLinkCore?.site?.forgot_password_page ||
            accountLinkCore?.site?.login_page
          }
          core={core}
          site={accountLinkCore?.site}
        />
      </AccountLinkContainer>
      <PendingModal
        open={cvvModal}
        title={'Enter missing card data'}
        description={
          'To help keep your card secure, enter the following data for your card'
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
        fields={getSparseFields()}
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
      <WarningModal
        open={openWarning}
        site={accountLinkCore?.site}
        onClickLeave={() => {
          options.onCancel?.();
          core.cancelJob();
        }}
        onClickStay={() => setOpenWarning(false)}
      />
    </div>
  );
}

export default withBase(AccountLinkView);
