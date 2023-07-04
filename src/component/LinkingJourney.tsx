/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import withBase, { BaseProps } from './withBase';
import { MerchantSite, mountLinkingJourneyOptions } from '../types';
import SelectSiteView from './SelectSiteView';
import AccountLinkView from './AccountLinkView';

export function LinkingJourney({
  selectSiteOptions,
  accountLinkOptions,
  core,
  appearance,
  localization,
}: BaseProps & mountLinkingJourneyOptions) {
  const [step, setStep] = useState(1);
  const [sites, setSites] = useState<MerchantSite[]>([]);

  return (
    <div data-testid="linkingJourney" className="linkingJourney">
      {step === 1 && (
        <SelectSiteView
          core={core}
          appearance={appearance}
          localization={localization}
          options={{
            ...selectSiteOptions,
            onSubmit: (sites) => {
              setStep(2);
              setSites(sites);
            },
          }}
        />
      )}

      {step === 2 && (
        <div>
          <AccountLinkView
            appearance={appearance}
            localization={localization}
            core={core}
            options={{
              ...accountLinkOptions,
              site_id: sites[0]?.id,
              onCancel: () => {
                setStep(1);
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default withBase(LinkingJourney);
