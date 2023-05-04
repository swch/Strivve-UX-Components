import React from 'react';
import Loader from './Loader';
import AccountLinkForm from './AccountLinkForm';
import AccountLinkContainer from './AccountLinkContainer';
import { customComponentToReact } from './parser';
import { mountAccountLinkViewProps } from '../types';
import withBase from './withBase';

function AccountLinkView({ options, state, accountLinkCore }: mountAccountLinkViewProps & { style: any }) {

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event?.preventDefault()
    accountLinkCore?.submit()
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
      <AccountLinkContainer hide_title={options.hide_title} site={accountLinkCore?.merchant_site}>
        {
          options.components?.progress ? customComponentToReact(options.components?.progress(state.message)) : (
            <>
              <p>{state?.message?.status_message || 'Linking account.'}</p>
              <div
                data-testid={state.failed ? "account-link-error" : state.success ? "account-link-success" : "account-link-progress"}
                style={{
                  border: '1px solid black',
                  height: 20,
                  width: '100%',
                }}
              >
                <div style={{ height: 20, backgroundColor: 'gray', width: `${state.message?.percent_complete || 0}%` }}></div>
              </div>
            </>
          )
        }
      </AccountLinkContainer>
    )
  }


  return (
    <AccountLinkContainer hide_title={options.hide_title} site={accountLinkCore?.merchant_site}>
      {state?.message?.status_message && <p>{state?.message?.status_message}</p>}
      {state?.errors?.map((item: any) => (
        <p style={{ color: 'red', marginTop: 4 }}>{item.message}</p>
      ))}
      <AccountLinkForm
        fields={accountLinkCore?.fields || []}
        disabled={state?.submitting}
        submit={handleSubmit}
        change={(name, value) => accountLinkCore?.change(name, value)}
        values={state.values}
        components={options.components}
      />
    </AccountLinkContainer>
  );
}

export default withBase(AccountLinkView);