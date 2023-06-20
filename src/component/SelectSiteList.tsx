/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { MerchantSite } from '../types';
import { useBase } from './withBase';
import { customComponentToReact } from './parser';
import { mountSelectSiteViewComponent } from '../types';
import SuccessIcon from './SuccessIcon';
import ErrorIcon from './ErrorIcon';
import StatusModal from './StatusModal';

const errorStatus = [
  'PROCESS_FAILURE',
  'SITE_INTERACTION_FAILURE',
  'USER_DATA_FAILURE',
];

export interface SelectSiteListProps {
  sites: MerchantSite[];
  selected: MerchantSite[];
  onSelectItem: Function;
  components?: mountSelectSiteViewComponent;
}

function SelectSiteList({
  sites,
  components,
  selected,
  onSelectItem,
}: SelectSiteListProps) {
  const { appearance } = useBase();
  const [openStatus, setOpenStatus] = useState<MerchantSite | null>(null);

  const items = sites?.map((item) => {
    const image = item.images?.find((image: any) => image.width === 128);
    const active = Boolean(selected?.find((m) => m.id === item.id));
    const isError = errorStatus.includes(item.job?.termination_type || '');
    return components?.item ? (
      customComponentToReact(
        components?.item({
          data: item,
          active,
          selectItem: () => onSelectItem(item),
        })
      )
    ) : (
      <div
        key={item.id}
        id={`selectSiteItem-${item.id}`}
        data-testid={`selectSiteItem-${item.id}`}
        aria-selected={active ? 'true' : 'false'}
        className={`selectSiteItem ${active ? 'selectSiteItemSelected' : ''}`}
        css={
          active
            ? appearance.elements?.selectSiteItemSelected
            : appearance.elements?.selectSiteItem
        }
        onClick={() => onSelectItem(item)}
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
            <div className="errorText" css={appearance.elements?.errorText}>
              Problem logging in.{' '}
              <a onClick={() => setOpenStatus(item)}>See details</a>
            </div>
          )}
        </div>
        {item.job?.status === 'SUCCESSFUL' && <SuccessIcon />}
        {isError && <ErrorIcon />}
      </div>
    );
  });

  return (
    <>
      <div
        data-testid="selectSiteList"
        id="selectSiteList"
        className="selectSiteList"
        css={appearance.elements?.selectSiteList}
      >
        {items}
      </div>
      <StatusModal
        variant={openStatus?.job?.status === 'SUCCESSFUL' ? 'success' : 'error'}
        description={openStatus?.job?.status_message || ''}
        title="Error!"
        buttonText="Close"
        open={Boolean(openStatus)}
        onClickClose={() => setOpenStatus(null)}
        onClickButton={() => setOpenStatus(null)}
      />
    </>
  );
}

export default SelectSiteList;
