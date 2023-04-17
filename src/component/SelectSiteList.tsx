import React from 'react';
import { MerchantSite } from '../types';
import { useBase } from './withBase';
import { customComponentToReact } from './parser';
import { MountSelectSiteComponent } from '../types';

export interface SelectSiteListProps {
  sites: MerchantSite[]
  selected: MerchantSite[]
  onSelectItem: Function
  components?: MountSelectSiteComponent
  view?: 'list' | 'grid'
}

function SelectSiteList({ sites, view, components, selected, onSelectItem }: SelectSiteListProps) {
  const { style } = useBase();
  const items = sites?.map(item => {
    const image = item.images?.find((image: any) => image.width === 128);
    const active = Boolean(selected?.find(m => m.id === item.id));
    return components?.item ? customComponentToReact(components?.item({ data: item, active, selectItem: () => onSelectItem(item) })) : (
      <div
        key={item.id}
        id={`site-${item.id}`}
        style={{
          boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
          textAlign: 'center',
          border: active ? `1px solid ${style.primary_color}` : '1px solid transparent'
        }}
        onClick={() => onSelectItem(item)}
      >
        {image ? <img style={{ width: '60%', marginTop: 12 }} alt={item.name} src={image?.url} /> : null}
        <div style={{ fontSize: 12, marginBottom: 12, marginTop: 12 }}>
          {item.name}
        </div>
      </div>
    )
  })

  const container = components?.container &&  customComponentToReact(components.container({ data: sites }))

  const render = container ? {
    ...container,
    props: {
      ...container.props,
      children: [
        ...(container.props.chidren || []),
        ...items
      ]
    }
  } : React.createElement('div', {
    id: 'list',
    style: {
      display: 'grid',
      gridTemplateColumns: view === 'list' ? '1fr' : '1fr 1fr 1fr',
      gap: 12,
      maxHeight: 480,
      overflow: 'auto',
      padding: 12
    }
  }, ...items);

  return (
    <>
      {render}
    </>
  );
}

export default SelectSiteList;