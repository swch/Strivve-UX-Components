/* eslint-disable jsx-a11y/anchor-is-valid */
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

export interface MySiteListProps {
  id?: string;
  sites: MerchantSite[];
  selected: MerchantSite[];
  onSelectItem: Function;
  sendEvent?: (action: any) => void;
}

function MySiteList({
  id,
  sites,
  selected,
  onSelectItem,
  sendEvent,
}: MySiteListProps) {
  const { appearance, localization } = useBase();
  const [openStatus, setOpenStatus] = useState<MerchantSite | null>(null);
  const [scroll, setScroll] = useState<boolean | null>(null);

  const isError = errorStatus.includes(openStatus?.job?.termination_type || '');

  useEffect(() => {
    sendEvent?.({
      component: 'my_site_list',
      action: 'view',
    });
  }, []);

  const errors = sites.filter((item) =>
    errorStatus.includes(item?.job?.termination_type || '')
  );
  const successful = sites.filter((item) => item.job?.status === 'SUCCESSFUL');
  const pendings = sites.filter((item) => item.job?.status === 'UPDATING');

  const renderitem = (item: MerchantSite) => {
    const image = item.images?.find((image: any) => image.width === 128);
    const active = Boolean(selected?.find((m) => m.id === item.id));
    const isError = errorStatus.includes(item.job?.termination_type || '');
    const isSuccess = !isError && item?.job?.status === 'SUCCESSFUL';
    const isUpdating = item.job?.status === 'UPDATING';
    const isDisabled = item.tags?.includes('disabled');

    const percent_complete = item?.job?.percent_complete || 0;

    return (
      <div
        css={appearance.elements?.selectSiteItem}
        style={{ position: 'relative', padding: 4 }}
      >
        <div
          key={(id || '') + item.id}
          id={`selectSiteItem-${id || ''}${item.id}`}
          data-testid={`selectSiteItem-${item.id}`}
          aria-selected={active ? 'true' : 'false'}
          className={`selectSiteItem ${active ? 'selectSiteItemSelected' : ''}`}
          css={appearance.elements?.selectSiteItemCard}
          onClick={() => {
            if (isDisabled) {
            } else if (isSuccess) {
              setOpenStatus(item);
            } else if (isError) {
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
            {isUpdating && (
              <div
                css={appearance.elements?.selectSiteItemDescription}
                className="selectSiteItemDescription"
              >
                Connecting...
              </div>
            )}
            {(isError || isSuccess) && (
              <div
                css={appearance.elements?.selectSiteItemDescription}
                className="selectSiteItemDescription"
              >
                {timeAgo(item.job?.last_updated_on)}
              </div>
            )}
          </div>
          {isSuccess && <SuccessIcon />}
          {isError && <ErrorIcon />}
          {isDisabled && (
            <span css={appearance.elements?.errorText} className="errorText">
              Temporarily
              <br />
              Unavailable
            </span>
          )}
        </div>

        <div
          style={{
            height: percent_complete === 100 ? 0 : `${percent_complete}%`,
          }}
          className="accountLinkProgressBar"
          css={appearance.elements?.accountLinkProgressBar}
        >
          <div css={appearance.elements?.accountLinkLoadingBackground} />
        </div>
      </div>
    );
  };

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
        {errors.length > 0 && (
          <div>
            <p css={appearance.elements?.mySiteTitle}>
              {localization.my_sites_error_title}
            </p>
            <p css={appearance.elements?.mySiteDescription}>
              {localization.my_sites_error_text}
            </p>
            {errors?.map(renderitem)}
          </div>
        )}
        {pendings.length > 0 && (
          <div>
            <p css={appearance.elements?.mySiteTitle}>Pending</p>
            <p
              css={appearance.elements?.mySiteDescription}
            >{`We're waiting on login confirmation from the following sites.`}</p>
            {pendings?.map(renderitem)}
          </div>
        )}
        {successful.length > 0 && (
          <div>
            <p css={appearance.elements?.mySiteTitle}>
              {localization.my_sites_success_title}
            </p>
            <p css={appearance.elements?.mySiteDescription}>
              {localization.my_sites_success_text}
            </p>
            {successful?.map(renderitem)}
          </div>
        )}
      </div>
      <StatusModal
        variant={!isError ? 'success' : 'error'}
        description={
          !isError
            ? localization.placement_success_details_text
            : openStatus?.job?.status_message || ''
        }
        title={
          !isError
            ? localization.placement_success_details_title
            : localization.placement_error_details_title
        }
        buttonText={
          isError
            ? localization.placement_error_details_btn_close
            : localization.placement_success_details_btn_close
        }
        open={Boolean(openStatus)}
        onClickClose={() => setOpenStatus(null)}
        onClickButton={() => setOpenStatus(null)}
      />
    </>
  );
}

export default MySiteList;
