import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import AccountLinkCore, { FormState, initialStateAccountLink } from '../core/accountLink';
import withBase, { BaseProps } from './withBase';
import AccountLinkForm from './AccountLinkForm';
import AccountLinkContainer from './AccountLinkContainer';
import { MountAccountLinkOptions } from './component';
import { customComponentToReact } from './parser';

interface AccountLinkProps extends BaseProps {
  options: MountAccountLinkOptions
}

function AccountLinkItem({ core, options, id }: AccountLinkProps & { id: string }) {
  const [accountLinkCore, setAccountLinkCore] = useState<AccountLinkCore>()
  const [formState, setFormState] = useState<FormState>({ ...initialStateAccountLink, loading: true, linking: Boolean(options.quick_start) });

  const init = async () => {
    const accountLinkCore: AccountLinkCore = await core.createAccountLink({ merchant_site_id: id || '', quick_start: options.quick_start });
    setAccountLinkCore(accountLinkCore);
    accountLinkCore.subscribe((state: any) => {

      setFormState({
        ...state
      });
    })
  }

  useEffect(() => {
    init();

    return () => {
      accountLinkCore?.query?.removeAll();
    }
  }, [])


  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event?.preventDefault()
    accountLinkCore?.submit()
  }

  if (formState?.loading) {
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

  if (formState?.linking || formState?.success || formState?.failed) {
    return (
      <AccountLinkContainer hide_title={options.hide_title} site={accountLinkCore?.merchant_site}>
        {
          options.components?.progress ? customComponentToReact(options.components?.progress(formState.message)) : (
            <>
              <p>{formState?.message?.status_message || 'Linking account.'}</p>
              <div
                data-testid={formState.failed ? "account-link-error" : formState.success ? "account-link-success" : "account-link-progress"}
                style={{
                  border: '1px solid black',
                  height: 20,
                  width: '100%',
                }}
              >
                <div style={{ height: 20, backgroundColor: 'gray', width: `${formState.message?.percent_complete || 0}%` }}></div>
              </div>
            </>
          )
        }
      </AccountLinkContainer>
    )
  }


  return (
    <AccountLinkContainer hide_title={options.hide_title} site={accountLinkCore?.merchant_site}>
      {formState?.message?.status_message && <p>{formState?.message?.status_message}</p>}
      {formState?.errors?.map(item => (
        <p style={{ color: 'red', marginTop: 4 }}>{item.message}</p>
      ))}
      <AccountLinkForm
        fields={accountLinkCore?.fields || []}
        disabled={formState?.submitting}
        submit={handleSubmit}
        change={(name, value) => accountLinkCore?.change(name, value)}
        values={formState.values}
        components={options.components}
      />
    </AccountLinkContainer>
  );
}

function AccountLink({ core, options, style }: AccountLinkProps) {
  const ids = Array.isArray(options.merchant_site_id) ? options.merchant_site_id || [] : [options.merchant_site_id];
  return (
    <div>
      {
        ids.map(item => (
          <div style={{ marginBottom: style.spacing_unit }} key={item}>
            <AccountLinkItem id={item as string} core={core} options={options} style={style} />
          </div>
        ))
      }
    </div>
  )
}

export default withBase(AccountLink);