/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { MerchantSite } from '../types';
import timeAgo from './timeAgo';
import { useBase } from './withBase';
import SuccessIcon from './SuccessIcon';
import ErrorIcon from './ErrorIcon';
import StatusModal from './StatusModal';
import { errorStatus } from '../constans';

interface SiteItemProps {
  id?: string;
  item: MerchantSite;
  selected?: MerchantSite[];
  onSelectItem?: (data: MerchantSite) => void;
}

function SiteItem({ id, item, selected, onSelectItem }: SiteItemProps) {
  const { appearance } = useBase();
  const [openStatus, setOpenStatus] = useState<MerchantSite | null>(null);

  const image = item.images?.find((image: any) => image.width === 128);
  const active = Boolean(selected?.find((m) => m.id === item.id));
  const isError = errorStatus.includes(item.job?.termination_type || '');
  const isSuccess = !isError && item?.job?.status === 'SUCCESSFUL';
  const isUpdating = item.job?.status === 'UPDATING';
  const isDisabled = item.tags?.includes('disabled');

  const percent_complete = item?.job?.percent_complete || 0;

  return (
    <>
      <div
        className='selectSiteItemHeader'
        css={appearance.elements?.selectSiteItemHeader}
        style={{ position: 'relative', padding: 4 }}
      >
        <div
          key={(id || '') + item.id}
          id={`selectSiteItem-${id || ''}${item.id}`}
          data-testid={`selectSiteItem-${item.id}`}
          aria-selected={active ? 'true' : 'false'}
          className={`selectSiteItemCard ${active ? 'selectSiteItemSelected' : ''}`}
          css={appearance.elements?.selectSiteItemCard}
          onClick={() => {
            if (isDisabled) {
            } else if (isSuccess) {
              setOpenStatus(item);
            } else {
              onSelectItem?.(item);
            }
          }}
          style={{
            height: '30px',
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
            {isError && (
              <div className="errorText" css={appearance.elements?.errorText}>
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

export default SiteItem;
