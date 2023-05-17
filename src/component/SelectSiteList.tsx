/** @jsxImportSource @emotion/react */
import React from 'react';
import { MerchantSite } from '../types';
import { useBase } from './withBase';
import { customComponentToReact } from './parser';
import { mountSelectSiteViewComponent } from '../types';

export interface SelectSiteListProps {
  sites: MerchantSite[]
  selected: MerchantSite[]
  onSelectItem: Function
  components?: mountSelectSiteViewComponent
}

function SelectSiteList({ sites, components, selected, onSelectItem }: SelectSiteListProps) {
  const { appearance } = useBase();
  const items = sites?.map(item => {
    const image = item.images?.find((image: any) => image.width === 128);
    const active = Boolean(selected?.find(m => m.id === item.id));
    return components?.item ? customComponentToReact(components?.item({ data: item, active, selectItem: () => onSelectItem(item) })) : (
      <div
        key={item.id}
        id={`selectSiteItem-${item.id}`}
        data-testid={`selectSiteItem-${item.id}`}
        aria-selected={active ? "true" : "false"}
        className={`selectSiteItem ${active ? 'selectSiteItemSelected' : ''}`}
        css={active ? appearance.elements?.selectSiteItemSelected : appearance.elements?.selectSiteItem}
        onClick={() => onSelectItem(item)}
      >
        {image ? <img className='selectSiteItemImage' css={appearance.elements?.selectSiteItemImage} alt={item.name} src={image?.url} /> : null}
        <div className='selectSiteItemName' css={appearance.elements?.selectSiteItemName}>
          {item.name}
        </div>
      </div>
    )
  })

  return (
    <div data-testid="selectSiteList" id="selectSiteList" className="selectSiteList" css={appearance.elements?.selectSiteList}>
      {items}
    </div>
  );
}

export default SelectSiteList;