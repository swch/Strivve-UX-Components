/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { MerchantSite } from '../types';
import { useBase } from './withBase';
import SuccessIcon from './SuccessIcon';
import ErrorIcon from './ErrorIcon';
import StatusModal from './StatusModal';
import timeAgo from './timeAgo';

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
  sendEvent?: (action: any) => void;
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
    sendEvent?.({
      component: 'select_site_list',
      action: 'view',
    });
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
            sendEvent?.({
              component: 'select_site_list',
              action: 'scroll',
            });
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
          const isSuccess = !isError && item?.job?.status === 'SUCCESSFUL';
          const isUpdating = item.job?.status === 'UPDATING';
          const isDisabled = item.tags?.includes('disabled');

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
                isDisabled
                  ? appearance.elements?.selectSiteItemDisabled
                  : appearance.elements?.selectSiteItem
              }
              onClick={() => {
                if (isDisabled) {
                } else if (isSuccess) {
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
                {(isError || isSuccess) && (
                  <div
                    css={appearance.elements?.selectSiteItemDescription}
                    className="selectSiteItemDescription"
                  >
                    {timeAgo(item.job?.last_updated_on)}
                  </div>
                )}
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
              {isUpdating && (
                <span
                  css={appearance.elements?.selectSiteItemDescription}
                  className="selectSiteItemDescription"
                >
                  In progress
                </span>
              )}
              {isDisabled && (
                <span
                  css={appearance.elements?.errorText}
                  className="errorText"
                >
                  Temporarily
                  <br />
                  Unavailable
                </span>
              )}
            </div>
          );
        })}
      </div>
      <StatusModal
        variant={!isError ? 'success' : 'error'}
        description={
          !isError
            ? 'Your card details were successfully placed on this site'
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
