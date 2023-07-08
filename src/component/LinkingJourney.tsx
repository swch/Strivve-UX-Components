/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import withBase, { BaseProps } from './withBase';
import { MerchantSite, mountLinkingJourneyOptions } from '../types';
import SelectSiteView from './SelectSiteView';
import AccountLinkView from './AccountLinkView';
import { StrivveCoreMount, StrivveCoreState } from '../core/core';

export function LinkingJourney({
  selectSiteOptions,
  accountLinkOptions,
  core,
  appearance,
  localization,
}: BaseProps & mountLinkingJourneyOptions) {
  const [sites, setSites] = useState<MerchantSite[]>([]);

  const [state, setState] = useState<StrivveCoreState>();

  useEffect(() => {
    core.subscribe((state: StrivveCoreState) => {
      setState(state);
    });
  }, []);

  return (
    <div data-testid="linkingJourney" className="linkingJourney">
      {state?.mount === StrivveCoreMount.SELECT_SITE && (
        <SelectSiteView
          core={core}
          appearance={appearance}
          localization={localization}
          options={{
            ...selectSiteOptions,
            onSubmit: (sites) => {
              core.setMount(StrivveCoreMount.ACCOUNT_LINK);
              setSites(sites);
            },
          }}
        />
      )}

      {state?.mount === StrivveCoreMount.ACCOUNT_LINK && (
        <div>
          <AccountLinkView
            appearance={appearance}
            localization={localization}
            core={core}
            options={{
              ...accountLinkOptions,
              site_id: sites[0]?.id,
              onCancel: () => {
                core.setMount(StrivveCoreMount.SELECT_SITE);
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default withBase(LinkingJourney);
