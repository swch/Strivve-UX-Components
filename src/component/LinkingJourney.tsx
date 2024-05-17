/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import withBase, {BaseProps} from './withBase';
import {CardBody, MerchantSite, mountLinkingJourneyOptions} from '../types';
import SelectSiteView from './SelectSiteView';
import AccountLinkView from './AccountLinkView';
import {StrivveCoreMount, StrivveCoreState} from '../core/strivveCore';
import IntroView from './IntroView';
import CardDataView from "./CardDataView";

export function LinkingJourney({
  cardDataOptions,
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
      {state?.mount === StrivveCoreMount.CARD_DATA && (
        <CardDataView
          core={core}
          appearance={appearance}
          localization={localization}
          headerOptions={headerOptions}
          options={{
            ...cardDataOptions,
            onSubmit: (values) => {
              // create a cardBody object
              const cardBody: CardBody = {
                pan : values.pan,
                cvv : values.cvv,
                expiration_month: values.expiration_month,
                expiration_year: values.expiration_year,
                name_on_card: values.name_on_card,
                address: {
                  city: values.city,
                  postal_code: values.postal_code,
                  country: values.country,
                  first_name: values.first_name,
                  last_name: values.last_name,
                  email: values.email,
                  phone_number: values.phone_number,
                  address1: values.address1,
                  address2: values.address2,
                  state: values.state,
                  subnational: values.state,
                  is_primary: true
                }
              };

              core.setCard(cardBody);
              core.push(StrivveCoreMount.SELECT_SITE_CAROUSEL);
            }
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
