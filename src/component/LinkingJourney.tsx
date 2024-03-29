/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import withBase, { BaseProps } from './withBase';
import { MerchantSite, mountLinkingJourneyOptions } from '../types';
import SelectSiteView from './SelectSiteView';
import AccountLinkView from './AccountLinkView';
import { StrivveCoreMount, StrivveCoreState } from '../core/core';
import IntroView from './IntroView';

export function LinkingJourney({
  selectSiteOptions,
  accountLinkOptions,
  introOptions,
  core,
  appearance,
  localization,
  headerOptions,
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
      {state?.mount === StrivveCoreMount.INTRO && (
        <IntroView
          core={core}
          appearance={appearance}
          localization={localization}
          headerOptions={headerOptions}
          options={{
            ...(introOptions || {}),
            onClickButton: () => {
              core.push(StrivveCoreMount.SELECT_SITE_CAROUSEL);
            },
          }}
        />
      )}
      {state?.mount.includes('select_site') && (
        <SelectSiteView
          core={core}
          appearance={appearance}
          localization={localization}
          headerOptions={headerOptions}
          options={{
            ...selectSiteOptions,
            onSubmit: (sites) => {
              core.push(StrivveCoreMount.ACCOUNT_LINK);
              setSites(sites);
            },
            view: appearance?.layout?.unstyled
              ? 'list'
              : selectSiteOptions?.view,
          }}
        />
      )}

      {state?.mount === StrivveCoreMount.ACCOUNT_LINK && (
        <div>
          <AccountLinkView
            appearance={appearance}
            localization={localization}
            core={core}
            headerOptions={headerOptions}
            options={{
              ...accountLinkOptions,
              site_id: sites[0]?.id,
              onCancel: () => {
                core.goBack();
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default withBase(LinkingJourney);
