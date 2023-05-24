import Head from 'next/head'
import styles from '@/styles/Custom.module.css'
import Strivve, { MerchantSite, StrivveComponentInterface } from '@strivve/component';
import { useEffect, useState } from 'react';
import appearance from '@/appearance';

export default function Custom() {
  const [site, setSite] = useState<MerchantSite>();
  const [component, setComponent] = useState<StrivveComponentInterface>();
  const [step, setStep] = useState(1);

  const mountAccountLink = (value: MerchantSite) => {
    setStep(2);

  };

  const init = () => {
    const stv = new Strivve();

    const service = stv.createService({
      api_instance: 'customer-dev',
    });

    const core = stv.createCore({
      service,
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '02',
        expiration_year: '24',
        name_on_card: 'Mvick',
      },
    });

    const component = stv.createComponent({ core, appearance });

    setComponent(component);

    const mountSelectSiteOptions = {
      hide_search: true,
      hide_button: true,
      single: true,
      onSubmit: (values: MerchantSite[]) => {
        const site = values[0];
        setSite(site);
        component.unmountSelectSiteView('account-link');
        setStep(2);
        component.mountAccountLinkView('account-link', {
          site_id: site.id,
          hide_title: true,
          onCancel: () => {
            setStep(1);
            component.unmountAccountLinkView('account-link');
            component.mountSelectSiteView('account-link', mountSelectSiteOptions);
          },
          onSubmit: (values) => {
            component.unmountAccountLinkView('account-link');
            setStep(3);
          }
        });
      }
    };

    component.mountSelectSiteView('account-link', mountSelectSiteOptions);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Head>
        <title>Custom Style</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <div
            style={{
              padding: '20px',
            }}
          >
            {
              step === 1 && (
                <div>
                  <p>Select the first site for us to push your updated card info to.</p>
                </div>
              )
            }
            {
              step === 2 && (
                <div>
                  <p>
                    Securely link your account
                  </p>
                  <p>
                    Rest easy. Acme does not store your login credentials.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: 20, marginBottom: 32 }}>
                    <img src='/images/logo.svg' />
                    <img src='/images/lock-icon.svg' />
                    <div style={{ width: 109 }}>
                      <img height={36} src={site?.images[0].url} />
                    </div>
                  </div>
                </div>
              )
            }
            {
              step === 3 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: 20, marginBottom: 32 }}>
                    <img src='/images/logo.svg' />
                    <img src='/images/lock-icon.svg' />
                    <div style={{ width: 109 }}>
                      <img height={36} src={site?.images[0].url} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p>Logging in...</p>
                  </div>
                </div>
              )
            }
          </div>
          <div id="account-link" />
        </div>
      </main>
    </>
  )
}
