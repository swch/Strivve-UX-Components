import React, { useState } from 'react';
import withBase, { BaseProps } from './withBase';
import SelectSite from './SelectSite';
import { MerchantSite } from '../service/types';
import AccountLink from './AccountLink';
import Button from './Button';
import { MountFullAccountLinkOptions } from './component';

interface FullAccountLinkingProps extends BaseProps {
  options: MountFullAccountLinkOptions
}

function FullAccountLinking({ core, style, options }: FullAccountLinkingProps) {
  const [selected, setSelected] = useState<MerchantSite[]>([]);
  const [step, setStep] = useState(1);
  return (
    <div>
      {
        step === 2 ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: 'flex-end'
              }}
            >
              <Button title='Back' onClick={() => setStep(1)} />
            </div>
            {
              selected.map(item => (
                <div key={item.id} style={{ marginTop: style.spacing_unit }}>
                  <AccountLink
                    core={core}
                    style={style}
                    options={{ ...options.account_link, merchant_site_id: item.id }}
                  />
                </div>
              ))
            }

          </div>
        ) : (
          <SelectSite
            core={core}
            style={style}
            options={{
              onSubmit: (value: any) => {
                setSelected(value);
                setStep(2);
              },
              ...options.select_sites
            }}
          />
        )
      }
    </div>
  );
}

export default withBase(FullAccountLinking);