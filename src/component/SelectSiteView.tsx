/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import withBase, { BaseProps } from './withBase';
import SelectSiteList from './SelectSiteList';
import Loader from './Loader';
import SelectSiteCore, { SelectSiteState } from '../core/selectSite';
import { mountSelectSiteViewProps } from '../types';
import SelectSiteCarousel from './SelectSiteCarousel';
import Button from './Button';
import SearchSiteView from './SearchSiteView';

function SelectSiteView({ options, core, appearance }: BaseProps & mountSelectSiteViewProps) {
  const [state, setState] = useState<SelectSiteState>();
  const [selectSiteCore, setSelectSiteCore] = useState<SelectSiteCore>();
  const [openSearch, setOpenSearch] = useState<boolean>(false);

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

  return (
    <div data-testid="selectSiteView" className='selectSiteView' css={appearance.elements?.selectSiteView}>
      {
        <div
          css={appearance.elements?.selectSiteHeader}
        >
          <div>
            Select the first site for us to push your updated card info to.
          </div>
          <div>
            {
              state?.step === 2 && (
                <button
                  className='iconButton'
                  css={appearance.elements?.iconButton}
                  onClick={() => setOpenSearch(true)}
                >
                  <svg width="18" height="18" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13.5" cy="9.5" r="8" stroke="#6BBF00" stroke-width="3" />
                    <line x1="8.06066" y1="16.0607" x2="1.06066" y2="23.0607" stroke="#6BBF00" stroke-width="3" />
                  </svg>
                </button>
              )
            }
          </div>
        </div>
      }
      {
        state?.error && (
          <p data-testid="selectSiteErrorMessage" className='selectSiteErrorMessage'>{state.message}</p>
        )
      }
      {
        options?.view !== 'list' && state?.step === 1 && (
          <div style={{ width: '100%' }}>
            <SelectSiteCarousel
              sites={state?.sites || []}
              selected={state?.selected || []}
              onSelectItem={(item: any) => {
                if (options?.multiple) {
                  selectSiteCore?.selectItem(item)
                } else {
                  selectSiteCore?.selectItem(item)
                  handleSubmit();
                }
              }}
            />
            <div css={appearance.elements?.selectSiteCarouselFooter}>
              <Button
                title='Browse all sites'
                onClick={() => {
                  selectSiteCore?.setStep(2);
                }}
                variant='outlined'
              />
            </div>
          </div>
        )
      }
      {(
        options?.view === 'list' || state?.step === 2) && (
          <SelectSiteList
            sites={state?.sites || []}
            selected={state?.selected || []}
            onSelectItem={(item: any) => {
              if (options?.multiple) {
                selectSiteCore?.selectItem(item)
              } else {
                selectSiteCore?.selectItem(item)
                handleSubmit();
              }
            }}
          />
        )
      }
      {
        openSearch && (
          <SearchSiteView
            options={{
              ...options,
              onClose() {
                setOpenSearch(false);
              },
            }}
            appearance={appearance}
            core={core}
          />
        )
      }
    </div>
  );
}

export default withBase(SelectSiteView);