/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import withBase, { BaseProps } from './withBase';
import SelectSiteList from './SelectSiteList';
import Loader from './Loader';
import AccountInput from './AccountInput';
import Button from './Button';
import { customComponentToReact } from './parser';
import SelectSiteCore, { SelectSiteState } from '../core/selectSite';
import { mountSelectSiteViewProps } from '../types';

function SelectSiteView({ options, core, appearance }: BaseProps & mountSelectSiteViewProps) {
  const [state, setState] = useState<SelectSiteState>();
  const [selectSiteCore, setSelectSiteCore] = useState<SelectSiteCore>();

  useEffect(() => {
    const selectSite = core.createSelectSite(options);
    selectSite.subscribe((state: SelectSiteState) => {
      setState(state);
      options?.subscribe?.(state);
    });
    setSelectSiteCore(selectSite);
  }, []);

  const handleSubmit = () => {
    selectSiteCore?.submit?.();
  }

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

  const disabled = state?.selected?.length === 0;

  return (
    <div data-testid="selectSiteView" className='selectSiteView' css={appearance.elements?.selectSiteView}>
      {
        !options?.hide_button && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {
              options?.components?.button ? customComponentToReact(options?.components?.button({ disabled, submit: handleSubmit })) : (
                <Button
                  id="continue"
                  dataTestId="continue"
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
            value={state?.search}
          />
        ) : null
      }
      {
        state?.error && (
          <p data-testid="selectSiteErrorMessage" className='selectSiteErrorMessage'>{state.message}</p>
        )
      }
      <SelectSiteList
        sites={state?.sites || []}
        selected={state?.selected || []}
        components={options?.components}
        onSelectItem={(item: any) => {
          if (options?.single) {
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

export default withBase(SelectSiteView);