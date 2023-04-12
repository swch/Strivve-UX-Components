import React, { useEffect, useState } from 'react';
import withBase, { BaseProps } from './withBase';
import SelectSiteCore, { SelectSiteState, initialStateSelectSite } from '../core/selectSite';
import SelectSiteList from './SelectSiteList';
import Loader from './Loader';
import AccountInput from './AccountInput';
import Button from './Button';
import { MountSelectSitesOptions } from './component';
import { customComponentToReact } from './parser';

interface SelectSiteProps extends BaseProps {
  options?: MountSelectSitesOptions
}

function SelectSite({ core, options }: SelectSiteProps) {
  const [state, setState] = useState<SelectSiteState>({ ...initialStateSelectSite, loading: true });
  const [selectSiteCore, setSelectSiteCore] = useState<SelectSiteCore>()

  const handleSubmit = () => {
    selectSiteCore?.submit?.();
  }

  const init = () => {
    const selectSite = core.createSelectSite({ filter: options?.filter, single: options?.single, onSubmit: options?.onSubmit })
    setSelectSiteCore(selectSite);
    selectSite.subscribe((state: any) => {
      setState(state);
    })
  }

  useEffect(() => {
    init()
  }, [])

  if (state?.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 120,
        }}
      >
        <Loader />
      </div>
    );
  }

  const disabled = state.selected?.length === 0;

  return (
    <div>
      {
        !options?.hide_button && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {
              options?.components?.button ? customComponentToReact(options?.components?.button({ disabled, submit: handleSubmit })) : (
                <Button
                  id="continue"
                  title='Continue'
                  disabled={disabled}
                  onClick={handleSubmit}
                />
              )
            }
          </div>
        )
      }
      {
        !options?.hide_search ? options?.components?.search ? customComponentToReact(options?.components?.search({ changeSearch: selectSiteCore?.changeSearch })) : (
          <AccountInput
            id='search-site'
            name='search'
            type='search'
            label='Search for Sites:'
            onChange={(e) => {
              selectSiteCore?.changeSearch(e.target.value);
            }}
            placeholder='Amazon, Apple Store, Hulu...'
            value={state.search}
          />
        ) : null
      }
      <SelectSiteList
        sites={state?.sites || []}
        selected={state?.selected || []}
        components={options?.components}
        view={options?.view}
        onSelectItem={(item: any) => {
          if (options?.hide_button) {
            selectSiteCore?.selectItem(item)
            handleSubmit();
          } else {
            selectSiteCore?.selectItem(item)
          }
        }}
      />
    </div>
  );
}

export default withBase(SelectSite);