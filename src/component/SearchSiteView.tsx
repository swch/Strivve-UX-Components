/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import withBase, { BaseProps } from './withBase';
import SelectSiteList from './SelectSiteList';
import Loader from './Loader';
import AccountInput from './AccountInput';
import SelectSiteCore, { SelectSiteState } from '../core/selectSite';
import { mountSelectSiteViewProps } from '../types';

function SelectSiteView({
  options,
  core,
  appearance,
}: BaseProps & mountSelectSiteViewProps) {
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
  };

  return (
    <div data-testid="modal" className="modal" css={appearance.elements?.modal}>
      <div
        data-testid="searchSiteView"
        className="searchSiteView"
        css={appearance.elements?.searchSiteView}
      >
        <div
          className="searchSiteHeader"
          css={appearance?.elements?.searchSiteHeader}
        >
          <AccountInput
            label="Search site"
            name="search"
            onChange={(e) => selectSiteCore?.changeSearch(e.target.value)}
          />
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              cursor: 'pointer',
            }}
            role="button"
            onClick={options?.onClose}
          >
            <svg
              width="12"
              height="13"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.353553"
                y1="0.646447"
                x2="16.3536"
                y2="16.6464"
                stroke="black"
              />
              <line
                x1="16.3536"
                y1="1.35355"
                x2="0.353554"
                y2="17.3536"
                stroke="black"
              />
            </svg>
          </div>
        </div>
        {state?.error && (
          <p
            data-testid="selectSiteErrorMessage"
            className="selectSiteErrorMessage"
          >
            {state.message}
          </p>
        )}
        {state?.loading && state.search && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 120,
            }}
          >
            <Loader />
          </div>
        )}

        {state?.search && (
          <SelectSiteList
            sites={state?.sites || []}
            selected={state?.selected || []}
            onSelectItem={(item: any) => {
              if (options?.multiple) {
                selectSiteCore?.selectItem(item);
              } else {
                selectSiteCore?.selectItem(item);
                handleSubmit();
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default withBase(SelectSiteView);
