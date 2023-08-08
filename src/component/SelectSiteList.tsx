/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { MerchantSite } from '../types';
import { useBase } from './withBase';
import SuccessIcon from './SuccessIcon';
import ErrorIcon from './ErrorIcon';
import StatusModal from './StatusModal';

const errorStatus = [
  'PROCESS_FAILURE',
  'SITE_INTERACTION_FAILURE',
  'USER_DATA_FAILURE',
];

export interface SelectSiteListProps {
  id?: string;
  sites: MerchantSite[];
  selected: MerchantSite[];
  onSelectItem: Function;
  sendEvent?: (action: string) => void;
}

function SelectSiteList({
  id,
  sites,
  selected,
  onSelectItem,
  sendEvent,
}: SelectSiteListProps) {
  const { appearance } = useBase();
  const [openStatus, setOpenStatus] = useState<MerchantSite | null>(null);
  const [scroll, setScroll] = useState<boolean | null>(null);

  const isError = errorStatus.includes(openStatus?.job?.termination_type || '');

  useEffect(() => {
    sendEvent?.('select_site_list - n/a - view');
  }, []);

  return (
    <>
      <div
        data-testid="selectSiteList"
        id="selectSiteList"
        className="selectSiteList"
        css={appearance.elements?.selectSiteList}
        onScroll={() => {
          if (!scroll) {
            sendEvent?.('select_site_list - n/a - scroll');
            setScroll(true);
          }
        }}
      >
        {sites?.map((item) => {
          const image = item.images?.find((image: any) => image.width === 128);
          const active = Boolean(selected?.find((m) => m.id === item.id));
          const isError = errorStatus.includes(
            item.job?.termination_type || ''
          );
          const isSuccess =
            !isError && item?.job?.auth_percent_complete === 100;
          return (
            <div
              key={(id || '') + item.id}
              id={`selectSiteItem-${id || ''}${item.id}`}
              data-testid={`selectSiteItem-${item.id}`}
              aria-selected={active ? 'true' : 'false'}
              className={`selectSiteItem ${
                active ? 'selectSiteItemSelected' : ''
              }`}
              css={
                isSuccess
                  ? appearance.elements?.selectSiteItemSuccess
                  : isError
                  ? appearance.elements?.selectSiteItemError
                  : active
                  ? appearance.elements?.selectSiteItemSelected
                  : appearance.elements?.selectSiteItem
              }
              onClick={() => {
                if (isSuccess) {
                  setOpenStatus(item);
                } else {
                  onSelectItem(item);
                }
              }}
            >
              {image ? (
                <img
                  className="selectSiteItemImage"
                  css={appearance.elements?.selectSiteItemImage}
                  alt={item.name}
                  src={image?.url}
                />
              ) : null}
              <div
                className="selectSiteItemName"
                css={appearance.elements?.selectSiteItemName}
              >
                {item.name}
                {isError && (
                  <div
                    className="errorText"
                    css={appearance.elements?.errorText}
                  >
                    Problem logging in.{' '}
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => setOpenStatus(item)}
                    >
                      See details
                    </a>
                  </div>
                )}
              </div>
              {isSuccess && <SuccessIcon />}
              {isError && <ErrorIcon />}
            </div>
          );
        })}
      </div>
      <StatusModal
        variant={!isError ? 'success' : 'error'}
        description={
          !isError
            ? 'Your card details were successfully placed on this site.'
            : openStatus?.job?.status_message || ''
        }
        title={!isError ? 'Success!' : 'Error!'}
        buttonText="Close"
        open={Boolean(openStatus)}
        onClickClose={() => setOpenStatus(null)}
        onClickButton={() => setOpenStatus(null)}
      />
    </>
  );
}

export default SelectSiteList;
